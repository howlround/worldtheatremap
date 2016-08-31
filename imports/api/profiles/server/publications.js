/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Profiles } from '../profiles.js';

Meteor.publish('profiles.public', function profilesPublic() {
  return Profiles.find({}, {
    fields: Profiles.publicFields,
  });
});

Meteor.publish('profiles.search', function profilesSearch(requestedPage) {
  const limit = 20;
  const skip = requestedPage ? requestedPage * limit : 0;
  return Profiles.find({}, {
    fields: Profiles.publicFields,
    limit,
    skip
  });
});

Meteor.publish('profiles.byId', function profilesById(ids) {
  return Profiles.find({ '_id': { $in: ids } }, {
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

// Meteor.publish('profiles.autocomplete', function profilesAutocomplete() {
//   return Profiles.find({}, {
//     fields: {
//       name: true
//     }
//   });
// });
