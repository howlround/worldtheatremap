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
  let showResultIds = [];
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    const privateShowQuery = {};
    const privateEventQuery = {};

    if (query.interests && query.interests instanceof Array) {
      privateShowQuery.interests = {
        $in: query.interests,
      };
    }

    if (query.country && query.country instanceof Array) {
      privateShowQuery.country = {
        $in: query.country,
      };
    }

    if (query.languages && query.languages instanceof Array) {
      privateShowQuery.languages = {
        $in: query.languages,
      };
    }

    if (query.page) {
      skip = Number(query.page) * 20;
    }

    // The publication can't accept regex values as the argument so make a seperate query to pass
    const plainTextQuery = _.clone(privateShowQuery);

    if (query.name) {
      privateShowQuery.nameSearch = new RegExp(`.*${escapeRegExp(removeDiacritics(query.name)).toUpperCase()}.*`);
      plainTextQuery.name = query.name;
    }

    // Make sure privateShowQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateShowQuery)) {
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
        showResultIds.push(show._id);
        _.each(show.author, author => profiles.push(author._id));
      });
      const profilesSubscribe = TAPi18n.subscribe('profiles.byId', profiles);
    }

    // Process Event query
    if (query.eventType) {
      privateEventQuery.eventType = query.eventType;
    }

    // Recombine the results into something usable for SearchShowsResults
    // showResults could either but full of shows if show filters were used
    // or could be empty if no filters or event filter were used

    // If there are showResults, load all the events for these shows
    privateEventQuery['show._id'] = { $in: showResultIds };;
    const eventsSubscribe = Meteor.subscribe('events.search', privateEventQuery, 0);

    results = _.map(showResults, show => {
      const eventsByShowQuery = { 'show._id': show._id };
      const events = Events.find(
        eventsByShowQuery,
        {
          sort: {
            startDate: 1,
          },
        }).fetch();

      // Reformat results to be results { show: {}, events: []}
      // If events filters are used only return show if there are events
      if (!_.isEmpty(events) && !_.isEmpty(events)) {
        return {
          show,
          events,
        }
      // Otherwise if there is no events query return shows only
      } else if (_.isEmpty(events)) {
        return {
          show,
        }
      }
    });

    // Clean out null values in results
    // (from _.map if none of the return values are met)
    results = _.compact(results);
  }

  return {
    results,
    loading,
    skip,
    query,
    updateQuery,
  };
}, SearchShowsResults);

export default SearchShowsResultsContainer;
