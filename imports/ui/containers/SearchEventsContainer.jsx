import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchEvents from '../pages/SearchEvents.jsx';

export default createContainer(() => {
  const eventsSubscribe = Meteor.subscribe('events.search', {}, 1);
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  return {
    loading: (!eventsSubscribe.ready() || !localitiesSubscribe.ready()),
  };
}, SearchEvents);
