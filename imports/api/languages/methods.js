import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Languages } from './languages.js';

const LANGUAGE_ID_ONLY = new SimpleSchema({
  countryId: { type: String },
}).validator();

export const upsert = new ValidatedMethod({
  name: 'languages.upsert',
  validate: new SimpleSchema({
    language: { type: String },
  }).validator(),
  run({ language }) {
    if (!this.userId) {
      throw new Meteor.Error('languages.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const countryObject = {
      label: language,
      value: language
    }
    return Languages.upsert(countryObject, countryObject);
  },
});

// Get language of all method names on Languages
const COUNTRIES_METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 language operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(COUNTRIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
