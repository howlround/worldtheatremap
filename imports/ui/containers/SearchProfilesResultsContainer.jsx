import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/profiles.js';
import SearchProfilesResults from '../components/SearchProfilesResults.jsx';

const SearchProfilesResultsContainer = createContainer((props) => {
  const { query } = props;
  let loading = false;
  let skip = 0;
  let results = [];
  let totalCount = 0;

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    let privateQuery = {};

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
      privateQuery.postalCode = query.postalCode;
    }

    if (query.gender && query.gender instanceof Array) {
      privateQuery.gender = {
        $in: query.gender
      };
    }

    if (query.page) {
      skip = Number(query.page) * 20;
    }

    // The publication can't accept regex values as the argument so make a seperate query to pass
    const plainTextQuery = _.clone(privateQuery);

    if (query.postalCode) {
      privateQuery.postalCode = new RegExp(`^${query.postalCode}.*`, 'i');
      plainTextQuery.postalCode = query.postalCode;
    }

    if (query.name) {
      privateQuery.name = new RegExp(`^${query.name}.*`, 'i');
      plainTextQuery.name = query.name;
      // privateQuery.name = new RegExp(query.name, 'i');
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      const profilesSubscribe = TAPi18n.subscribe('profiles.search', plainTextQuery, skip);
      totalCount = Profiles.find(privateQuery).count();
      results = Profiles.find(
        privateQuery,
        {
          sort: {
            name: 1,
          },
          limit: 20,
          skip,
        }).fetch();
    }
  }

  return {
    results,
    loading,
    skip,
    totalCount,
    query,
  };
}, SearchProfilesResults);

export default SearchProfilesResultsContainer;
