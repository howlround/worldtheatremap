import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Events } from '../../api/events/events.js';
import SearchEventsResults from '../components/SearchEventsResults.jsx';

export default SearchEventsResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    let privateQuery = {};

    if (query.locality && query.locality instanceof Array) {
      privateQuery.locality = {
        $in: query.locality
      };
    }

    const eventsSubscribe = Meteor.subscribe('events.search', privateQuery);
    loading = !eventsSubscribe.ready();
    results = Events.find(privateQuery, { sort: { startDate: 1 } }).fetch();
  }

  return {
    results: results,
    loading: loading,
  };
}, SearchEventsResults);
