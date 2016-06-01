import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Plays } from '../../api/plays/plays.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  // @TODO: All of these need to be moved into more
  // granular subscriptions deeper down the chain
  // https://www.discovermeteor.com/blog/query-constructors/
  // Except some version of events for todays events
  const profilesSubscribe = Meteor.subscribe('profiles.public');
  const playsSubscribe = Meteor.subscribe('plays.public');
  const eventsSubscribe = Meteor.subscribe('events.public');
  // const participantsSubscribe = Meteor.subscribe('participants.public');
  return {
    user: Meteor.user(),
    loading: !(profilesSubscribe.ready() && playsSubscribe.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find().fetch(),
    plays: Plays.find().fetch(),
  };
}, App);
