import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import RelatedShowTextbox from '../components/RelatedShowTextbox.jsx';

// Collections
import { Shows } from '../../api/shows/shows.js';

const RelatedShowTextboxContainer = createContainer(() => {
  const showsAutocompleteQuery = (search) => {
    const showsSubscribe = Meteor.subscribe('shows.autocompleteQuery', search);
    const regex = new RegExp('^' + search + '.*', 'i');
    const results = Shows.find({name: { $regex: regex }}, { limit: 5, fields: Shows.autocompleteFields }).fetch();

    return results;
  }

  return {
    showsAutocompleteQuery
  };
}, RelatedShowTextbox);

export default RelatedShowTextboxContainer;
