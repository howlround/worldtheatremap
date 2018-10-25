import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import moment from 'moment-timezone';

import { Events } from '../../api/events/events.js';

import SearchEventsResults from '../components/SearchEventsResults.jsx';


const SearchEventsResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let skip = 0;
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    const privateQuery = {};

    if (query.locality && query.locality instanceof Array) {
      privateQuery.locality = {
        $in: query.locality,
      };
    }

    if (query.administrativeArea && query.administrativeArea instanceof Array) {
      privateQuery.administrativeArea = {
        $in: query.administrativeArea,
      };
    }

    if (query.country && query.country instanceof Array) {
      privateQuery.country = {
        $in: query.country,
      };
    }

    if (query.eventType) {
      privateQuery.eventType = query.eventType;
    }

    if (query.startDate) {
      privateQuery.endDate = {
        $gte: moment(query.startDate).tz("America/New_York").startOf('day').toDate(),
      };
    }

    if (query.endDate) {
      privateQuery.startDate = {
        $lte: moment(query.endDate).tz("America/New_York").endOf('day').toDate(),
      };
    }

    if (query.page) {
      skip = Number(query.page) * 20;
    }

    if (!_.isEmpty(privateQuery)) {
      const eventsSubscribe = Meteor.subscribe('events.search', privateQuery, skip);
      loading = !eventsSubscribe.ready();
      results = Events.find(
        privateQuery,
        {
          sort: {
            startDate: 1,
          },
          limit: 20,
        }).fetch();

      // Get author and show ids for these events
      const resultsAuthors = [];
      const resultsShows = [];
      _.each(results, (event) => {
        resultsShows.push(event.show._id);
        resultsAuthors.push(event.organizations._id);
        _.each(event.show.author, (author) => resultsAuthors.push(author._id));
      });

      // resultsAuthorsSubscribe
      TAPi18n.subscribe('profiles.byId', resultsAuthors);
      // resultsShowsSubscribe
      TAPi18n.subscribe('shows.multipleById', resultsShows);
    }
  }

  return {
    results,
    loading,
    skip,
    query,
  };
}, SearchEventsResults);

export default SearchEventsResultsContainer;
