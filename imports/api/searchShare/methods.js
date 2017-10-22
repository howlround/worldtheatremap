import { Meteor } from 'meteor/meteor';
import hash from 'string-hash';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { get } from 'lodash';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

// API
import { SearchShare } from './searchShare.js';

export const upsert = new ValidatedMethod({
  name: 'searchShare.upsert',
  validate: new SimpleSchema({
    count: { type: Number },
    modifiers: { type: String },
    queryString: { type: String },
  }).validator(),
  run({ count, modifiers, queryString }) {
    const filename = hash(queryString);

    const shareSearchObject = {
      filename,
      count,
      modifiers,
    };

    // Upsert only requires count + one of the other two
    // since filename is just a hashed version of modifiers
    SearchShare.upsert({
      filename,
      count,
    }, shareSearchObject);
  },
});

// Get all method names
const METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
