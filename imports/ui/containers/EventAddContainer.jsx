import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import EventAddPage from '../pages/EventAddPage.jsx';

export default createContainer(() => {
  // @TODO: These should be further in on the autocomplete widget
  // and only subscribing to the query
  const profilesSubscribe = TAPi18n.subscribe('profiles.public');
  const showsSubscribe = Meteor.subscribe('shows.public');
  const add = true;
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  const loading = !(profilesSubscribe.ready() && showsSubscribe.ready() && GoogleMaps.loaded());
  return {
    add,
    loading,
  };
}, EventAddPage);
