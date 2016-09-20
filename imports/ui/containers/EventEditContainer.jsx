import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleEventSubscription = Meteor.subscribe('events.single', id);
  const event = Events.findOne(id);
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const loading = !(GoogleMaps.loaded() && singleEventSubscription.ready());
  const eventExists = !loading && !!event;
  return {
    loading,
    event,
    editing: eventExists ? event._id : null,
  };
}, EventPage);
