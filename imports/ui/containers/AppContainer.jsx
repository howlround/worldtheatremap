import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('profiles.public');
  const privateHandle = Meteor.subscribe('profiles.private');
  return {
    user: Meteor.user(),
    loading: !(publicHandle.ready() && privateHandle.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find({ $or: [
      { userId: { $exists: false } },
      { userId: Meteor.userId() },
    ] }).fetch(),
  };
}, App);
