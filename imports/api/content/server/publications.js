/* eslint-disable prefer-arrow-callback */

import { TAPi18n } from 'meteor/tap:i18n';

import { Content } from '../content.js';

TAPi18n.publish('content.singleById', function contentSingleById(_id) {
  return Content.i18nFind({ _id }, {
    fields: Content.publicFields,
  });
});

TAPi18n.publish('content.singleByTitle', function contentSingleByTitle(title) {
  return Content.i18nFind({ title }, {
    fields: Content.publicFields,
    limit: 1,
  });
});
