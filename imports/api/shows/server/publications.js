/* eslint-disable prefer-arrow-callback */
import { TAPi18n } from 'meteor/tap:i18n';
import { Shows } from '../shows.js';
import { _ } from 'meteor/underscore';

TAPi18n.publish('shows.public', function showsPublic() {
  return Shows.i18nFind({}, {
    fields: Shows.publicFields,
  });
});

TAPi18n.publish('shows.autocomplete', function showsPublic() {
  return Shows.i18nFind({}, {
    fields: Shows.autocompleteFields,
  });
});

TAPi18n.publish('shows.autocompleteQuery', function showsPublic(search) {
  const regex = new RegExp(`.*${search}.*`, 'i');
  return Shows.i18nFind({ name: { $regex: regex } }, {
    fields: Shows.autocompleteFields,
  });
});

TAPi18n.publish('shows.byAuthor', function showsById(authorId) {
  return Shows.i18nFind({ 'author._id': { $in: [authorId] } }, {
    fields: Shows.publicFields,
  });
});


TAPi18n.publish('shows.byAuthorPlusOthers', function showsById(authorId, additionalIds) {
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

TAPi18n.publish('shows.multipleById', function showsById(ids) {
  return Shows.i18nFind({ _id: { $in: ids } }, {
    fields: Shows.publicFields,
  });
});

TAPi18n.publish('shows.singleById', function showsById(id) {
  return Shows.i18nFind({ _id: id }, {
    fields: Shows.publicFields,
    limit: 1,
  });
});

TAPi18n.publish('shows.singleNameById', function showsById(id) {
  return Shows.i18nFind({ _id: id }, {
    fields: { name: 1 },
    limit: 1,
  });
});

TAPi18n.publish('shows.search', function showsSearch(plainTextQuery, skip) {
  const processedQuery = _.clone(plainTextQuery);

  if (plainTextQuery.name) {
    processedQuery.name = new RegExp(`.*${plainTextQuery.name}.*`, 'i');
  }

  const limit = 20;

  return Shows.i18nFind(processedQuery, {
    fields: Shows.searchFields,
    sort: { name: 1 },
    limit,
    skip,
  });
});
