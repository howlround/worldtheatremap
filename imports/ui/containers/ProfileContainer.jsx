import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfilePage from '../pages/ProfilePage.jsx';

export default createContainer(({ params: { id } }) => {
  const profileSub = Meteor.subscribe('profiles.byId', [id]);
  const connectedProfilesSub = Meteor.subscribe('shows.byAuthor', id);
  // @TODO: This should be more specific (by user?)
  const participantsSubscribe = Meteor.subscribe('participants.public');
  const connectionsSubscribe = Meteor.subscribe('relatedRecords.byProfile', id);
  const loading = !(profileSub.ready() && connectedProfilesSub.ready() && participantsSubscribe.ready() && connectionsSubscribe.ready());
  const profile = Profiles.findOne(id);
  const shows = profile ? profile.getShows().fetch() : null;
  const roles = profile ? profile.getRoles() : null;
  const connections = profile ? profile.getConnections() : null;
  const profileExists = !loading && !!profile;

  return {
    loading,
    profile,
    profileExists,
    shows,
    roles,
    connections,
  };
}, ProfilePage);
