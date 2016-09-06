import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchProfiles from '../pages/SearchProfiles.jsx';

export default createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const countriesSubscribe = Meteor.subscribe('countries.public');
  return {
    loading: !(localitiesSubscribe.ready() && countriesSubscribe.ready()),
  };
}, SearchProfiles);
