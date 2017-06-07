import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import escapeRegExp from 'lodash.escaperegexp';

// Components
import RelatedShowTextbox from '../components/RelatedShowTextbox.jsx';

// Collections
import { Shows } from '../../api/shows/shows.js';

const RelatedShowTextboxContainer = createContainer((props) => {
  let parentValue = _.clone(props.parentValue);
  const showSubscribe = (!_.isEmpty(props.parentValue)) ? TAPi18n.subscribe('shows.singleById', parentValue._id) : null;
  const updatedShowName = Shows.find({ _id: props.parentValue._id }, { fields: { name: 1 } }).fetch();
  if (!_.isNull(showSubscribe) && !_.isEmpty(updatedShowName) && updatedShowName.length > 0) {
    parentValue.name = updatedShowName[0].name
  }
  // parentValue.name = (!_.isNull(showSubscribe) && !_.isEmpty(updatedShowName) && updatedShowName.length > 0) ? updatedShowName[0].name : props.parentValue.name;

  const search = parentValue.name;
  let results = [];
  let loading = false;

  if (search && search.length > 0) {
    const showsSubscribe = TAPi18n.subscribe('shows.autocompleteQuery', search);
    const regex = new RegExp(`.*${escapeRegExp(search)}.*`, 'i');
    results = Shows.find({name: { $regex: regex }}, { limit: 10, fields: Shows.autocompleteFields }).fetch();

    // Subscribe to show authors (from multiple shows)
    let authorIds = [];
    _.each(results, (show) => {
      _.each(show.author, (author) => authorIds.push(author._id));
    });
    const authorsSubscribe = TAPi18n.subscribe('profiles.byId', authorIds);

    loading = !(showsSubscribe.ready() && authorsSubscribe.ready());
  }

  return {
    results,
    loading,
    parentValue,
  };
}, RelatedShowTextbox);

export default RelatedShowTextboxContainer;
