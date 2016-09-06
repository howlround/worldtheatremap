/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Countries } from '../countries.js';

Meteor.publish('countries.public', function countriesPublic() {
  return Countries.find({}, {
    fields: Countries.publicFields,
  });
});
