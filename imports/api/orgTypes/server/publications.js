/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { OrgTypes } from '../orgTypes.js';

TAPi18n.publish('orgTypes.public', function orgTypesPublic() {
  return OrgTypes.i18nFind({}, {
    fields: OrgTypes.publicFields,
    sort: { label: 1 },
  });
});
