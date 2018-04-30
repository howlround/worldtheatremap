/* eslint-disable prefer-arrow-callback */
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../profiles.js';
import { _ } from 'meteor/underscore';
import escapeRegExp from 'lodash.escaperegexp';
import formatForSearch from '../../../helpers/formatForSearch.js';

TAPi18n.publish('profiles.public', function profilesPublic() {
  return Profiles.i18nFind({}, {
    fields: Profiles.publicFields,
  });
});

TAPi18n.publish('profiles.autocomplete', function profilesAutocomplete() {
  return Profiles.i18nFind({}, {
    fields: { name: 1 },
  });
});

TAPi18n.publish('profiles.autocompleteQuery', function profilesAutocompleteQuery(search, limitKey) {
  const processedQuery = {};

  if (search) {
    const nameRegEx = formatForSearch(search);

    // Only use english for now. Locale isn't available from the container.
    // if (!_.isEmpty(locale) && locale !== 'en') {
    //   const i18nKey = `i18n.${locale}.nameSearch`;
    //   processedQuery[i18nKey] = new RegExp(`.*${nameRegEx}.*`);
    // } else {
      processedQuery.nameSearch = new RegExp(`.*${nameRegEx}.*`);
    // }
  }

  switch (limitKey) {
    case 'networks':
      processedQuery.orgTypes = { $in: ['Network / Association / Union'] };
      break;
    case 'notFestivals':
      processedQuery.profileType = { $ne: 'Festival' };
      break;
    default:
  }

  return Profiles.i18nFind(processedQuery, {
    fields: Profiles.autocompleteFields,
    limit: 10,
  });
});

TAPi18n.publish('profiles.search', function profilesSearch(plainTextQuery, skip, locale) {
  const processedQuery = _.clone(plainTextQuery);

  if (plainTextQuery.name) {
    const nameRegEx = formatForSearch(plainTextQuery.name);

    if (!_.isEmpty(locale) && locale !== 'en') {
      const i18nKey = `i18n.${locale}.nameSearch`;
      processedQuery[i18nKey] = new RegExp(`.*${nameRegEx}.*`);
    } else {
      processedQuery.nameSearch = new RegExp(`.*${nameRegEx}.*`);
    }

    delete processedQuery.name;
  }

  if (plainTextQuery.postalCode) {
    processedQuery.postalCode = new RegExp(`.*${escapeRegExp(plainTextQuery.postalCode)}.*`, 'i');
  }

  // const limit = 20;
  const limit = 1000;

  return Profiles.i18nFind(processedQuery, {
    fields: Profiles.publicFields,
    sort: { nameSearch: 1 },
    limit,
    skip,
  });
});

TAPi18n.publish('profiles.searchNames', function profilesSearchNames(query, requestedPage) {
  const processedQuery = _.clone(query);

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

TAPi18n.publish('profiles.viz', function profilesViz(homepageQuery) {
  return Profiles.i18nFind(homepageQuery, {
    fields: Profiles.publicFields,
  });
});

TAPi18n.publish('profiles.singleById', function profilesSingleById(id) {
  return Profiles.i18nFind({ _id: id }, {
    fields: Profiles.publicFields,
    limit: 1,
  });
});
