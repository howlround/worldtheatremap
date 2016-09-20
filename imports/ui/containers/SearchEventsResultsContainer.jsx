import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import moment from 'moment';

import { Events } from '../../api/events/events.js';

import SearchEventsResults from '../components/SearchEventsResults.jsx';


export default createContainer((props) => {
  const { query } = props;
  let loading = true;
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
        $gte: moment(query.startDate).startOf('day').toDate(),
      };
    }

    if (query.endDate) {
      privateQuery.startDate = {
        $lte: moment(query.endDate).endOf('day').toDate(),
      };
    }

    if (!_.isEmpty(privateQuery)) {
      const eventsSubscribe = Meteor.subscribe('events.search', privateQuery);
      loading = !eventsSubscribe.ready();
      results = Events.find(
        privateQuery,
        {
          sort: {
            startDate: 1,
          },
          limit: 20,
        }).fetch();
    }
  }

  return {
    results,
    loading,
  };
}, SearchEventsResults);
