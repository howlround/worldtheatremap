import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';
// import moment from 'moment';

export default createContainer(() => {
  // @TODO: All of these need to be moved into more
  // granular subscriptions deeper down the chain
  // https://www.discovermeteor.com/blog/query-constructors/
  // Except some version of events for todays events
  const profilesSubscribe = Meteor.subscribe('profiles.public');
  const showsSubscribe = Meteor.subscribe('shows.public');
  // @TODO: Change to events today.
  // const start = moment().format('MMMM+DD+YYYY');
  // const end = moment().format('MMMM+DD+YYYY');
  const eventsWithLocationsSubscribe = Meteor.subscribe('events.withLocations');
  // const participantsSubscribe = Meteor.subscribe('participants.public');
  return {
    user: Meteor.user(),
    loading: !(profilesSubscribe.ready() && showsSubscribe.ready() && eventsWithLocationsSubscribe.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find().fetch(),
    shows: Shows.find().fetch(),
    eventsWithLocations: Events.find({ 'lat': { $ne: null}}, { fields: Events.publicFields }).fetch(),
  };
}, App);
