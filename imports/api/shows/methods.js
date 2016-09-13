import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Shows, showSchema } from './shows.js';

export const insert = new ValidatedMethod({
  name: 'shows.insert',
  validate({ newShow }) {
    const result = t.validate(newShow, showSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newShow }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    return Shows.insert(newShow);
  },
});

export const update = new ValidatedMethod({
  name: 'shows.update',
  validate({ newShow }) {
    const result = t.validate(newShow, showSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ showId, newShow }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }
    Shows.update(showId, {
      $set: newShow,
    });
  },
});

// Get list of all method names on Shows
const PLAYS_METHODS = _.pluck([
  insert,
  update,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 show operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PLAYS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
