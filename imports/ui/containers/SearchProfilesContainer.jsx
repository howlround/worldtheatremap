import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import SearchProfiles from '../pages/SearchProfiles.jsx';

const SearchProfilesContainer = createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');
  const rolesSubscribe = TAPi18n.subscribe('roles.public');
  const orgTypesSubscribe = TAPi18n.subscribe('orgTypes.public');
  const gendersSubscribe = TAPi18n.subscribe('genders.public');
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');

  return {
    loading: false,
    localitiesReady: localitiesSubscribe.ready(),
    interestsReady: interestsSubscribe.ready(),
    rolesReady: rolesSubscribe.ready(),
    orgTypesReady: orgTypesSubscribe.ready(),
    gendersReady: gendersSubscribe.ready(),
    countriesReady: countriesSubscribe.ready(),
    administrativeAreasReady: administrativeAreasSubscribe.ready(),
  };
}, SearchProfiles);

export default SearchProfilesContainer;
