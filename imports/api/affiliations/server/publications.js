/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Affiliations } from '../affiliations.js';

Meteor.publish('affiliations.byParent', function affiliationsbyEvent(id) {
  return Affiliations.find({'parentId': id}, {
    fields: Affiliations.publicFields,
    limit: 25,
  });
});

Meteor.publish('affiliations.byProfile', function affiliationsbyProfile(id) {
  return Affiliations.find({'profile._id': id}, {
    fields: Affiliations.publicFields,
    limit: 25,
  });
});

Meteor.publish('affiliations.anyById', function affiliationsbyProfile(id) {
  return Affiliations.find(
    {
      $or: [
        {
          'profile._id': id,
        },
        {
          parentId: id,
        },
      ],
    }, {
      fields: Affiliations.publicFields,
      limit: 25,
    }
  );
});
