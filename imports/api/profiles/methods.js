/* eslint-disable new-cap */
import { Meteor } from 'meteor/meteor';

// Utilities
import t from 'tcomb-validation';
import { _ } from 'meteor/underscore';
import { clone, each, isEmpty } from 'lodash';
import { check, Match } from 'meteor/check';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { HTTP } from 'meteor/http';
import { remove as removeDiacritics } from 'diacritics';
import { Roles } from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';
import { ValidatedMethod, ValidationError } from 'meteor/mdg:validated-method';

// API
import { Profiles, profileSchema } from './profiles.js';

// Methods
import { upsert as upsertLocality } from '../localities/methods.js';
import { upsert as upsertEthnicity } from '../ethnicities/methods.js';
import { upsert as upsertAdministrativeArea } from '../administrativeAreas/methods.js';
import { upsert as upsertCountry } from '../countries/methods.js';

// let cheerio = require('cheerio');

const PROFILE_ID_ONLY = new SimpleSchema({
  profileId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'profiles.insert',
  validate({ newProfile }) {
    const result = t.validate(newProfile, profileSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ newProfile, locale }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    let source = 'en';
    let target = 'es';

    if (!isEmpty(newProfile.locality)) {
      upsertLocality.call({ locality: newProfile.locality });
    }
    if (!isEmpty(newProfile.ethnicityRace)) {
      each(newProfile.ethnicityRace, ethnicity => {
        upsertEthnicity.call({ ethnicity });
      });
    }
    if (!isEmpty(newProfile.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: newProfile.administrativeArea });
    }
    if (!isEmpty(newProfile.country)) {
      upsertCountry.call({ country: newProfile.country });
    }

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentAddedCount': 1 } });

    // The permutations of viewing language and target language:
    // (After doing this we will conflate "Viewing in" and "Target" for now.
    // They can be split apart later if required.)
    // [Viewing: Spanish + ]Target: Spanish
    //  - Save name, and all tags, and image to english; everything minus tags to spanish
    // [Viewing: Spanish + ]Target: English
    //  - Save everything to english
    // [Viewing: English + ]Target: English
    //  - Save everything to english
    // [Viewing English + ]Target: Spanish
    //  - Save name, and all tags, and image to english; everything minus tags to spanish

    // Base doc is always english
    const baseDoc = clone(newProfile);
    const translations = {};

    if (locale && locale === 'es') {
      // @TODO: Refactor translations to be a translations object keyed by locale ("source")
      source = 'es';
      target = 'en';

      // Translated doc is always spanish even when adding in spanish
      // (due to Profiles.insertTranslations())
      // Some values should only be saved on base doc to keep consistancy
      translations[locale] = {
        name: baseDoc.name,
        nameSearch: removeDiacritics(baseDoc.name).toUpperCase(),
        about: baseDoc.about,
      };
    } else {
      // Target language is English, either by default or specifically stated
      // Therefore we have no spanish content
      translations.es = {
        name: newProfile.name,
        nameSearch: removeDiacritics(baseDoc.name).toUpperCase(),
      };
    }

    baseDoc.howlroundPostSearchText = newProfile.name;

    // Save source language
    baseDoc.source = source;

    if (!isEmpty(newProfile.facebook)) {
      const stripHttpExp = RegExp('^(https?:|)\/\/');
      baseDoc.facebook = newProfile.facebook.replace(stripHttpExp, '');
    }
    if (!isEmpty(newProfile.twitter)) {
      const stripHttpExp = RegExp('^(https?:|)\/\/twitter.com/');
      baseDoc.twitter = newProfile.twitter.replace(stripHttpExp, '').replace('@', '');
    }
    if (!isEmpty(newProfile.instagram)) {
      const stripHttpExp = RegExp('^(https?:|)\/\/instagram.com/');
      baseDoc.instagram = newProfile.instagram.replace(stripHttpExp, '').replace('@', '');
    }
    if (!isEmpty(newProfile.name)) {
      baseDoc.nameSearch = removeDiacritics(newProfile.name).toUpperCase();
    }

    const insertedProfileID = Profiles.insertTranslations(baseDoc, translations);

    const otherLanguages = TAPi18n.getLanguages();
    delete otherLanguages[source];

    each(otherLanguages, (name, locale) => {
      // Translate about field
      if (newProfile.about && Meteor.settings.GoogleTranslateAPIKey) {
        HTTP.call('GET', 'https://www.googleapis.com/language/translate/v2', {
          params: {
            key: Meteor.settings.GoogleTranslateAPIKey,
            q: newProfile.about,
            source,
            target: locale,
          },
        },
        (error, result) => {
          if (result.statusCode === 200) {
            const translatedText = result.data.data.translations[0].translatedText;

            Meteor.call('profiles.updateTranslation', {
              insertedProfileID,
              translatedDoc: {
                [locale]: {
                  about: translatedText,
                },
                [source]: {
                  about: newProfile.about,
                },
              },
            });
          }
        });
      }
    });

    // @TODO: Change Update function to match
    return insertedProfileID;
  },
});

export const updateTranslation = new ValidatedMethod({
  name: 'profiles.updateTranslation',
  validate({ translatedDoc }) {
    const pattern = {
      en: Match.Maybe({ about: String }),
      es: Match.Maybe({ about: String }),
      fr: Match.Maybe({ about: String }),
    };
    check(translatedDoc, pattern);
  },
  run({ insertedProfileID, translatedDoc }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.updateTranslation.accessDenied',
        'You must be logged in to complete this operation.');
    }

    return Profiles.updateTranslations(insertedProfileID, translatedDoc);
  },
});

export const updateImage = new ValidatedMethod({
  name: 'profiles.updateImage',
  validate: new SimpleSchema({
    profileId: { type: String },
    image: { type: String },
  }).validator(),
  run({ profileId, image }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.updateImage.accessDenied',
        'You must be logged in to complete this operation.');
    }

    const profile = Profiles.findOne(profileId);
    const imageWide = image.replace(`https://${Meteor.settings.AWSSourceBucket}`, `https://${Meteor.settings.AWSTargetBucket}`);

    // Record that this user edited content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentEditedCount': 1 } });

    Profiles.update(profile._id, {
      $set: {
        image,
        imageWide,
      },
    });

    // @TODO: Update the user record for this.userId and increment the contentEdited field
  },
});

export const update = new ValidatedMethod({
  name: 'profiles.update',
  validate({ newProfile }) {
    const result = t.validate(newProfile, profileSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ profileId, newProfile, locale }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.update.accessDenied',
        'You must be logged in to complete this operation.');
    }

    let source = 'en';
    // let target = 'es'; // Target isn't used in update

    if (!isEmpty(newProfile.locality)) {
      upsertLocality.call({ locality: newProfile.locality });
    }
    if (!isEmpty(newProfile.ethnicityRace)) {
      each(newProfile.ethnicityRace, ethnicity => {
        upsertEthnicity.call({ ethnicity });
      });
    }
    if (!isEmpty(newProfile.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: newProfile.administrativeArea });
    }
    if (!isEmpty(newProfile.country)) {
      upsertCountry.call({ country: newProfile.country });
    }

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentAddedCount': 1 } });

    // The permutations of viewing language and target language:
    // (After doing this we will conflate "Viewing in" and "Target" for now.
    // They can be split apart later if required.)
    // [Viewing: Spanish + ]Target: Spanish
    //  - Save name, and all tags, and image to english; everything minus tags to spanish
    // [Viewing: Spanish + ]Target: English
    //  - Save everything to english
    // [Viewing: English + ]Target: English
    //  - Save everything to english
    // [Viewing English + ]Target: Spanish
    //  - Save name, and all tags, and image to english; everything minus tags to spanish

    // Base doc is always english
    const baseDoc = clone(newProfile);
    const translations = {};

    if (locale && locale === 'es') {
      // @TODO: Refactor translations to be a translations object keyed by locale ("source")
      source = 'es';
      // target = 'en'; // target isn't used in update

      // Translated doc is always spanish even when adding in spanish
      // (due to Profiles.insertTranslations())
      // Some values should only be saved on base doc to keep consistancy
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
      // Don't update title in other languages on update

      // Target language is English, either by default or specifically stated
      // Therefore we have no spanish content
      // translations['es'] = {
      //   name: newProfile.name,
      //   nameSearch: removeDiacritics(baseDoc.name).toUpperCase()
      // }
    }

    baseDoc.howlroundPostSearchText = newProfile.name;

    // Save source language
    // Don't update source on update
    // baseDoc.source = source;

    if (!isEmpty(baseDoc.facebook)) {
      const stripHttpExp = RegExp('^(https?:|)\/\/');
      baseDoc.facebook = baseDoc.facebook.replace(stripHttpExp, '');
    }
    if (!isEmpty(baseDoc.twitter)) {
      const stripHttpExp = RegExp('^(https?:|)\/\/twitter.com/');
      baseDoc.twitter = baseDoc.twitter.replace(stripHttpExp, '').replace('@', '');
    }
    if (!isEmpty(baseDoc.instagram)) {
      const stripHttpExp = RegExp('^(https?:|)\/\/instagram.com/');
      baseDoc.instagram = baseDoc.instagram.replace(stripHttpExp, '').replace('@', '');
    }
    if (!isEmpty(baseDoc.name)) {
      baseDoc.nameSearch = removeDiacritics(baseDoc.name).toUpperCase();
    }

    const doc = clone(translations);
    doc.en = baseDoc;

    // Record that this user added new content
    Meteor.users.update(Meteor.userId(), { $inc: { 'profile.contentEditedCount': 1 } });

    Profiles.updateTranslations(profileId, doc);

    // @TODO: Update the user record for this.userId and increment the contentEdited field
  },
});

export const requestRemoval = new ValidatedMethod({
  name: 'profiles.requestRemoval',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.requestRemoval.accessDenied',
        'You must be logged in to complete this operation.');
    }

    // Record that this user edit content
    Meteor.users.update(this.userId, { $inc: { 'profile.contentEditedCount': 1 } });

    Profiles.update(profileId, {
      $set: {
        requestRemoval: this.userId,
      },
    });
  },
});

export const denyRemoval = new ValidatedMethod({
  name: 'profiles.denyRemoval',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('profiles.denyRemoval.accessDenied',
        'You must be an admin in to complete this operation.');
    }

    Profiles.update(profileId, {
      $set: {
        requestRemoval: null,
      },
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'profiles.remove',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      throw new Meteor.Error('profiles.remove.accessDenied',
        'You must be an admin in to complete this operation.');
    }

    Profiles.remove(profileId);
  },
});

// Get profile of all method names on Profiles
const PROFILES_METHODS = _.pluck([
  insert,
  updateTranslation,
  update,
  requestRemoval,
  denyRemoval,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 profile operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PROFILES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
