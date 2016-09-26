/* eslint-disable prefer-arrow-callback */
import { TAPi18n } from 'meteor/tap:i18n'
import { Profiles } from '../profiles.js';

TAPi18n.publish('profiles.public', function profilesPublic() {
  return Profiles.i18nFind({}, {
    fields: Profiles.publicFields,
  });
});

TAPi18n.publish('profiles.autocomplete', function profilesPublic() {
  return Profiles.i18nFind({}, {
    fields: { name: 1 },
  });
});


TAPi18n.publish('profiles.autocompleteQuery', function profilesPublic(search) {
  const regex = new RegExp('^' + search + '.*', 'i');
  return Profiles.i18nFind({name: { $regex: regex }}, {
    fields: Profiles.autocompleteFields,
  });
});

TAPi18n.publish('profiles.search', function profilesSearch(query, requestedPage) {
  let processedQuery = _.clone(query);

  if (processedQuery.name) {
    processedQuery.name = new RegExp(query.name, 'i');
  }

  const limit = 20;
  const skip = requestedPage ? requestedPage * limit : 0;

  return Profiles.i18nFind(processedQuery, {
    fields: Profiles.publicFields,
    sort: { name: 1 },
    limit,
    skip,
  });
});

TAPi18n.publish('profiles.searchNames', function profilesSearch(query, requestedPage) {
  let processedQuery = _.clone(query);

  if (processedQuery.name) {
    processedQuery.name = new RegExp(query.name, 'i');
  }

  const limit = 20;
  const skip = requestedPage ? requestedPage * limit : 0;

  return Profiles.i18nFind(processedQuery, {
    fields: { name: 1 },
    sort: { name: 1 },
    limit,
    skip,
  });
});

TAPi18n.publish('profiles.byId', function profilesById(ids) {
  return Profiles.i18nFind({ _id: { $in: ids } }, {
    fields: Profiles.publicFields,
  });
});

TAPi18n.publish('profiles.singleById', function singleById(id) {
  return Profiles.i18nFind({ _id: id }, {
    fields: Profiles.publicFields,
    limit: 1,
  });
});
