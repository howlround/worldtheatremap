import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { includes, map, isNil } from 'lodash';
import t from 'tcomb-validation';

import { Participants, participantSchema } from './participants.js';

const PARTICIPANT_ID_ONLY = new SimpleSchema({
  participantId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'participants.insert',
  validate({ newParticipant, event }) {
    newParticipant.event = event;
    const result = t.validate(newParticipant, participantSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newParticipant }) {
    if (!this.userId) {
      throw new Meteor.Error('participants.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    // Normalize all role names to prevent duplicates appearing on profiles
    if (!isNil(newParticipant.role)) {
      newParticipant.role = newParticipant.role.toUpperCase();
    }

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
    if (!this.userId) {
      throw new Meteor.Error('participants.update.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Participants.update(participantId, {
      $set: newParticipant,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'participants.remove',
  validate: PARTICIPANT_ID_ONLY,
  run({ participantId }) {
    if (!this.userId) {
      throw new Meteor.Error('participants.remove.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Participants.remove(participantId);
  },
});

// Get list of all method names on Participant
const PARTICIPANTS_METHODS = map([
  insert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 participant operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return includes(PARTICIPANTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
