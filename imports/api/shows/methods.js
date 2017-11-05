/* eslint-disable new-cap */
import Roles from 'meteor/alanning:roles';
import t from 'tcomb-validation';
import { _ } from 'meteor/underscore';
import { check, Match } from 'meteor/check';
import { clone, each, isEmpty } from 'lodash';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { remove as removeDiacritics } from 'diacritics';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';
import { ValidatedMethod, ValidationError } from 'meteor/mdg:validated-method';

import { Shows, showSchema } from './shows.js';
import { Events } from '../events/events.js';

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
  run({ newShow, source }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const otherLanguages = TAPi18n.getLanguages();
    delete otherLanguages[source];
    const translations = {};
    const baseDoc = clone(newShow);

    if (source && source !== 'en') {
      // Locale is not english so populate required search
      // fields for other langauges
      // and save the about field for the source locale
      each(otherLanguages, (name, locale) => {
        // English is handled on the base doc
        if (locale !== 'en') {
          translations[locale] = {
            nameSearch: removeDiacritics(baseDoc.name).toUpperCase(),
          };
        }
      });

      // The about text for the source language should be saved to the i18n fields directly
      translations[source] = {
        name: baseDoc.name,
        nameSearch: removeDiacritics(baseDoc.name).toUpperCase(),
        about: baseDoc.about,
      };
    } else {
      // Locale is english so just populate the required search
      // fields for the other languages
      each(otherLanguages, (name, locale) => {
        translations[locale] = {
          nameSearch: removeDiacritics(baseDoc.name).toUpperCase(),
        };
      });
    }

    // Save source language
    baseDoc.source = source;

    if (!isEmpty(newShow.name)) {
      baseDoc.nameSearch = removeDiacritics(newShow.name).toUpperCase();
    }

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentAddedCount': 1 } });

    const insertedShowID = Shows.insertTranslations(baseDoc, translations);

    // Translate about field
    if (newShow.about && Meteor.settings.GoogleTranslateAPIKey) {
      each(otherLanguages, (name, locale) => {
        HTTP.call('GET', 'https://www.googleapis.com/language/translate/v2', {
          params: {
            key: Meteor.settings.GoogleTranslateAPIKey,
            q: newShow.about,
            source,
            target: locale,
          },
        },
        (error, result) => {
          if (result.statusCode === 200) {
            const translatedText = result.data.data.translations[0].translatedText;

            Meteor.call('shows.updateTranslation', {
              insertedShowID,
              translatedDoc: {
                [locale]: {
                  about: translatedText,
                },
                [source]: {
                  about: newShow.about,
                },
              },
            });
          }
        });
      });
    }

    return insertedShowID;
  },
});

export const updateTranslation = new ValidatedMethod({
  name: 'shows.updateTranslation',
  validate({ translatedDoc }) {
    const pattern = {
      en: Match.Maybe({ about: String }),
      es: Match.Maybe({ about: String }),
      fr: Match.Maybe({ about: String }),
    };
    check(translatedDoc, pattern);
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
  run({ showId, newShow, source }) {
    if (!this.userId) {
      throw new Meteor.Error('shows.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const otherLanguages = TAPi18n.getLanguages();
    delete otherLanguages[source];

    const baseDoc = clone(newShow);
    const translations = {};

    // If the source is not english, strip out the Interests from the translated
    // fields and save them to the English/Base fields
    if (source && source !== 'en') {
      // Not english
      // Save name, nameSearch, and about in this language
      translations[source] = {
        name: baseDoc.name,
        nameSearch: removeDiacritics(baseDoc.name).toUpperCase(),
        about: baseDoc.about,
      };

      // Don't update base title on update
      delete baseDoc.name;

      // Don't overwrite the about field
      delete baseDoc.about;
    } else {
      // If updating english, don't change fields in other languages in case they have been
      // edited seperately
    }

    translations.en = baseDoc;

    // Record that this user edited content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentEditedCount': 1 } });

    Shows.updateTranslations(showId, translations);

    // Make sure all events are updated with new info (name, authors)
    const relatedEvents = Events.find({ 'show._id': showId }, { fields: { _id: 1 } }).fetch();
    const relatedEventIDs = _.pluck(relatedEvents, '_id');

    each(relatedEventIDs, eventID => {
      Events.update(
        {
          _id: eventID,
        },
        {
          $set: {
            show: {
              _id: showId,
              name: newShow.name,
              author: newShow.author,
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
