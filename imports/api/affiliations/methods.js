import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Affiliations, affiliationSchema } from './affiliations.js';

const PARTICIPANT_ID_ONLY = new SimpleSchema({
  affiliationId: { type: String },
}).validator();

export const upsert = new ValidatedMethod({
  name: 'affiliations.upsert',
  validate({ newAffiliation, parent }) {
    newAffiliation.parentId = parent._id;
    const result = t.validate(newAffiliation, affiliationSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newAffiliation }) {
    if (!this.userId) {
      throw new Meteor.Error('affiliations.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    return Affiliations.upsert(newAffiliation, newAffiliation);
  },
});

export const update = new ValidatedMethod({
  name: 'affiliations.update',
  validate({ newAffiliation }) {
    const result = t.validate(newAffiliation, affiliationSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ affiliationId, newAffiliation }) {
    if (!this.userId) {
      throw new Meteor.Error('affiliations.update.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Affiliations.update(affiliationId, {
      $set: newAffiliation,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'affiliations.remove',
  validate: PARTICIPANT_ID_ONLY,
  run({ affiliationId }) {
    if (!this.userId) {
      throw new Meteor.Error('affiliations.remove.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Affiliations.remove(affiliationId);
  },
});

// Get list of all method names on Affiliation
const PARTICIPANTS_METHODS = _.pluck([
  upsert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 affiliation operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PARTICIPANTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
