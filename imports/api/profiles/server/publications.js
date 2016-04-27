/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Profiles } from '../profiles.js';

Meteor.publish('profiles.public', function profilesPublic() {
  return Profiles.find({
    userId: { $exists: false },
  }, {
    fields: Profiles.publicFields,
  });
});

Meteor.publish('profiles.private', function profilesPrivate() {
  if (!this.userId) {
    return this.ready();
  }

  return Profiles.find({
    userId: this.userId,
  }, {
    fields: Profiles.publicFields,
  });
});
