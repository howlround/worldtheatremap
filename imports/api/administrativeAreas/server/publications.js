/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { AdministrativeAreas } from '../administrativeAreas.js';

Meteor.publish('administrativeAreas.public', function countriesPublic() {
  return AdministrativeAreas.find({}, {
    fields: AdministrativeAreas.publicFields,
    sort: { label: 1 },
  });
});
