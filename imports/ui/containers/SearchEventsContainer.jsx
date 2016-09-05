import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchEvents from '../pages/SearchEvents.jsx';

export default createContainer(() => {
  const localitiesSubscribe = Meteor.subscribe('localities.public');
  return {
    loading: !localitiesSubscribe.ready(),
  };
}, SearchEvents);
