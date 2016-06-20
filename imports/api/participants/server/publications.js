/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Participants } from '../participants.js';

Meteor.publish('participants.public', function participantsPublic() {
  return Participants.find({}, {
    fields: Participants.publicFields,
  });
});

Meteor.publish('participants.byEvent', function participantsbyEvent(id) {
  return Participants.find({'event._id': id}, {
    fields: Participants.publicFields,
  });
});

Meteor.publish('participants.byProfile', function participantsbyProfile(id) {
  return Participants.find({'profile.id': id}, {
    fields: Participants.publicFields,
  });
});
