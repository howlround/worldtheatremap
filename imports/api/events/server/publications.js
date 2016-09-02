/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Events } from '../events.js';

Meteor.publish('events.public', function eventsPublic() {
  return Events.find({}, {
    fields: Events.publicFields,
  });
});

Meteor.publish('events.withLocations', function eventsPublic() {
  return Events.find({ 'lat': { $ne: null}}, {
    fields: Events.publicFields,
  });
});

Meteor.publish('events.byShow', function eventsbyShow(id) {
  return Events.find({'show.id': id}, {
    fields: Events.publicFields,
    limit: 1,
  });
});
