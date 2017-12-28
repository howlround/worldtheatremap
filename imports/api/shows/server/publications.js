/* eslint-disable prefer-arrow-callback */
import { TAPi18n } from 'meteor/tap:i18n';
import { Shows } from '../shows.js';
import { _ } from 'meteor/underscore';
import escapeRegExp from 'lodash.escaperegexp';
import { remove as removeDiacritics } from 'diacritics';

TAPi18n.publish('shows.public', function showsPublic() {
  return Shows.i18nFind({}, {
    fields: Shows.publicFields,
  });
});

TAPi18n.publish('shows.autocomplete', function showsAutocomplete() {
  return Shows.i18nFind({}, {
    fields: Shows.autocompleteFields,
  });
});

TAPi18n.publish('shows.autocompleteQuery', function showsAutocompleteQuery(search) {
  const query = {
    nameSearch: new RegExp(`.*${escapeRegExp(removeDiacritics(search)).toUpperCase()}.*`)
  }

  return Shows.i18nFind(query, {
    fields: Shows.autocompleteFields,
    limit: 10,
  });
});

TAPi18n.publish('shows.byAuthor', function showsById(authorId) {
  return Shows.i18nFind({ 'author._id': { $in: [authorId] } }, {
    fields: Shows.publicFields,
  });
});


TAPi18n.publish('shows.byAuthorPlusOthers', function showsByAuthorPlusOthers(authorId, additionalIds) {
  return Shows.i18nFind(
    {
      $or: [
        {
          'author._id': {
            $in: [authorId],
          },
        },
        {
          _id: {
            $in: additionalIds,
          },
        },
      ],
    }, {
      fields: Shows.publicFields,
    }
  );
});

TAPi18n.publish('shows.multipleById', function showsMultipleById(ids) {
  return Shows.i18nFind({ _id: { $in: ids } }, {
    fields: Shows.publicFields,
  });
});

TAPi18n.publish('shows.singleById', function showsSingleById(id) {
  return Shows.i18nFind({ _id: id }, {
    fields: Shows.publicFields,
    limit: 1,
  });
});

TAPi18n.publish('shows.singleNameById', function showsSingleNameById(id) {
  return Shows.i18nFind({ _id: id }, {
    fields: { name: 1 },
    limit: 1,
  });
});

TAPi18n.publish('shows.search', function showsSearch(plainTextQuery, skip) {
  const processedQuery = _.clone(plainTextQuery);

  if (plainTextQuery.name) {
    processedQuery.nameSearch = new RegExp(`.*${escapeRegExp(removeDiacritics(plainTextQuery.name)).toUpperCase()}.*`);
    delete processedQuery.name;
  }

  // const limit = 20;
  const limit = 1000;

  return Shows.i18nFind(processedQuery, {
    fields: Shows.searchFields,
    sort: { nameSearch: 1 },
    limit,
    skip,
  });
});
