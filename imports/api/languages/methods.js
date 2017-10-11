import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Languages } from './languages.js';

export const markUsed = new ValidatedMethod({
  name: 'languages.markUsed',
  validate: new SimpleSchema({
    language: { type: String },
  }).validator(),
  run({ language }) {
    if (!this.userId) {
      throw new Meteor.Error('languages.markUsed.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const countryQuery = {
      value: language,
    };

    const countryObject = {
      usedInShows: true,
    };

    return Languages.update(countryQuery, countryObject);
  },
});

// Get language of all method names on Languages
const COUNTRIES_METHODS = _.pluck([
  markUsed,
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
