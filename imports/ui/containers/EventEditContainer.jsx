import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

const EventEditContainer = createContainer(({ params: { id, locale } }) => {
  const googleParams = {
    key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM',
    libraries: 'places',
  }
  if (locale) {
    googleParams.language = locale;
  }

  const singleEventSubscription = Meteor.subscribe('events.single', id);
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const event = Events.findOne(id);
  GoogleMaps.load(googleParams);
  const loading = !(singleEventSubscription.ready() && countriesSubscribe.ready() && GoogleMaps.loaded());
  const eventExists = !loading && !!event;
  return {
    loading,
    event,
    editing: eventExists ? event._id : null,
  };
}, EventPage);

export default EventEditContainer;
