/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { Genders } from '../genders.js';

TAPi18n.publish('genders.public', function gendersPublic() {
  return Genders.i18nFind({}, {
    fields: Genders.publicFields,
    sort: { label: 1 },
  });
});
