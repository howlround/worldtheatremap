import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Profiles, profileSchema } from './profiles.js';

// Methods
import { upsert as upsertLocality } from '../localities/methods.js';
import { upsert as upsertAdministrativeArea } from '../administrativeAreas/methods.js';
import { upsert as upsertCountry } from '../countries/methods.js';

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
  run({ newProfile, targetLang }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.insert.accessDenied',
        'You must be logged in to complete this operation.');
    }

    if (!_.isEmpty(newProfile.locality)) {
      upsertLocality.call({ locality: newProfile.locality });
    }
    if (!_.isEmpty(newProfile.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: newProfile.administrativeArea });
    }
    if (!_.isEmpty(newProfile.country)) {
      upsertCountry.call({ country: newProfile.country });
    }

    // The permutations of viewing language and target language:
    // (After doing this we will conflate "Viewing in" and "Target" for now. They can be split apart later if required.)
    // [Viewing: Spanish + ]Target: Spanish
    //  - Save name, and all tags, and image to english; everything minus tags to spanish
    // [Viewing: Spanish + ]Target: English
    //  - Save everything to english
    // [Viewing: English + ]Target: English
    //  - Save everything to english
    // [Viewing English + ]Target: Spanish
    //  - Save name, and all tags, and image to english; everything minus tags to spanish

    if (targetLang && targetLang === 'es') {
      const baseDoc = {
        name: newProfile.name,
      }

      if (!_.isEmpty(newProfile.profileType)) {
        baseDoc.profileType = newProfile.profileType;
        delete newProfile.profileType;
      }
      if (!_.isEmpty(newProfile.interests)) {
        baseDoc.interests = newProfile.interests;
        delete newProfile.interests;
      }
      if (!_.isEmpty(newProfile.orgTypes)) {
        baseDoc.orgTypes = newProfile.profileType;
        delete newProfile.orgTypes;
      }
      if (!_.isEmpty(newProfile.selfDefinedRoles)) {
        baseDoc.selfDefinedRoles = newProfile.selfDefinedRoles;
        delete newProfile.selfDefinedRoles;
      }
      if (!_.isEmpty(newProfile.gender)) {
        baseDoc.gender = newProfile.gender;
        delete newProfile.gender;
      }

      const translatedDoc = newProfile;
    } else {
      // Target language is English, either by default or specifically stated
      const baseDoc = newProfile;
      const translatedDoc = {
        name: newProfile.name,
      }
    }

    // @TODO: Change Update function to match
    return Profiles.insertTranslations(newProfile, {
        es: {
          name: newProfile.name,
        },
    });
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
    const imageWide = image.replace('https://wtm-dev-images', 'https://wtm-dev-images-resized');

    Profiles.update(profile._id, {
      $set: {
        image,
        imageWide,
      },
    });
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
  run({ profileId, newProfile }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.update.accessDenied',
        'You must be logged in to complete this operation.');
    }

    if (!_.isEmpty(newProfile.locality)) {
      upsertLocality.call({ locality: newProfile.locality });
    }
    if (!_.isEmpty(newProfile.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: newProfile.administrativeArea });
    }
    if (!_.isEmpty(newProfile.country)) {
      upsertCountry.call({ country: newProfile.country });
    }

    Profiles.update(profileId, {
      $set: newProfile,
    });
  },
});

export const translate = new ValidatedMethod({
  name: 'profiles.translate',
  validate({ newProfile }) {
    const result = t.validate(newProfile, profileSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ profileId, lang, newProfile }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.translate.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Profiles.updateTranslations(profileId, {
      es: newProfile,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'profiles.remove',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    if (!this.userId) {
      throw new Meteor.Error('profiles.remove.accessDenied',
        'You must be logged in to complete this operation.');
    }

    Profiles.remove(profileId);
  },
});

// Get profile of all method names on Profiles
const PROFILES_METHODS = _.pluck([
  insert,
  update,
  translate,
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
