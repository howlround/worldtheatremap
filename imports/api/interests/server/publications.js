/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { Interests } from '../interests.js';

TAPi18n.publish('interests.public', function interestsPublic() {
  return Interests.i18nFind({}, {
    fields: Interests.publicFields,
    sort: { label: 1 },
  });
});
