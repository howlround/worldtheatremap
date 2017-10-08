import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileEditPage from '../pages/ProfileEditPage.jsx';

export default createContainer(({ params: { id, locale } }) => {
  const googleParams = {
    key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM',
    libraries: 'places',
  }
  if (locale) {
    googleParams.language = locale;
  }

  const singleProfileSubscription = TAPi18n.subscribe('profiles.singleById', id);
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');
  const profile = Profiles.findOne(id);
  const profileExists = !loading && !!profile;
  GoogleMaps.load(googleParams);
  const loading = !(singleProfileSubscription.ready() && countriesSubscribe.ready() && interestsSubscribe.ready() && GoogleMaps.loaded());
  return {
    loading,
    profile,
    editing: profileExists ? profile._id : null,
    shows: [],
  };
}, ProfileEditPage);
