/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Shows } from '../shows.js';

Meteor.publish('shows.public', function showsPublic() {
  return Shows.find({}, {
    fields: Shows.publicFields,
  });
});

Meteor.publish('shows.byId', function showsById(ids) {
  return Shows.find({ '_id': { $in: ids } }, {
    fields: Shows.publicFields,
  });
});
