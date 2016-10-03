import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
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

    const event = Events.findOne(eventId);

    // Not allowed to update the _id
    if (newEvent._id) {
      delete newEvent._id;
    }

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
    if (!this.userId) {
      throw new Meteor.Error('events.remove.accessDenied',
        'You must be logged in to complete this operation.');
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
