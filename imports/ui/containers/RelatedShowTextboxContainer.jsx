import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import RelatedShowTextbox from '../components/RelatedShowTextbox.jsx';

// Collections
import { Shows } from '../../api/shows/shows.js';

const RelatedShowTextboxContainer = createContainer((props) => {
  const search = props.parentValue.name;
  let results = [];
  let loading = false;

  if (search && search.length > 0) {
    const showsSubscribe = Meteor.subscribe('shows.autocompleteQuery', search);
    const regex = new RegExp('^' + search + '.*', 'i');
    results = Shows.find({name: { $regex: regex }}, { limit: 5, fields: Shows.autocompleteFields }).fetch();

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
  };
}, RelatedShowTextbox);

export default RelatedShowTextboxContainer;
