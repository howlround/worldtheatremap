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
    if (query.name) {
      query.name = new RegExp(query.name, 'i');
    }
    const eventsSubscribe = Meteor.subscribe('events.search', query);
    loading = !eventsSubscribe.ready();
    results = Events.find(query, { sort: { startDate: 1 } }).fetch();
  }

  return {
    results: results,
    loading: loading,
  };
}, SearchEventsResults);
