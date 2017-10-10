import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileEditPage from '../pages/ProfileEditPage.jsx';

export default createContainer(({ params: { id, locale } }) => {
  const googleParams = {
    key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM',
    libraries: 'places',
  };

  if (locale) {
    googleParams.language = locale;
  }

  const singleProfileSubscription = TAPi18n.subscribe('profiles.singleById', id);
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');
  const rolesSubscribe = TAPi18n.subscribe('roles.public');
  const orgTypesSubscribe = TAPi18n.subscribe('orgTypes.public');

  GoogleMaps.load(googleParams); // eslint-disable-line no-undef
  const loading = !(
    singleProfileSubscription.ready() &&
    countriesSubscribe.ready() &&
    interestsSubscribe.ready() &&
    rolesSubscribe.ready() &&
    orgTypesSubscribe.ready() &&
    GoogleMaps.loaded() // eslint-disable-line no-undef
  );

  const profile = Profiles.findOne(id);
  const profileExists = !loading && !!profile;

  return {
    loading,
    profile,
    editing: profileExists ? profile._id : null,
    shows: [],
  };
}, ProfileEditPage);
