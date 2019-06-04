import gql from 'graphql-tag';
import { clone, get, isEmpty } from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

// Components
import ContentCounts from '../components/ContentCounts.jsx';

// API
// import { Counts } from '../../api/counts/counts.js';

const countAllProfiles = new ReactiveVar(0);
const countOrganizations = new ReactiveVar(0);
const countShows = new ReactiveVar(0);
const countFestivals = new ReactiveVar(0);

const ContentCountsContainer = createContainer(() => {
  const counts = {};
  // countsSub
  // Meteor.subscribe('counts.collections');
  // const counts = Counts.find().fetch();

  // countAllProfiles
  const queryForGQLTheatremakers = {};
  HTTP.call(
    'POST',
    Meteor.settings.public.WTMDataApi,
    {
      data: {
        query: gql`query ($input: ProfileFiltersInput) {
          findProfiles(input: $input) {
            total
          }
        }`,
        variables: { input: queryForGQLTheatremakers },
      },
      headers: {
        Authorization: Meteor.settings.public.WTMDataApiAuth,
        'Content-Type': 'application/json',
      },
    },
    (error, result) => {
      // console.log('getting result or error');
      if (error) {
        console.log(error); // eslint-disable-line no-console
      } else if (result.statusCode === 200) {
        const countTheatremakersCount = get(result, 'data.data.findProfiles.total');
        // @TODO: Instead of passing count, why not pass the whole summary?
        //        Do any components need count instead of summary?
        countAllProfiles.set(countTheatremakersCount);
      }
    }
  );

  // countOrganizations
  const queryForGQLOrgs = {
    profileType: 'Organization',
  };
  HTTP.call(
    'POST',
    Meteor.settings.public.WTMDataApi,
    {
      data: {
        query: gql`query ($input: ProfileFiltersInput) {
          findProfiles(input: $input) {
            total
          }
        }`,
        variables: { input: queryForGQLOrgs },
      },
      headers: {
        Authorization: Meteor.settings.public.WTMDataApiAuth,
        'Content-Type': 'application/json',
      },
    },
    (error, result) => {
      // console.log('getting result or error');
      if (error) {
        console.log(error); // eslint-disable-line no-console
      } else if (result.statusCode === 200) {
        const countOrganizationsCount = get(result, 'data.data.findProfiles.total');
        // @TODO: Instead of passing count, why not pass the whole summary?
        //        Do any components need count instead of summary?
        countOrganizations.set(countOrganizationsCount);
      }
    }
  );

  // countFestivals
  const queryForGQLFestivals = {
    profileType: 'Festival',
  };
  HTTP.call(
    'POST',
    Meteor.settings.public.WTMDataApi,
    {
      data: {
        query: gql`query ($input: ProfileFiltersInput) {
          findProfiles(input: $input) {
            total
          }
        }`,
        variables: { input: queryForGQLFestivals },
      },
      headers: {
        Authorization: Meteor.settings.public.WTMDataApiAuth,
        'Content-Type': 'application/json',
      },
    },
    (error, result) => {
      // console.log('getting result or error');
      if (error) {
        console.log(error); // eslint-disable-line no-console
      } else if (result.statusCode === 200) {
        const countFestivalsCount = get(result, 'data.data.findProfiles.total');
        // @TODO: Instead of passing count, why not pass the whole summary?
        //        Do any components need count instead of summary?
        countFestivals.set(countFestivalsCount);
      }
    }
  );

  // countShows
  const queryForGQLShows = {};
  HTTP.call(
    'POST',
    Meteor.settings.public.WTMDataApi,
    {
      data: {
        query: gql`query ($input: ShowFiltersInput) {
          findShows(input: $input) {
            total
          }
        }`,
        variables: { input: queryForGQLShows },
      },
      headers: {
        Authorization: Meteor.settings.public.WTMDataApiAuth,
        'Content-Type': 'application/json',
      },
    },
    (error, result) => {
      // console.log('getting result or error');
      if (error) {
        console.log(error); // eslint-disable-line no-console
      } else if (result.statusCode === 200) {
        const countShowsCount = get(result, 'data.data.findShows.total');
        // @TODO: Instead of passing count, why not pass the whole summary?
        //        Do any components need count instead of summary?
        countShows.set(countShowsCount);
      }
    }
  );

  return {
    counts: [
      {
        _id: 'People',
        count: countAllProfiles.get() - countOrganizations.get() - countFestivals.get(),
      },
      {
        _id: 'Organizations',
        count: countOrganizations.get(),
      },
      {
        _id: 'Shows',
        count: countShows.get(),
      },
      {
        _id: 'Festivals',
        count: countFestivals.get(),
      },
    ]
  };
}, ContentCounts);

export default ContentCountsContainer;
