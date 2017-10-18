import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import escapeRegExp from 'lodash.escaperegexp';
import moment from 'moment';
import { _ } from 'meteor/underscore';
import { createContainer } from 'meteor/react-meteor-data';
import { remove as removeDiacritics } from 'diacritics';

import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import SearchShowsResults from '../components/SearchShowsResults.jsx';

const getEventsFromShows = ({ showResults, privateEventQuery }) => {
  const results = _.map(showResults, show => {
    let output = null;
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
    if (!_.isEmpty(events)) {
      output = {
        show,
        events,
      };
    // if there is no events query return show only
    // _.size(privateEventQuery) === 1 is the check
    // because we add the showResultIds to the query above
    } else if (_.isEmpty(events) && _.size(privateEventQuery) === 1) {
      output = {
        show,
      };
    }

    return output;
  });

  return results;
};

const SearchShowsResultsContainer = createContainer((props) => {
  const { query, updateQuery } = props;
  let loading = false;
  let skip = 0;
  let showResults = [];
  const showResultIds = [];
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
      const nameRegex = escapeRegExp(removeDiacritics(query.name)).toUpperCase();
      privateShowQuery.nameSearch = new RegExp(`.*${nameRegex}.*`);
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
      // profilesSubscribe
      TAPi18n.subscribe('profiles.byId', profiles);
    }

    // Process Event query items
    if (query.eventType) {
      privateEventQuery.eventType = query.eventType;
    }

    if (query.eventsCountry && query.eventsCountry instanceof Array) {
      privateEventQuery.country = {
        $in: query.eventsCountry,
      };
    }

    if (query.locality && query.locality instanceof Array) {
      privateEventQuery.locality = {
        $in: query.locality,
      };
    }

    if (query.administrativeArea && query.administrativeArea instanceof Array) {
      privateEventQuery.administrativeArea = {
        $in: query.administrativeArea,
      };
    }

    if (query.startDate) {
      privateEventQuery.endDate = {
        $gte: moment(query.startDate).startOf('day').toDate(),
      };
    }

    if (query.endDate) {
      privateEventQuery.startDate = {
        $lte: moment(query.endDate).endOf('day').toDate(),
      };
    }

    // // If there are show results, check for events and return whatever we find.
    // // Otherwise check for event filters then load parent shows
    if (!_.isEmpty(showResults)) {
      // Load all the events for these shows
      privateEventQuery['show._id'] = { $in: showResultIds };
      // eventsSubscribe
      Meteor.subscribe('events.search', privateEventQuery, 0);

      results = getEventsFromShows({ showResults, privateEventQuery });
    } else if (!_.isEmpty(privateEventQuery) && _.isEmpty(privateShowQuery)) {
      // Otherwise check for event filters then load parent shows
      // But ONLY if there are no show filters. Otherwise this would cause
      // bad recursion. If privateShowQuery is not empty then something should have
      // been found above.
      // eventsSubscribe
      Meteor.subscribe('events.search', privateEventQuery, skip);

      const eventResults = Events.find(
        privateEventQuery,
        {
          sort: {
            startDate: 1,
          },
        }).fetch();

      // Get author and show ids for these events
      const resultsAuthors = [];
      const resultShowIds = [];
      const parentShowResults = [];
      _.each(eventResults, (event) => {
        parentShowResults.push(event.show);
        resultShowIds.push(event.show._id);
        resultsAuthors.push(event.organizations._id);
        _.each(event.show.author, (author) => resultsAuthors.push(author._id));
      });

      // resultsAuthorsSubscribe
      TAPi18n.subscribe('profiles.byId', resultsAuthors);
      // resultsShowsSubscribe
      TAPi18n.subscribe('shows.multipleById', resultShowIds);
      // privateEventQuery['show._id'] = { $in: resultShowIds }; // ??

      results = getEventsFromShows({
        showResults: parentShowResults,
        privateEventQuery,
      });
    }

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
