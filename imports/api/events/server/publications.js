/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Events } from '../events.js';

Meteor.publish('events.public', function eventsPublic() {
  return Events.find({}, {
    fields: Events.publicFields,
    sort: { startDate: 1 },
  });
});

Meteor.publish('events.single', function eventsPublic(id) {
  check(id, String);

  return Events.find({ _id: id }, {
    fields: Events.publicFields,
    limit: 1,
  });
});

Meteor.publish('events.search', function eventsSearch(query, skip) {
  check(skip, Number);
  check(query, Object);

  const limit = 20;

  return Events.find(query, {
    fields: Events.publicFields,
    sort: { startDate: 1 },
    limit,
    skip,
  });
});

Meteor.publish('events.withLocations', function eventsPublic() {
  return Events.find({ lat: { $ne: null } }, {
    fields: Events.publicFields,
  });
});

Meteor.publish('events.dateRangeWithLocations', function eventsPublic(start, end) {
  check(start, Date);
  check(end, Date);

  return Events.find({
    lat: {
      $ne: null,
    },
    startDate: {
      $lte: end,
    },
    endDate: {
      $gte: start,
    },
  }, {
    fields: Events.publicFields,
    sort: { startDate: 1 },
  });
});

Meteor.publish('events.byShow', function eventsbyShow(id) {
  check(id, String);

  return Events.find({ 'show._id': id }, {
    fields: Events.publicFields,
    sort: { startDate: -1 },
  });
});

Meteor.publish('events.idsByOrg', function eventsIdsByOrg(id) {
  check(id, String);

  return Events.find({ 'organizations._id': id }, {
    fields: {
      show: 1,
      organizations: 1,
    },
    sort: { startDate: 1 },
  });
});

Meteor.publish('events.byOrg', function eventsByOrg(id) {
  check(id, String);

  return Events.find({ 'organizations._id': id }, {
    fields: Events.publicFields,
    sort: { startDate: 1 },
  });
});

Meteor.publish('events.byOrgPlusIds', function eventsByOrgPlusOthers(id, additionalIds) {
  check(id, String);
  check(additionalIds, [String]);

  return Events.find(
    {
      $or: [
        { 'organizations._id': id },
        {
          _id: {
            $in: additionalIds,
          },
        },
      ],
    }, {
      fields: Events.publicFields,
      sort: { startDate: 1 },
    }
  );
});
