/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Events } from '../events.js';

Meteor.publish('events.public', function eventsPublic() {
  return Events.find({}, {
    fields: Events.publicFields,
  });
});
