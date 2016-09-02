import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleEventSubscription = Meteor.subscribe('events.single', id);
  const event = Events.findOne(id);
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const googpleMapsReady = GoogleMaps.loaded();
  return {
    event,
    editing: event._id,
    googpleMapsReady,
  };
}, EventPage);
