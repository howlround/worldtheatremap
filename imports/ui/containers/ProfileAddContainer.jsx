import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileAddPage from '../pages/ProfileAddPage.jsx';

export default createContainer(({ params: { locale } }) => {
  const googleParams = {
    key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM',
    libraries: 'places',
  };

  if (locale) {
    googleParams.language = locale;
  }

  const add = true;
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');
  const rolesSubscribe = TAPi18n.subscribe('roles.public');

  GoogleMaps.load(googleParams); // eslint-disable-line no-undef
  const googleMapsReady = GoogleMaps.loaded(); // eslint-disable-line no-undef
  const loading = !(
    countriesSubscribe.ready() &&
    interestsSubscribe.ready() &&
    rolesSubscribe.ready() &&
    GoogleMaps.loaded() // eslint-disable-line no-undef
  );
  return {
    add,
    loading,
    googleMapsReady,
  };
}, ProfileAddPage);
