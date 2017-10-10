import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import SearchEvents from '../pages/SearchEvents.jsx';

export default createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');
  const eventTypesSubscribe = TAPi18n.subscribe('eventTypes.public');

  return {
    loading: !(
      localitiesSubscribe.ready() &&
      countriesSubscribe.ready() &&
      eventTypesSubscribe.ready() &&
      administrativeAreasSubscribe.ready()
    ),
  };
}, SearchEvents);
