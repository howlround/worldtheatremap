import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileEditPage from '../pages/ProfileEditPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleProfileSubscription = TAPi18n.subscribe('profiles.singleById', id);
  // const todosHandle = Meteor.subscribe('todos.inList', id);
  const profile = Profiles.findOne(id);
  const profileExists = !loading && !!profile;
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const loading = !(singleProfileSubscription.ready() && GoogleMaps.loaded());
  return {
    loading,
    profile,
    editing: profileExists ? profile._id : null,
    shows: [],
  };
}, ProfileEditPage);
