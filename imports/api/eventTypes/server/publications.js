/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { EventTypes } from '../eventTypes.js';

TAPi18n.publish('eventTypes.public', function eventTypesPublic() {
  return EventTypes.i18nFind({}, {
    fields: EventTypes.publicFields,
    sort: { label: 1 },
  });
});
