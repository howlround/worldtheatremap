import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchEvents from '../pages/SearchEvents.jsx';

export default createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const countriesSubscribe = Meteor.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');
  const eventsSubscribe = Meteor.subscribe('events.public');
  return {
    loading: !(localitiesSubscribe.ready() && countriesSubscribe.ready() && administrativeAreasSubscribe.ready() && eventsSubscribe.ready()),
  };
}, SearchEvents);
