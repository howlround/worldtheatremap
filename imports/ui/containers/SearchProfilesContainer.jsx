import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import SearchProfiles from '../pages/SearchProfiles.jsx';

const SearchProfilesContainer = createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const countriesSubscribe = Meteor.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');
  const profilesSubscribe = TAPi18n.subscribe('profiles.public');
  return {
    loading: !(localitiesSubscribe.ready() && countriesSubscribe.ready() && administrativeAreasSubscribe.ready() && profilesSubscribe.ready()),
  };
}, SearchProfiles);

export default SearchProfilesContainer;
