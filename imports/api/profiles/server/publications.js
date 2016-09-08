/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../profiles.js';

Meteor.publish('profiles.public', function profilesPublic() {
  return Profiles.find({}, {
    fields: Profiles.publicFields,
  });
});

Meteor.publish('profiles.search', function profilesSearch(query, requestedPage) {
  const limit = 20;
  const skip = requestedPage ? requestedPage * limit : 0;
  return Profiles.find(query, {
    fields: Profiles.publicFields,
    sort: { name: 1 },
    limit,
    skip,
  });
});

Meteor.publish('profiles.byId', function profilesById(ids) {
  return Profiles.find({ _id: { $in: ids } }, {
    fields: Profiles.publicFields,
  });
});
