/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { Countries } from '../countries.js';

TAPi18n.publish('countries.public', function countriesPublic() {
  return Countries.i18nFind({}, {
    fields: Countries.publicFields,
    sort: { label: 1 },
  });
});
