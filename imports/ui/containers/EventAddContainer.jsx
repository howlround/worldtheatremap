import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import EventAddPage from '../pages/EventAddPage.jsx';

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
  const loading = !(countriesSubscribe.ready());

  return {
    add,
    loading,
  };
}, EventAddPage);
