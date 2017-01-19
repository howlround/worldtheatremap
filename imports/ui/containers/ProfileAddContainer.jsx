import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileAddPage from '../pages/ProfileAddPage.jsx';

export default createContainer(({ params: { locale } }) => {
  const googleParams = {
    key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM',
    libraries: 'places',
  }
  if (locale) {
    googleParams.language = locale;
  }

  const add = true;
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  GoogleMaps.load(googleParams);
  const googleMapsReady = GoogleMaps.loaded();
  const loading = !(countriesSubscribe.ready() && GoogleMaps.loaded());
  return {
    add,
    loading,
    googleMapsReady,
  };
}, ProfileAddPage);
