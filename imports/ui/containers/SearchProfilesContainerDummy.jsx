import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import SearchProfiles from '../pages/SearchProfiles.jsx';

const SearchProfilesContainerDummy = createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const countriesSubscribe = Meteor.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');
  const loading = !(localitiesSubscribe.ready() && countriesSubscribe.ready() && administrativeAreasSubscribe.ready());
  return {
    loading,
    dummyForm: true,
  };
}, SearchProfiles);

export default SearchProfilesContainerDummy;
