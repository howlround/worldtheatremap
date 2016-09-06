import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/profiles.js';
import SearchProfilesResults from '../components/SearchProfilesResults.jsx';

export default SearchProfilesResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let results = [];

  if (!_.isEmpty(query)) {

    if (query.name) {
      query.name = new RegExp(query.name, 'i');
    }

    if (query.selfDefinedRoles && query.selfDefinedRoles instanceof Array) {
      query.selfDefinedRoles = {
        $in: query.selfDefinedRoles
      };
    }

    if (query.interests && query.interests instanceof Array) {
      query.interests = {
        $in: query.interests
      };
    }

    if (query.orgTypes && query.orgTypes instanceof Array) {
      query.orgTypes = {
        $in: query.orgTypes
      };
    }

    if (query.locality && query.locality instanceof Array) {
      query.locality = {
        $in: query.locality
      };
    }

    const profilesSubscribe = Meteor.subscribe('profiles.search', query);
    loading = !profilesSubscribe.ready();
    results = Profiles.find(query, { sort: { name: 1 } }).fetch();
  }

  return {
    results: results,
    loading: loading,
  };
}, SearchProfilesResults);
