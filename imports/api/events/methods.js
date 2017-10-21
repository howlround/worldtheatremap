import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod, ValidationError } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Events } from './events.js';
import { eventSchema } from './forms.js';

const EVENT_ID_ONLY = new SimpleSchema({
  eventId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'events.insert',
  validate({ newEvent }) {
    const result = t.validate(newEvent, eventSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newEvent }) {
    if (!this.userId) {
      throw new Meteor.Error('events.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentAddedCount': 1 } });

    // @TODO: Put entire Show object in
    return Events.insert(newEvent);
  },
});

export const update = new ValidatedMethod({
  name: 'events.update',
  validate({ newEvent }) {
    const result = t.validate(newEvent, eventSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ eventId, newEvent }) {
    if (!this.userId) {
      throw new Meteor.Error('events.update.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const newEventToUpdate = newEvent;

    // Not allowed to update the _id
    if (newEventToUpdate._id) {
      delete newEventToUpdate._id;
    }

    // Record that this user edited content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentEditedCount': 1 } });

    Events.update(eventId, {
      $set: newEventToUpdate,
    });
  },
});

export const requestRemoval = new ValidatedMethod({
  name: 'events.requestRemoval',
  validate: EVENT_ID_ONLY,
  run({ eventId }) {
    if (!this.userId) {
      throw new Meteor.Error('events.requestRemoval.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Events.update(eventId, {
      $set: {
        requestRemoval: this.userId,
      },
    });

    // Record that this user edit content
    Meteor.users.update(this.userId, { $inc: { 'profile.contentEditedCount': 1 } });
  },
});

export const denyRemoval = new ValidatedMethod({
  name: 'events.denyRemoval',
  validate: EVENT_ID_ONLY,
  run({ eventId }) {
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('events.denyRemoval.accessDenied',
        'You must be an admin in to complete this operation.');
    }

    Events.update(eventId, {
      $set: {
        requestRemoval: null,
      },
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'events.remove',
  validate: EVENT_ID_ONLY,
  run({ eventId }) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      throw new Meteor.Error('events.remove.accessDenied',
        'You must be an admin to complete this operation.');
    }

    Events.remove(eventId);
  },
});

// Get list of all method names on Event
const EVENTS_METHODS = _.pluck([
  insert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 event operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(EVENTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
