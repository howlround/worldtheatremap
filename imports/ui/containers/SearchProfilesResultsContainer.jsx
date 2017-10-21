import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var'
import { _ } from 'meteor/underscore';
import {
  get,
} from 'lodash';
import escapeRegExp from 'lodash.escaperegexp';
import moment from 'moment';
import { remove as removeDiacritics } from 'diacritics';
import gql from 'graphql-tag';
const util = require('util');

import { Profiles } from '../../api/profiles/profiles.js';
import SearchProfilesResults from '../components/SearchProfilesResults.jsx';

let count = new ReactiveVar(0);

const SearchProfilesResultsContainer = createContainer((props) => {
  const { query, updateQuery, locale } = props;
  let loading = false;
  let skip = 0;
  let results = [];

  if (!_.isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    let privateQuery = {};

    if (query.profileType && query.profileType instanceof Array) {
      privateQuery.profileType = {
        $in: query.profileType
      };
    }

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

    if (query.startDate) {
      privateQuery.endDate = {
        $gte: moment(query.startDate).startOf('day').toDate(),
      };
    }

    if (query.endDate) {
      privateQuery.startDate = {
        $lte: moment(query.endDate).endOf('day').toDate(),
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
      privateQuery.nameSearch = new RegExp(`.*${escapeRegExp(removeDiacritics(query.name)).toUpperCase()}.*`);
      plainTextQuery.name = query.name;
    }

    // Make sure privateQuery is not empty otherwise all records are returned
    if (!_.isEmpty(privateQuery)) {
      // Client query should not have a skip value since there are only 20 in the local db
      // Another pattern would be to keep the skip here but then instead of skip on the server
      // use a limit of (skip + limit). That would load all pages up to the current page
      // for faster rendering of previous pages.
      // Also, since there are only 20 results max no need to add the query here.
      // We are altering the query based on locale so better
      // to keep the complex switch in one place
      const profilesSubscribe = TAPi18n.subscribe('profiles.search', plainTextQuery, skip, locale);
      loading = !profilesSubscribe.ready();
      results = Profiles.find(
        {},
        // privateQuery,
        {
          sort: {
            name: 1,
          },
          limit: 20,
        }).fetch();
    }

    // Make a call to the API for the overall count
    // The query can be passed straight in because the api will handle validation
    if (!_.isEmpty(query)) {
      HTTP.call(
        'POST',
        Meteor.settings.public.WTMDataApi,
        // 'http://localhost:3030/graphql',
        {
          data: {
            query: gql`query ($input: ProfileFiltersInput) {findProfiles(input: $input) { total } }`,
            variables: { input: query }
          },
          headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJ1c2VySWQiOiI1OWM1NzkwYTI3YTc0MDAxMWJjOThmOTkiLCJpYXQiOjE1MDg2MDkzNzMsImV4cCI6MTUwODY5NTc3MywiYXVkIjoiaHR0cHM6Ly9kYXRhLndvcmxkdGhlYXRyZW1hcC5vcmciLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyJ9.7OTKMqZPcOFU8pb9FSuDX8sgOQZn53OPwguXXkwxhyU',
            'Content-Type': 'application/json',
          }
        },
        (error, result) => {
          if (error) {
            console.log(error); // eslint-disable-line no-console
          } else if (result.statusCode === 200) {
            const apiCount = get(result, 'data.data.findProfiles.total');
            count.set(apiCount);
          }
        }
      );
    }
  }

  return {
    count: count.get(),
    results,
    loading,
    skip,
    query,
    updateQuery,
  };
}, SearchProfilesResults);

export default SearchProfilesResultsContainer;
