/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { FestivalOrganizers } from '../festivalOrganizers.js';

Meteor.publish('festivalOrganizers.byParent', function festivalOrganizersbyEvent(id) {
  return FestivalOrganizers.find({'parentId': id}, {
    fields: FestivalOrganizers.publicFields,
    limit: 25,
  });
});

Meteor.publish('festivalOrganizers.byProfile', function festivalOrganizersbyProfile(id) {
  return FestivalOrganizers.find({'profile._id': id}, {
    fields: FestivalOrganizers.publicFields,
    limit: 25,
  });
});

Meteor.publish('festivalOrganizers.anyById', function festivalOrganizersbyProfile(id) {
  return FestivalOrganizers.find(
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
      fields: FestivalOrganizers.publicFields,
      limit: 25,
    }
  );
});
