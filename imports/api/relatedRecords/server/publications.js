/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { RelatedRecords } from '../relatedRecords.js';

// Meteor.publish('relatedRecords.public', function relatedRecordsPublic() {
//   return RelatedRecords.find({}, {
//     fields: RelatedRecords.publicFields,
//   });
// });

// Meteor.publish('relatedRecords.byEvent', function relatedRecordsbyEvent(id) {
//   return RelatedRecords.find({'event._id': id}, {
//     fields: RelatedRecords.publicFields,
//   });
// });

Meteor.publish('relatedRecords.byProfile', function relatedRecordsbyProfile(id) {
  check(id, String);
  return RelatedRecords.find({ profiles: id }, {
    fields: RelatedRecords.publicFields,
    limit: 25,
  });
});
