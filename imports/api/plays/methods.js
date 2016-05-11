import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Plays, playSchema } from './plays.js';

const PLAY_ID_ONLY = new SimpleSchema({
  playId: { type: String },
}).validator();

export const makePrivate = new ValidatedMethod({
  name: 'plays.makePrivate',
  validate: PLAY_ID_ONLY,
  run({ playId }) {
    if (!this.userId) {
      throw new Meteor.Error('plays.makePrivate.notLoggedIn',
        'Must be logged in to make private plays.');
    }

    const play = Plays.findOne(playId);

    if (play.isLastPublicPlay()) {
      throw new Meteor.Error('plays.makePrivate.lastPublicPlay',
        'Cannot make the last public play private.');
    }

    Plays.update(playId, {
      $set: { userId: this.userId },
    });
  },
});

export const makePublic = new ValidatedMethod({
  name: 'plays.makePublic',
  validate: PLAY_ID_ONLY,
  run({ playId }) {
    if (!this.userId) {
      throw new Meteor.Error('plays.makePublic.notLoggedIn',
        'Must be logged in.');
    }

    const play = Plays.findOne(playId);

    // if (!play.editableBy(this.userId)) {
    //   throw new Meteor.Error('plays.makePublic.accessDenied',
    //     'You don\'t have permission to edit this play.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data
    Plays.update(playId, {
      $unset: { userId: true },
    });
  },
});

export const insert = new ValidatedMethod({
  name: 'plays.insert',
  validate({ newPlay }) {
    const result = t.validate(newPlay, playSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newPlay }) {
    return Plays.insert(newPlay);
  },
});

export const updateName = new ValidatedMethod({
  name: 'plays.updateName',
  validate({ newPlay }) {
    const result = t.validate(newPlay, playSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ playId, newPlay }) {
    const play = Plays.findOne(playId);

    // if (!play.editableBy(this.userId)) {
    //   throw new Meteor.Error('plays.updateName.accessDenied',
    //     'You don\'t have permission to edit this play.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    Plays.update(playId, {
      $set: newPlay,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'plays.remove',
  validate: PLAY_ID_ONLY,
  run({ playId }) {
    const play = Plays.findOne(playId);

    // if (!play.editableBy(this.userId)) {
    //   throw new Meteor.Error('plays.remove.accessDenied',
    //     'You don\'t have permission to remove this play.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    if (play.isLastPublicPlay()) {
      throw new Meteor.Error('plays.remove.lastPublicPlay',
        'Cannot delete the last public play.');
    }

    Plays.remove(playId);
  },
});

// Get list of all method names on Plays
const PLAYS_METHODS = _.pluck([
  insert,
  makePublic,
  makePrivate,
  updateName,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 play operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PLAYS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
