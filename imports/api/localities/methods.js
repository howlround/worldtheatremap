import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Localities } from './localities.js';

const LOCALITY_ID_ONLY = new SimpleSchema({
  localityId: { type: String },
}).validator();

export const upsert = new ValidatedMethod({
  name: 'localities.upsert',
  validate: new SimpleSchema({
    locality: { type: String },
  }).validator(),
  run({ locality }) {
    const localityObject = {
      label: locality,
      value: locality
    }
    return Localities.upsert(localityObject, localityObject);
  },
});

// Get locality of all method names on Localities
const LOCALITIES_METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 locality operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(LOCALITIES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
