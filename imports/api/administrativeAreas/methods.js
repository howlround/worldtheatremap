import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { AdministrativeAreas } from './administrativeAreas.js';

export const upsert = new ValidatedMethod({
  name: 'administrativeAreas.upsert',
  validate: new SimpleSchema({
    administrativeArea: { type: String },
  }).validator(),
  run({ administrativeArea }) {
    if (!this.userId) {
      throw new Meteor.Error('administrativeAreas.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const administrativeAreaObject = {
      label: administrativeArea,
      value: administrativeArea,
    };

    return AdministrativeAreas.upsert(administrativeAreaObject, administrativeAreaObject);
  },
});

// Get administrativeArea of all method names on AdministrativeAreas
const ADMINISTRATIVE_AREAS_METHODS = _.pluck([
  upsert,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 administrativeArea operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ADMINISTRATIVE_AREAS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
