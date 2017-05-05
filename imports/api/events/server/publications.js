/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Events } from '../events.js';

Meteor.publish('events.public', function eventsPublic() {
  return Events.find({}, {
    fields: Events.publicFields,
    sort: { startDate: 1 },
  });
});

Meteor.publish('events.single', function eventsPublic(id) {
  return Events.find({'_id': id}, {
    fields: Events.publicFields,
    limit: 1,
  });
});

Meteor.publish('events.search', function eventsSearch(query, skip) {
  const limit = 20;

  return Events.find(query, {
    fields: Events.publicFields,
    sort: { startDate: 1 },
    limit,
    skip,
  });
});

Meteor.publish('events.withLocations', function eventsPublic() {
  return Events.find({ 'lat': { $ne: null}}, {
    fields: Events.publicFields,
  });
});

Meteor.publish('events.dateRangeWithLocations', function eventsPublic(start, end) {
  return Events.find({
    'lat': {
      $ne: null
    },
    'startDate': {
      $lte: end
    },
    'endDate': {
      $gte: start
    }
  }, {
    fields: Events.publicFields,
    sort: { startDate: 1 }
  });
});

Meteor.publish('events.byShow', function eventsbyShow(id) {
  return Events.find({'show._id': id}, {
    fields: Events.publicFields,
    sort: { startDate: -1 }
  });
});

Meteor.publish('events.idsByOrg', function eventsIdsByOrg(id) {
  return Events.find({'organizations._id': id}, {
    fields: {
      show: 1,
      organizations: 1
    },
    sort: { startDate: 1 }
  });
});

Meteor.publish('events.byOrg', function eventsByOrg(id) {
  return Events.find({'organizations._id': id}, {
    fields: Events.publicFields,
    sort: { startDate: 1 }
  });
});
