import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchShows from '../pages/SearchShows.jsx';

export default createContainer(() => {
  const languagesSubscribe = Meteor.subscribe('languages.public');
  const loading = false;
  return {
    loading: !(languagesSubscribe.ready()),
  };
}, SearchShows);
