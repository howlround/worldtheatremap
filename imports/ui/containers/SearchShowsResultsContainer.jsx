import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Shows } from '../../api/shows/shows.js';
import SearchShowsResults from '../components/SearchShowsResults.jsx';

const SearchShowsResultsContainer = createContainer((props) => {
  const { query } = props;
  // let loading = false;
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    const privateQuery = {};

    if (query.name) {
      privateQuery.name = new RegExp(query.name, 'i');
    }

    if (query.interests && query.interests instanceof Array) {
      privateQuery.interests = {
        $in: query.interests,
      };
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      // @TODO: Figure out why specific subscribe isn't working
      // then remove the generic subscribe on
      // const showsSubscribe = Meteor.subscribe('shows.search', privateQuery);
      // loading = !showsSubscribe.ready();
      results = Shows.find(
        privateQuery,
        {
          sort: {
            name: 1,
          },
          limit: 20,
        }
      ).fetch();
    }
  }

  return {
    results,
    // loading,
  };
}, SearchShowsResults);

export default SearchShowsResultsContainer;
