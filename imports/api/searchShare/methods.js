import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

// API
import { SearchShare } from './searchShare.js';

export const upsert = new ValidatedMethod({
  name: 'searchShare.upsert',
  validate: new SimpleSchema({
    summary: { type: String },
  }).validator(),
  run({ summary }) {
    if (!this.userId) {
      throw new Meteor.Error('searchShare.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }


    // if (Meteor.isServer) {
      const shareSearchObject = {
        summary,
      };

  // console.log(shareSearchObject);
      const findOne = SearchShare.findOne(shareSearchObject);
      return findOne;
      // console.log(findOne);

      // const upsert = SearchShare.upsert(shareSearchObject, shareSearchObject);
      // console.log(upsert);

      // return upsert;
    // }

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
