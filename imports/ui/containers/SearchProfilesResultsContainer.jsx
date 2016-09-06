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
    // Use an internal query so nothing strange gets passed straight through
    let privateQuery = {};

    if (query.name) {
      privateQuery.name = new RegExp(query.name, 'i');
    }

    if (query.selfDefinedRoles && query.selfDefinedRoles instanceof Array) {
      privateQuery.selfDefinedRoles = {
        $in: query.selfDefinedRoles
      };
    }

    if (query.interests && query.interests instanceof Array) {
      privateQuery.interests = {
        $in: query.interests
      };
    }

    if (query.orgTypes && query.orgTypes instanceof Array) {
      privateQuery.orgTypes = {
        $in: query.orgTypes
      };
    }

    if (query.locality && query.locality instanceof Array) {
      privateQuery.locality = {
        $in: query.locality
      };
    }

    if (query.gender && query.gender instanceof Array) {
      privateQuery.gender = {
        $in: query.gender
      };
    }

    const profilesSubscribe = Meteor.subscribe('profiles.search', privateQuery);
    loading = !profilesSubscribe.ready();
    results = Profiles.find(privateQuery, { sort: { name: 1 } }).fetch();
  }

  return {
    results: results,
    loading: loading,
  };
}, SearchProfilesResults);
