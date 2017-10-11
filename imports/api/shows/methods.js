/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import Roles from 'meteor/alanning:roles';
import { ValidatedMethod, ValidationError } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';
import { check, Match } from 'meteor/check';
import { remove as removeDiacritics } from 'diacritics';

import { Shows, showSchema } from './shows.js';
import { Events } from '../events/events.js';

import { upsert as upsertLanguage } from '../languages/methods.js';

const SHOW_ID_ONLY = new SimpleSchema({
  showId: { type: String },
}).validator();

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

    let source = 'en';
    let target = 'es';
    let translations = {};
    const newShowObj = newShow;

    if (locale && locale === 'es') {
      // Source language is Spanish
      // Translate to English
      source = 'es';
      target = 'en';
    } else {
      // Source language is English, either by default or specifically stated
      translations = {
        es: {
          name: newShowObj.name,
          nameSearch: removeDiacritics(newShowObj.name).toUpperCase(),
        },
      };
    }

    // Save source language
    newShowObj.source = source;

    if (!_.isEmpty(newShowObj.name)) {
      newShowObj.nameSearch = removeDiacritics(newShowObj.name).toUpperCase();
    }

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentAddedCount': 1 } });

    const insertedShowID = Shows.insertTranslations(newShowObj, translations);

    // Translate about field
    if (newShowObj.about && Meteor.settings.GoogleTranslateAPIKey) {
      HTTP.call('GET', 'https://www.googleapis.com/language/translate/v2', {
        params: {
          key: Meteor.settings.GoogleTranslateAPIKey,
          q: newShowObj.about,
          source,
          target,
        },
      },
      (error, result) => {
        if (result.statusCode === 200) {
          const translatedText = result.data.data.translations[0].translatedText;

          Meteor.call('shows.updateTranslation', {
            locale,
            insertedShowID,
            translatedDoc: {
              [target]: {
                about: translatedText,
              },
              [source]: {
                about: newShowObj.about,
              },
            },
          });
        }
      });
    }

    return insertedShowID;
  },
});

export const updateTranslation = new ValidatedMethod({
  name: 'shows.updateTranslation',
  validate({ translatedDoc }) {
    const patternES = { es: { about: Match.Maybe(String) } };
    const patternEN = { en: { about: Match.Maybe(String) } };
    const patternBoth = {
      en: { about: Match.Maybe(String) },
      es: { about: Match.Maybe(String) },
    };
    check(translatedDoc, Match.OneOf(patternEN, patternES, patternBoth));
  },
  run({ insertedShowID, translatedDoc }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.updateTranslation.accessDenied',
        'You must be logged in to complete this operation.');
    }

    return Shows.updateTranslations(insertedShowID, translatedDoc);
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
  run({ showId, newShow, locale }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    let source = 'en';
    // let target = 'es'; // Not used in update?
    const newShowObj = newShow;
    const doc = {};

    if (!_.isEmpty(newShowObj.name)) {
      newShowObj.nameSearch = removeDiacritics(newShowObj.name).toUpperCase();
    }

    // If the source is not english, strip out the Interests from the translated
    // fields and save them to the English/Base fields
    if (locale && locale === 'es') {
      source = 'es';
      // target = 'en'; // Not used in update?

      // Source doc fields should be in Spanish
      const sourceDoc = {
        name: newShowObj.name,
        nameSearch: newShowObj.nameSearch,
        about: newShowObj.about,
      };

      // baseDoc is for base (English) fields that need to be updated
      const baseDoc = {};

      if (!_.isEmpty(newShowObj.interests)) {
        baseDoc.interests = newShowObj.interests;
      }
      if (!_.isEmpty(newShowObj.author)) {
        baseDoc.author = newShowObj.author;
      }

      doc[source] = sourceDoc;
      doc.en = baseDoc;
    } else {
      // Target language is English, either by default or specifically stated
      doc.en = newShowObj;
    }

    if (!_.isEmpty(newShowObj.languages)) {
      _.each(newShowObj.languages, language => {
        upsertLanguage.call({ language });
      });
    }

    // Record that this user edited content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentEditedCount': 1 } });

    Shows.updateTranslations(showId, doc);

    // Make sure all events are updated with new info (name, authors)
    const relatedEvents = Events.find({ 'show._id': showId }, { fields: { _id: 1 } }).fetch();
    const relatedEventIDs = _.pluck(relatedEvents, '_id');

    _.each(relatedEventIDs, eventID => {
      Events.update(
        {
          _id: eventID,
        },
        {
          $set: {
            show: {
              _id: showId,
              name: newShowObj.name,
              author: newShowObj.author,
            },
          },
        }
      );
    });
  },
});

export const requestRemoval = new ValidatedMethod({
  name: 'shows.requestRemoval',
  validate: SHOW_ID_ONLY,
  run({ showId }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.requestRemoval.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Shows.update(showId, {
      $set: {
        requestRemoval: this.userId,
      },
    });

    // Record that this user edit content
    Meteor.users.update(this.userId, { $inc: { 'profile.contentEditedCount': 1 } });
  },
});

export const denyRemoval = new ValidatedMethod({
  name: 'shows.denyRemoval',
  validate: SHOW_ID_ONLY,
  run({ showId }) {
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('shows.denyRemoval.accessDenied',
        'You must be an admin in to complete this operation.');
    }

    Shows.update(showId, {
      $set: {
        requestRemoval: null,
      },
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'shows.remove',
  validate: SHOW_ID_ONLY,
  run({ showId }) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      throw new Meteor.Error('shows.remove.accessDenied',
        'You must be an admin to complete this operation.');
    }

    Shows.remove(showId);
  },
});

// Get list of all method names on Shows
const SHOWS_METHODS = _.pluck([
  insert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 show operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(SHOWS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
