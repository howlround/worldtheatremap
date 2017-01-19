import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchShows from '../pages/SearchShows.jsx';

export default createContainer(() => {
  const languagesSubscribe = Meteor.subscribe('languages.public');
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const loading = !(countriesSubscribe.ready() && languagesSubscribe.ready());
  return {
    loading,
  };
}, SearchShows);
