/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { Roles } from '../selfDefinedRoles.js';

TAPi18n.publish('roles.public', function rolesPublic() {
  return Roles.i18nFind({}, {
    fields: Roles.publicFields,
    sort: { label: 1 },
  });
});
