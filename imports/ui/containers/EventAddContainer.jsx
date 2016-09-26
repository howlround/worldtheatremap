import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import EventAddPage from '../pages/EventAddPage.jsx';

export default createContainer(() => {
  const loading = false;
  const add = true;
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });

  return {
    add,
    loading,
  };
}, EventAddPage);
