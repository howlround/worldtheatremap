import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import escapeRegExp from 'lodash.escaperegexp';
import { Shows } from '../../api/shows/shows.js';
import SearchShowsResults from '../components/SearchShowsResults.jsx';

const SearchShowsResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let skip = 0;
  let results = [];
  let totalCount = 0;

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    const privateQuery = {};

    if (query.interests && query.interests instanceof Array) {
      privateQuery.interests = {
        $in: query.interests,
      };
    }

    if (query.country && query.country instanceof Array) {
      privateQuery.country = {
        $in: query.country,
      };
    }

    if (query.languages && query.languages instanceof Array) {
      privateQuery.languages = {
        $in: query.languages,
      };
    }

    if (query.page) {
      skip = Number(query.page) * 20;
    }

    // The publication can't accept regex values as the argument so make a seperate query to pass
    const plainTextQuery = _.clone(privateQuery);

    if (query.name) {
      privateQuery.name = new RegExp(`.*${escapeRegExp(query.name)}.*`, 'i');
      plainTextQuery.name = query.name;
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      const showsSubscribe = TAPi18n.subscribe('shows.search', plainTextQuery, skip);
      totalCount = Shows.find(privateQuery).count();
      results = Shows.find(
        privateQuery,
        {
          sort: {
            name: 1,
          },
          limit: 20,
          skip,
        }
      ).fetch();

      const profiles = [];
      _.each(results, show => {
        _.each(show.author, author => profiles.push(author._id));
      });
      const profilesSubscribe = TAPi18n.subscribe('profiles.byId', profiles);
    }
  }

  return {
    results,
    loading,
  };
}, SearchShowsResults);

export default SearchShowsResultsContainer;
