import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Participants, participantSchema } from './participants.js';

const PARTICIPANT_ID_ONLY = new SimpleSchema({
  participantId: { type: String },
}).validator();

export const makePrivate = new ValidatedMethod({
  name: 'participants.makePrivate',
  validate: PARTICIPANT_ID_ONLY,
  run({ participantId }) {
    if (!this.userId) {
      throw new Meteor.Error('participants.makePrivate.notLoggedIn',
        'Must be logged in to make private participants.');
    }

    const participant = Participants.findOne(participantId);

    if (participant.isLastPublicParticipant()) {
      throw new Meteor.Error('participants.makePrivate.lastPublicParticipant',
        'Cannot make the last public participant private.');
    }

    Participants.update(participantId, {
      $set: { userId: this.userId },
    });
  },
});

export const makePublic = new ValidatedMethod({
  name: 'participants.makePublic',
  validate: PARTICIPANT_ID_ONLY,
  run({ participantId }) {
    if (!this.userId) {
      throw new Meteor.Error('participants.makePublic.notLoggedIn',
        'Must be logged in.');
    }

    const participant = Participants.findOne(participantId);

    // if (!participant.editableBy(this.userId)) {
    //   throw new Meteor.Error('participants.makePublic.accessDenied',
    //     'You don\'t have permission to edit this participant.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data
    Participants.update(participantId, {
      $unset: { userId: true },
    });
  },
});

export const insert = new ValidatedMethod({
  name: 'participants.insert',
  validate({ newParticipant, eventId }) {
    newParticipant.eventId = eventId;
    console.log(newParticipant);
    const result = t.validate(newParticipant, participantSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newParticipant }) {
    return Participants.insert(newParticipant);
  },
});

export const update = new ValidatedMethod({
  name: 'participants.update',
  validate({ newParticipant }) {
    const result = t.validate(newParticipant, participantSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ participantId, newParticipant }) {
    const participant = Participants.findOne(participantId);

    // if (!participant.editableBy(this.userId)) {
    //   throw new Meteor.Error('participants.update.accessDenied',
    //     'You don\'t have permission to edit this participant.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    Participants.update(participantId, {
      $set: newParticipant,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'participants.remove',
  validate: PARTICIPANT_ID_ONLY,
  run({ participantId }) {
    const participant = Participants.findOne(participantId);

    // if (!participant.editableBy(this.userId)) {
    //   throw new Meteor.Error('participants.remove.accessDenied',
    //     'You don\'t have permission to remove this participant.');
    // }

    // XXX the security check above is not atomic, so in theory a race condition could
    // result in exposing private data

    if (participant.isLastPublicParticipant()) {
      throw new Meteor.Error('participants.remove.lastPublicParticipant',
        'Cannot delete the last public participant.');
    }

    Participants.remove(participantId);
  },
});

// Get list of all method names on Participant
const PARTICIPANTS_METHODS = _.pluck([
  insert,
  makePublic,
  makePrivate,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 participant operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PARTICIPANTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
