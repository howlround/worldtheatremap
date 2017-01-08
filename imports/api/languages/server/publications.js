/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Languages } from '../languages.js';

Meteor.publish('languages.public', function languagesPublic() {
  return Languages.find({}, {
    fields: Languages.publicFields,
    sort: { label: 1 },
  });
});
