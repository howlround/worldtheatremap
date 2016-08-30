import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfilePage from '../pages/ProfilePage.jsx';

export default createContainer(({ params: { id } }) => {
  // const todosHandle = Meteor.subscribe('todos.inList', id);
  const profileSub = Meteor.subscribe('profiles.byId', [id]);
  const loading = !profileSub.ready();
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
