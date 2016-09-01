/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Localities } from '../localities.js';

Meteor.publish('localities.public', function profilesPublic() {
  return Localities.find({}, {
    fields: Localities.publicFields,
  });
});
