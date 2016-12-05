/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Ethnicities } from '../ethnicities.js';

Meteor.publish('ethnicities.public', function ethnicitiesPublic() {
  return Ethnicities.find({}, {
    fields: Ethnicities.publicFields,
    sort: { label: 1 },
  });
});
