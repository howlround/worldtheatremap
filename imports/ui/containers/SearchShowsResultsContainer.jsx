import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import escapeRegExp from 'lodash.escaperegexp';
import { remove as removeDiacritics } from 'diacritics';

import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import SearchShowsResults from '../components/SearchShowsResults.jsx';

const SearchShowsResultsContainer = createContainer((props) => {
  const { query, updateQuery } = props;
  let loading = false;
  let skip = 0;
  let showResults = [];
  let results = [];

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
      privateQuery.nameSearch = new RegExp(`.*${escapeRegExp(removeDiacritics(query.name)).toUpperCase()}.*`);
      plainTextQuery.name = query.name;
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      const showsSubscribe = TAPi18n.subscribe('shows.search', plainTextQuery, skip);
      loading = !showsSubscribe.ready();
      showResults = Shows.find(
        {},
        {
          sort: {
            name: 1,
          },
          limit: 20,
        }
      ).fetch();

      const profiles = [];
      _.each(showResults, show => {
        _.each(show.author, author => profiles.push(author._id));
      });
      const profilesSubscribe = TAPi18n.subscribe('profiles.byId', profiles);
    }
  }

  // Recombine the results into something usable for SearchShowsResults
  // showResults could either but full of shows if show filters were used
  // or could be empty if no filters or event filter were used

  // If there are showResults, load all the events for these shows
  // @TODO: Also do this if there are valid events filters
  // @TODO: Add event filters to this query
  const eventsQuery = { 'show._id': { $in: ['5WTe3uy29wpsMkyaw'] } };
  const eventsSubscribe = Meteor.subscribe('events.search', eventsQuery, 0);
  // const eventsResults = Events.find(
  //   eventsQuery,
  //   {
  //     sort: {
  //       startDate: 1,
  //     },
  //   }).fetch();

  // console.log(eventsResults);

  // @TODO: Reformat results to be results { show: {}, events: []}
  results = _.map(showResults, show => {
    const eventsByShowQuery = { 'show._id': show._id };
    const events = Events.find(
      eventsByShowQuery,
      {
        sort: {
          startDate: 1,
        },
      }).fetch();

    return {
      show,
      events,
    }
  });

  return {
    results,
    loading,
    skip,
    query,
    updateQuery,
  };
}, SearchShowsResults);

export default SearchShowsResultsContainer;
