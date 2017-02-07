import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import escapeRegExp from 'lodash.escaperegexp';
import { Profiles } from '../../api/profiles/profiles.js';
import SearchProfilesResults from '../components/SearchProfilesResults.jsx';

const SearchProfilesResultsContainer = createContainer((props) => {
  const { query, updateQuery } = props;
  let loading = false;
  let skip = 0;
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    let privateQuery = {};

    if (query.selfDefinedRoles && query.selfDefinedRoles instanceof Array) {
      privateQuery.selfDefinedRoles = {
        $in: query.selfDefinedRoles
      };
    }

    if (query.ethnicityRace && query.ethnicityRace instanceof Array) {
      privateQuery.ethnicityRace = {
        $in: query.ethnicityRace
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
      privateQuery.postalCode = new RegExp(`.*${escapeRegExp(query.postalCode)}.*`, 'i');
      plainTextQuery.postalCode = query.postalCode;
    }

    if (query.name) {
      privateQuery.name = new RegExp(`.*${escapeRegExp(query.name)}.*`, 'i');
      plainTextQuery.name = query.name;
      // privateQuery.name = new RegExp(query.name, 'i');
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      // Client query should not have a skip value since there are only 20 in the local db
      // Another pattern would be to keep the skip here but then instead of skip on the server
      // use a limit of (skip + limit). That would load all pages up to the current page
      // for faster rendering of previous pages.
      const profilesSubscribe = TAPi18n.subscribe('profiles.search', plainTextQuery, skip);
      results = Profiles.find(
        privateQuery,
        {
          sort: {
            name: 1,
          },
          limit: 20,
        }).fetch();
    }
  }

  return {
    results,
    loading,
    skip,
    query,
    updateQuery,
  };
}, SearchProfilesResults);

export default SearchProfilesResultsContainer;
