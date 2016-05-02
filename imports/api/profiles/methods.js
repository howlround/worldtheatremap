import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Profiles, profileSchema } from './profiles.js';

const PROFILE_ID_ONLY = new SimpleSchema({
  profileId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'profiles.insert',
  validate: new SimpleSchema({}).validator(),
  run() {
    return Profiles.insert({});
  },
});

export const makePrivate = new ValidatedMethod({
  name: 'profiles.makePrivate',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.makePrivate.notLoggedIn',
        'Must be logged in to make private profiles.');
    }

    const profile = Profiles.findOne(profileId);

    if (profile.isLastPublicProfile()) {
      throw new Meteor.Error('profiles.makePrivate.lastPublicProfile',
        'Cannot make the last public profile private.');
    }

    Profiles.update(profileId, {
      $set: { userId: this.userId },
    });
  },
});

export const makePublic = new ValidatedMethod({
  name: 'profiles.makePublic',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.makePublic.notLoggedIn',
        'Must be logged in.');
    }

    const profile = Profiles.findOne(profileId);

    // if (!profile.editableBy(this.userId)) {
    //   throw new Meteor.Error('profiles.makePublic.accessDenied',
    //     'You don\'t have permission to edit this profile.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data
    Profiles.update(profileId, {
      $unset: { userId: true },
    });
  },
});

export const updateName = new ValidatedMethod({
  name: 'profiles.updateName',
  validate({ newProfile }) {
    const result = t.validate(newProfile, profileSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ profileId, newProfile }) {
    const profile = Profiles.findOne(profileId);

    // if (!profile.editableBy(this.userId)) {
    //   throw new Meteor.Error('profiles.updateName.accessDenied',
    //     'You don\'t have permission to edit this profile.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    Profiles.update(profileId, {
      $set: newProfile,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'profiles.remove',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    const profile = Profiles.findOne(profileId);

    // if (!profile.editableBy(this.userId)) {
    //   throw new Meteor.Error('profiles.remove.accessDenied',
    //     'You don\'t have permission to remove this profile.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    if (profile.isLastPublicProfile()) {
      throw new Meteor.Error('profiles.remove.lastPublicProfile',
        'Cannot delete the last public profile.');
    }

    Profiles.remove(profileId);
  },
});

// Get profile of all method names on Profiles
const PROFILES_METHODS = _.pluck([
  insert,
  makePublic,
  makePrivate,
  updateName,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 profile operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PROFILES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
