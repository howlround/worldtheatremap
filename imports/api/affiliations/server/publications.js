/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Affiliations } from '../affiliations.js';

Meteor.publish('affiliations.byParent', function affiliationsbyEvent(id) {
  check(id, String);

  return Affiliations.find({ parentId: id }, {
    fields: Affiliations.publicFields,
    limit: 100,
  });
});

Meteor.publish('affiliations.byProfile', function affiliationsbyProfile(id) {
  check(id, String);

  return Affiliations.find({ 'profile._id': id }, {
    fields: Affiliations.publicFields,
    limit: 100,
  });
});

Meteor.publish('affiliations.anyById', function affiliationsbyProfile(id) {
  check(id, String);

  return Affiliations.find(
    {
      $or: [
        { 'profile._id': id },
        { parentId: id },
      ],
    }, {
      fields: Affiliations.publicFields,
      limit: 100,
    }
  );
});
