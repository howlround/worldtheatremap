import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import t from 'tcomb-validation';
import { Plays } from '../plays/plays.js';

class ProfilesCollection extends Mongo.Collection {
  insert(profile, callback) {
    const ourProfile = profile;
    if (!ourProfile.name) {
      let nextLetter = 'A';
      ourProfile.name = `Profile ${nextLetter}`;

      while (!!this.findOne({ name: ourProfile.name })) {
        // not going to be too smart here, can go past Z
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        ourProfile.name = `Profile ${nextLetter}`;
      }
    }

    return super.insert(ourProfile, callback);
  }
  remove(selector, callback) {
    Todos.remove({ profileId: selector });
    return super.remove(selector, callback);
  }
}

export const Profiles = new ProfilesCollection('Profiles');

// Deny all client-side updates since we will be using methods to manage this collection
Profiles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const profileSchema = t.struct({
  name: t.String,
  about: t.maybe(t.String),
});

export const defaultFormOptions = () => {
  return {
    fields: {
      name: {
        attrs: {
          className: 'profile-name-edit',
        },
        error: 'Name is required',
      },
      about: {
        type: 'textarea',
        attrs: {
          rows: '10',
          className: 'profile-about-edit',
        },
      },
    },
  };
}

Profiles.schema = new SimpleSchema({
  name: { type: String },
  about: { type: String, optional: true },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

Profiles.attachSchema(Profiles.schema);

// This represents the keys from Profiles objects that should be published
// to the client. If we add secret properties to Profile objects, don't profile
// them here to keep them private to the server.
Profiles.publicFields = {
  name: 1,
  about: 1,
  userId: 1,
};

Factory.define('profile', Profiles, {});

Profiles.helpers({
  // // A profile is considered to be private if it has a userId set
  // isPrivate() {
  //   return !!this.userId;
  // },
  // isLastPublicProfile() {
  //   const publicProfileCount = Profiles.find({ userId: { $exists: false } }).count();
  //   return !this.isPrivate() && publicProfileCount === 1;
  // },
  // editableBy(userId) {
  //   if (!this.userId) {
  //     return true;
  //   }

  //   return this.userId === userId;
  // },
  getPlays() {
    return Plays.find({ "author.id": this._id });
  },
});
