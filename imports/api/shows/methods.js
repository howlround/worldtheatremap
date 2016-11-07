import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Shows, showSchema } from './shows.js';

export const insert = new ValidatedMethod({
  name: 'shows.insert',
  validate({ newShow }) {
    const result = t.validate(newShow, showSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newShow, locale }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    if (locale && locale === 'es') {
      source = 'es';
      target = 'en';

      const baseDoc = {
        name: newShow.name,
      }

      if (!_.isEmpty(newShow.interests)) {
        baseDoc.interests = newShow.interests;
        delete newShow.interests;
      }

      const translatedDoc = newShow;
    } else {
      // Target language is English, either by default or specifically stated
      const baseDoc = newShow;
      const translatedDoc = {
        name: newShow.name,
      }
    }

    const insertedShowID = Shows.insertTranslations(newShow, {
        es: {
          name: newShow.name,
        },
    });

    // @TODO: Google Translate

    return insertedShowID;
  },
});

export const update = new ValidatedMethod({
  name: 'shows.update',
  validate({ newShow }) {
    const result = t.validate(newShow, showSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ showId, newShow, lang }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const doc = {};
    doc[lang] = newShow;

    Shows.updateTranslations(showId, doc);
  },
});

// Get list of all method names on Shows
const PLAYS_METHODS = _.pluck([
  insert,
  update,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 show operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PLAYS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
