/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SearchShare } from '../searchShare.js';

Meteor.publish('searchShare.byText', function searchShareByText(summary) {
  check(summary, String);
  return SearchShare.find({ summary }, {
    fields: SearchShare.publicFields,
    limit: 1,
  });
});
