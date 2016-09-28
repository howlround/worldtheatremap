import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import moment from 'moment';

import { Events } from '../../api/events/events.js';

import SearchEventsResults from '../components/SearchEventsResults.jsx';


const SearchEventsResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let skip = 0;
  let results = [];
  let totalCount = 0;

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
        $gte: moment(query.startDate).startOf('day').toDate(),
      };
    }

    if (query.endDate) {
      privateQuery.startDate = {
        $lte: moment(query.endDate).endOf('day').toDate(),
      };
    }

    if (query.page) {
      skip = Number(query.page) * 20;
    }

    if (!_.isEmpty(privateQuery)) {
      const eventsSubscribe = Meteor.subscribe('events.search', privateQuery, skip);
      totalCount = Events.find(privateQuery).count();
      results = Events.find(
        privateQuery,
        {
          sort: {
            startDate: 1,
          },
          limit: 20,
          skip,
        }).fetch();

      // Get author and show ids for these events
      const resultsAuthors = [];
      const resultsShows = [];
      _.each(results, (event) => {
        resultsShows.push(event.show._id);
        _.each(event.show.author, (author) => resultsAuthors.push(author._id));
      });

      const resultsAuthorsSubscribe = TAPi18n.subscribe('profiles.byId', resultsAuthors);
      const resultsShowsSubscribe = TAPi18n.subscribe('shows.multipleById', resultsShows);

    }
  }

  return {
    results,
    loading,
    skip,
    totalCount,
    query,
  };
}, SearchEventsResults);

export default SearchEventsResultsContainer;
