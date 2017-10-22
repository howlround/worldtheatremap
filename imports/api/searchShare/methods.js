import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { get } from 'lodash';
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

    let output = false;

    const shareSearchObject = {
      summary,
    };

    const existingShareImage = SearchShare.findOne(shareSearchObject);

    if (existingShareImage) {
      output = get(existingShareImage, '_id');
    } else {
      const upsertDoc = SearchShare.upsert(shareSearchObject, shareSearchObject);
      output = get(upsertDoc, 'insertedId');
    }

    return output;
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
