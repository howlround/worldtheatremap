import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

const ID_ONLY = new SimpleSchema({
  _id: { type: String },
}).validator();

export const subscribe = new ValidatedMethod({
  name: 'users.subscribe',
  validate: ID_ONLY,
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('users.subscribe.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Meteor.users.update(Meteor.userId(), {
      $push: {
        "profile.subscribedContent": _id,
      }
    });
  },
});

export const unsubscribe = new ValidatedMethod({
  name: 'users.unsubscribe',
  validate: ID_ONLY,
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('users.unsubscribe.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Meteor.users.update(Meteor.userId(), {
      $pull: {
        "profile.subscribedContent": _id,
      }
    });
  },
});

const METHODS = _.pluck([
  subscribe,
  unsubscribe,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 profile operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
