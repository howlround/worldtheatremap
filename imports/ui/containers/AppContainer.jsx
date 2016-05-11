import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Plays } from '../../api/plays/plays.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const profilesSubscribe = Meteor.subscribe('profiles.public');
  const playsSubscribe = Meteor.subscribe('plays.public');
  return {
    user: Meteor.user(),
    loading: !(profilesSubscribe.ready() && playsSubscribe.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find().fetch(),
    plays: Plays.find().fetch(),
  };
}, App);
