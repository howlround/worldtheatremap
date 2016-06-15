import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Events, eventSchema } from './events.js';

const EVENT_ID_ONLY = new SimpleSchema({
  eventId: { type: String },
}).validator();

export const makePrivate = new ValidatedMethod({
  name: 'events.makePrivate',
  validate: EVENT_ID_ONLY,
  run({ eventId }) {
    if (!this.userId) {
      throw new Meteor.Error('events.makePrivate.notLoggedIn',
        'Must be logged in to make private events.');
    }

    const event = Events.findOne(eventId);

    if (event.isLastPublicEvent()) {
      throw new Meteor.Error('events.makePrivate.lastPublicEvent',
        'Cannot make the last public event private.');
    }

    Events.update(eventId, {
      $set: { userId: this.userId },
    });
  },
});

export const makePublic = new ValidatedMethod({
  name: 'events.makePublic',
  validate: EVENT_ID_ONLY,
  run({ eventId }) {
    if (!this.userId) {
      throw new Meteor.Error('events.makePublic.notLoggedIn',
        'Must be logged in.');
    }

    const event = Events.findOne(eventId);

    // if (!event.editableBy(this.userId)) {
    //   throw new Meteor.Error('events.makePublic.accessDenied',
    //     'You don\'t have permission to edit this event.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data
    Events.update(eventId, {
      $unset: { userId: true },
    });
  },
});

export const insert = new ValidatedMethod({
  name: 'events.insert',
  validate({ newEvent }) {
    const result = t.validate(newEvent, eventSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newEvent }) {
    // @TODO: Put entire Play object in
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
    const event = Events.findOne(eventId);

    // if (!event.editableBy(this.userId)) {
    //   throw new Meteor.Error('events.update.accessDenied',
    //     'You don\'t have permission to edit this event.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    Events.update(eventId, {
      $set: newEvent,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'events.remove',
  validate: EVENT_ID_ONLY,
  run({ eventId }) {
    const event = Events.findOne(eventId);

    // if (!event.editableBy(this.userId)) {
    //   throw new Meteor.Error('events.remove.accessDenied',
    //     'You don\'t have permission to remove this event.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    if (event.isLastPublicEvent()) {
      throw new Meteor.Error('events.remove.lastPublicEvent',
        'Cannot delete the last public event.');
    }

    Events.remove(eventId);
  },
});

// Get list of all method names on Event
const EVENTS_METHODS = _.pluck([
  insert,
  makePublic,
  makePrivate,
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
