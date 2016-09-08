/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Shows } from '../shows.js';
import { _ } from 'meteor/underscore';

Meteor.publish('shows.public', function showsPublic() {
  return Shows.find({}, {
    fields: Shows.publicFields,
  });
});

Meteor.publish('shows.byAuthor', function showsById(authorId) {
  return Shows.find({ 'author.id': { $in: [authorId] } }, {
    fields: Shows.publicFields,
  });
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


Meteor.publish('shows.search', function showsSearch(query, requestedPage) {
  const limit = 20;
  const skip = (_.isNumber(requestedPage) && !_.isNaN(requestedPage)) ? requestedPage * limit : 0;
  return Shows.find(query, {
    fields: Shows.publicFields,
    sort: { name: 1 },
    limit,
    skip,
  });
});
