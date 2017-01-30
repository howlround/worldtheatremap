import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';
import { check } from 'meteor/check'

import { Shows, showSchema } from './shows.js';

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

    if (locale && locale === 'es') {
      // Source language is Spanish
      // Translate to English
      source = 'es';
      target = 'en';
    } else {
      // Source language is English, either by default or specifically stated
      translations = {
        es: {
          name: newShow.name,
        },
      }
    }

    // Save source language
    newShow.source = source;

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { "profile.contentAddedCount": 1 } });

    const insertedShowID = Shows.insertTranslations(newShow, translations);

    if (!_.isEmpty(newShow.languages)) {
      _.each(newShow.languages, language => {
        upsertLanguage.call({ language });
      });
    }

    // Translate about field
    if (newShow.about && Meteor.settings.GoogleTranslateAPIKey) {
      var result = HTTP.call('GET', 'https://www.googleapis.com/language/translate/v2', {
        params: {
          key: Meteor.settings.GoogleTranslateAPIKey,
          q: newShow.about,
          source,
          target,
        }
      },
      (error, result) => {
        if (result.statusCode == 200) {
          const translatedText = result.data.data.translations[0].translatedText;

          Meteor.call('shows.updateTranslation', {
            locale,
            insertedShowID,
            translatedDoc: {
              [target]: {
                about: translatedText,
              },
              [source]: {
                about: newShow.about,
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
    var patternES = { es: { about: Match.Maybe(String) } };
    var patternEN = { en: { about: Match.Maybe(String) } };
    var patternBoth = {
      en: { about: Match.Maybe(String) },
      es: { about: Match.Maybe(String) }
    };
    check(translatedDoc, Match.OneOf(patternEN, patternES, patternBoth));
  },
  run({ insertedShowID, translatedDoc, locale }) {
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
    let target = 'es';
    const doc = {};

    // If the source is not english, strip out the Interests from the translated fields and save them to the English/Base fields

    if (locale && locale === 'es') {
      source = 'es';
      target = 'en';

      // Source doc fields should be in Spanish
      const sourceDoc = {
        name: newShow.name,
        about: newShow.about,
      }

      // baseDoc is for base (English) fields that need to be updated
      const baseDoc = {};

      if (!_.isEmpty(newShow.interests)) {
        baseDoc.interests = newShow.interests;
      }
      if (!_.isEmpty(newShow.author)) {
        baseDoc.author = newShow.author;
      }

      doc[source] = sourceDoc;
      doc['en'] = baseDoc;

    } else {
      // Target language is English, either by default or specifically stated
      doc['en'] = newShow;
    }

    if (!_.isEmpty(newShow.languages)) {
      _.each(newShow.languages, language => {
        upsertLanguage.call({ language });
      });
    }

    // Record that this user edited content
    Meteor.users.update(Meteor.userId(), { $inc: { "profile.contentEditedCount": 1 } });

    Shows.updateTranslations(showId, doc);
  },
});

export const remove = new ValidatedMethod({
  name: 'shows.remove',
  validate: SHOW_ID_ONLY,
  run({ showId }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.remove.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Shows.remove(showId);

    // Record that this user edited content
    Meteor.users.update(Meteor.userId(), { $inc: { "profile.contentEditedCount": 1 } });
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
