import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import EventAddPage from '../pages/EventAddPage.jsx';

export default createContainer(() => {
  // @TODO: These should be further in on the autocomplete widget
  // and only subscribing to the query??
  // Subscribe to all profiles but don't wait for them to load the next page. Hope that it loads before someone tries to use it.
  const profilesSubscribe = TAPi18n.subscribe('profiles.autocomplete');
  const loading = false;
  // We are subscribing to shows in the RelatedShowTextBoxContainer
  // const showsSubscribe = Meteor.subscribe('shows.autocomplete');
  const add = true;
  GoogleMaps.load({ key: 'AIzaSyCJleIzga_bAKO6Gwkzz2rlxnQ7T_f2xGM', libraries: 'places' });
  // const loading = !(profilesSubscribe.ready());
  // Don't wait for google maps:
  // const loading = !(profilesSubscribe.ready() && showsSubscribe.ready());
  // OR: Wait for google maps to load
  // const loading = !(profilesSubscribe.ready() && showsSubscribe.ready() && GoogleMaps.loaded());
  return {
    add,
    loading,
  };
}, EventAddPage);
