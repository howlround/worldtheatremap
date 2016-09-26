import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import RelatedShowTextbox from '../components/RelatedShowTextbox.jsx';

// Collections
import { Shows } from '../../api/shows/shows.js';

const RelatedShowTextboxContainer = createContainer((props) => {
  const search = props.parentValue.name;

  const showsSubscribe = Meteor.subscribe('shows.autocompleteQuery', search);
  const regex = new RegExp('^' + search + '.*', 'i');
  const results = Shows.find({name: { $regex: regex }}, { limit: 5, fields: Shows.autocompleteFields }).fetch();

  // Subscribe to show authors (from multiple shows)
  let authorIds = [];
  _.each(results, (show) => {
    _.each(show.author, (author) => authorIds.push(author._id));
  });
  const authorsSubscribe = TAPi18n.subscribe('profiles.byId', authorIds);

  // const loading = !(showsSubscribe.ready() && authorsSubscribe.ready());

  return {
    results,
  };
}, RelatedShowTextbox);

export default RelatedShowTextboxContainer;
