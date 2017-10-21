import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Ethnicities } from './ethnicities.js';

export const upsert = new ValidatedMethod({
  name: 'ethnicities.upsert',
  validate: new SimpleSchema({
    ethnicity: { type: String },
  }).validator(),
  run({ ethnicity }) {
    if (!this.userId) {
      throw new Meteor.Error('ethnicities.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const ethnicityObject = {
      label: ethnicity,
      value: ethnicity,
    };

    return Ethnicities.upsert(ethnicityObject, ethnicityObject);
  },
});

// Get ethnicity of all method names on Ethnicities
const ETHNICITIES_METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 ethnicity operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ETHNICITIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
