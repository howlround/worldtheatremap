/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Shows } from '../shows.js';
import { _ } from 'meteor/underscore';

Meteor.publish('shows.public', function showsPublic() {
  return Shows.find({}, {
    fields: Shows.publicFields,
  });
});

Meteor.publish('shows.autocomplete', function showsPublic() {
  return Shows.find({}, {
    fields: Shows.autocompleteFields,
  });
});

Meteor.publish('shows.autocompleteQuery', function showsPublic(search) {
  const regex = new RegExp(`^${search}.*`, 'i');
  return Shows.find({ name: { $regex: regex } }, {
    fields: Shows.autocompleteFields,
  });
});

Meteor.publish('shows.byAuthor', function showsById(authorId) {
  return Shows.find({ 'author._id': { $in: [authorId] } }, {
    fields: Shows.publicFields,
  });
});


Meteor.publish('shows.byAuthorPlusOthers', function showsById(authorId, additionalIds) {
  return Shows.find(
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

Meteor.publish('shows.multipleById', function showsById(ids) {
  return Shows.find({ _id: { $in: ids } }, {
    fields: Shows.publicFields,
  });
});

Meteor.publish('shows.singleById', function showsById(id) {
  return Shows.find({ _id: id }, {
    fields: Shows.publicFields,
    limit: 1,
  });
});

Meteor.publish('shows.singleNameById', function showsById(id) {
  return Shows.find({ _id: id }, {
    fields: { name: 1 },
    limit: 1,
  });
});

Meteor.publish('shows.search', function showsSearch(plainTextQuery, skip) {
  const processedQuery = _.clone(plainTextQuery);

  if (plainTextQuery.name) {
    processedQuery.name = new RegExp(`^${plainTextQuery.name}.*`, 'i');
  }

  const limit = 20;

  return Shows.find(processedQuery, {
    fields: Shows.searchFields,
    sort: { name: 1 },
    limit,
    skip,
  });
});
