/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { Languages } from '../languages.js';

TAPi18n.publish('languages.public', function languagesPublic() {
  return Languages.i18nFind({}, {
    fields: Languages.publicFields,
    sort: { label: 1 },
  });
});

TAPi18n.publish('languages.used', function languagesUsed() {
  return Languages.i18nFind({
    usedInShows: true,
  }, {
    fields: Languages.publicFields,
    sort: { label: 1 },
  });
});
