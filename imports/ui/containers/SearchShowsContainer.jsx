import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchShows from '../pages/SearchShows.jsx';

export default createContainer(() => {
  const showsSubscribe = Meteor.subscribe('shows.public');
  const loading = !showsSubscribe.ready();
  return {
    loading,
  };
}, SearchShows);
