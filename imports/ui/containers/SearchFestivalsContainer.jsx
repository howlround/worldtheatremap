import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import SearchFestivals from '../pages/SearchFestivals.jsx';

const SearchFestivalsContainer = createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const administrativeAreasSubscribe = Meteor.subscribe('administrativeAreas.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');

  return {
    loading: !(
      localitiesSubscribe.ready() &&
      countriesSubscribe.ready() &&
      interestsSubscribe.ready() &&
      administrativeAreasSubscribe.ready()
    ),
  };
}, SearchFestivals);

export default SearchFestivalsContainer;
