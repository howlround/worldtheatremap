import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { FestivalOrganizers, festivalOrganizerSchema } from './festivalOrganizers.js';

const FESTIVAL_ORGANIZER_ID_ONLY = new SimpleSchema({
  festivalOrganizerId: { type: String },
}).validator();

export const upsert = new ValidatedMethod({
  name: 'festivalOrganizers.upsert',
  validate({ newFestivalOrganizer, parent }) {
    newFestivalOrganizer.parentId = parent._id;
    const result = t.validate(newFestivalOrganizer, festivalOrganizerSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newFestivalOrganizer }) {
    if (!this.userId) {
      throw new Meteor.Error('festivalOrganizers.upsert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    return FestivalOrganizers.upsert(newFestivalOrganizer, newFestivalOrganizer);
  },
});

export const update = new ValidatedMethod({
  name: 'festivalOrganizers.update',
  validate({ newFestivalOrganizer }) {
    const result = t.validate(newFestivalOrganizer, festivalOrganizerSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ festivalOrganizerId, newFestivalOrganizer }) {
    if (!this.userId) {
      throw new Meteor.Error('festivalOrganizers.update.accessDenied',
        'You must be logged in to complete this operation.');
    }

    FestivalOrganizers.update(festivalOrganizerId, {
      $set: newFestivalOrganizer,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'festivalOrganizers.remove',
  validate: FESTIVAL_ORGANIZER_ID_ONLY,
  run({ festivalOrganizerId }) {
    if (!this.userId) {
      throw new Meteor.Error('festivalOrganizers.remove.accessDenied',
        'You must be logged in to complete this operation.');
    }

    FestivalOrganizers.remove(festivalOrganizerId);
  },
});

// Get list of all method names on FestivalOrganizer
const FESTIVAL_ORGANIZERS_METHODS = _.pluck([
  upsert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 festivalOrganizer operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(FESTIVAL_ORGANIZERS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
