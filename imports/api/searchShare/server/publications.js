/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SearchShare } from '../searchShare.js';

Meteor.publish('searchShare.byText', function searchShareByText(filename) {
  check(filename, String);
  return SearchShare.find({ filename }, {
    fields: SearchShare.publicFields,
    limit: 1,
  });
});
