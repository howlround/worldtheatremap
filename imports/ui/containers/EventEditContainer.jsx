import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleEventSubscription = Meteor.subscribe('events.single', id);
  // @TODO: These should be further in on the autocomplete widget
  // and only subscribing to the query
  const profilesSubscribe = Meteor.subscribe('profiles.public');
  const showsSubscribe = Meteor.subscribe('shows.public');
  const event = Events.findOne(id);
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const loading = !(profilesSubscribe.ready() && showsSubscribe.ready() && GoogleMaps.loaded() && singleEventSubscription.ready());
  const eventExists = !loading && !!event;
  return {
    loading,
    event,
    editing: eventExists ? event._id : null,
  };
}, EventPage);
