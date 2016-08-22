import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfilePage from '../pages/ProfilePage.jsx';

export default createContainer(({ params: { id } }) => {
  // const todosHandle = Meteor.subscribe('todos.inList', id);
  // const loading = !todosHandle.ready();
  const profile = Profiles.findOne(id);
  // const profileExists = !loading && !!profile;
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const googpleMapsReady = GoogleMaps.loaded();
  return {
    // loading,
    profile,
    editing: profile._id,
    shows: [],
    googpleMapsReady,
  };
}, ProfilePage);
