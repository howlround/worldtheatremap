import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import SearchProfiles from '../pages/SearchProfiles.jsx';

export default createContainer(() => {
  const profilesSubscribe = Meteor.subscribe('profiles.public');

  return {
    loading: !profilesSubscribe.ready(),
    profiles: Profiles.find().fetch(),
  };
}, SearchProfiles);
