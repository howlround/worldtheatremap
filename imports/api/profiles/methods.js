import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Profiles, profileSchema } from './profiles.js';

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
  run({ newProfile }) {
    return Profiles.insert(newProfile);
  },
});

export const updateImage = new ValidatedMethod({
  name: 'profiles.updateImage',
  validate: new SimpleSchema({
    profileId: { type: String },
    image: { type: String },
  }).validator(),
  run({ profileId, image }) {
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
    Profiles.updateTranslations(profileId, {
      es: newProfile,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'profiles.remove',
  validate: PROFILE_ID_ONLY,
  run({ profileId }) {
    // const profile = Profiles.findOne(profileId);

    // if (!profile.editableBy(this.userId)) {
    //   throw new Meteor.Error('profiles.remove.accessDenied',
    //     'You don\'t have permission to remove this profile.');
    // }

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
