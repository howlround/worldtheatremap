import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/profiles.js';
import SearchProfilesResults from '../components/SearchProfilesResults.jsx';

const SearchProfilesResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    let privateQuery = {};

    if (query.name) {
      privateQuery.name = query.name;
      // privateQuery.name = new RegExp(query.name, 'i');
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

    if (query.administrativeArea && query.administrativeArea instanceof Array) {
      privateQuery.administrativeArea = {
        $in: query.administrativeArea
      };
    }

    if (query.country && query.country instanceof Array) {
      privateQuery.country = {
        $in: query.country
      };
    }

    if (query.postalCode) {
      privateQuery.postalCode = new RegExp('^' + query.postalCode, 'i');
    }

    if (query.gender && query.gender instanceof Array) {
      privateQuery.gender = {
        $in: query.gender
      };
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      results = Profiles.find(
        privateQuery,
        {
          sort: {
            name: 1 ,
          },
          limit: 20,
        }).fetch();
    }
  }

  return {
    results: results,
    loading: loading,
  };
}, SearchProfilesResults);

export default SearchProfilesResultsContainer;
