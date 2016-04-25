import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
  // Server only
  Meteor.publish('profiles', function profilesPublication() {
    return Profiles.find();
  });
}

Meteor.methods({
  'profiles.insert'(profileObject) {
    check(profileObject, {
      name: String,
    });

    // Logged in users
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    profileObject.createdAt = new Date();
    profileObject.owner = Meteor.userId();
    profileObject.username = Meteor.user().username;

    Profiles.insert(profileObject);
  },
  'profiles.remove'(profileId) {
    check(profileId, String);

    const profile = Profiles.findOne(profileId);
    if (profile.private && profile.owner !== Meteor.userId()) {
      // if it's private and not the owner throw an error
      throw new Meteor.Error('not-authorized');
    }

    Profiles.remove(profileId);
  },
  'profiles.setChecked'(profileId, setChecked) {
    check(profileId, String);
    check(setChecked, Boolean);

    const profile = Profiles.findOne(profileId);
    if (profile.private && profile.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Profiles.update(profileId, { $set: { checked: setChecked } });
  },
  'profiles.setPrivate'(profileId, setToPrivate) {
    check(profileId, String);
    check(setToPrivate, Boolean);

    const profile = Profiles.findOne(profileId);

    // Owner only
    if (profile.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Profiles.update(profileId, { $set: { private: setToPrivate } });
  },
});
