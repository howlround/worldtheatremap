import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileAddPage from '../pages/ProfileAddPage.jsx';

export default createContainer(() => {
  const add = true;
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const googpleMapsReady = GoogleMaps.loaded();
  return {
    add,
    googpleMapsReady,
  };
}, ProfileAddPage);
