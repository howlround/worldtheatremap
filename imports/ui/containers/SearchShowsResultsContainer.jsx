import escapeRegExp from 'lodash.escaperegexp';
import gql from 'graphql-tag';
import hash from 'string-hash';
import moment from 'moment';
import qs from 'qs';
import React from 'react';
import sanitizeHtml from 'sanitize-html'
import formatForSearch from '../../helpers/formatForSearch.js';
import {
  clone,
  compact,
  each,
  get,
  isEmpty,
  map,
  size,
} from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import { IntlProvider, injectIntl } from 'react-intl';
import { Meteor } from 'meteor/meteor';
// import { ReactiveVar } from 'meteor/reactive-var';
import { renderToStaticMarkup as markup } from 'react-dom/server';
import { TAPi18n } from 'meteor/tap:i18n';

// API
import { upsert } from '../../api/searchShare/methods.js';

import SearchShowsResultsSummary from '../components/SearchShowsResultsSummary.jsx';
import SearchShowsResults from '../components/SearchShowsResults.jsx';
import { Events } from '../../api/events/events.js';
import { Shows } from '../../api/shows/shows.js';

const getEventsFromShows = ({ showResults, privateEventQuery }) => {
  const results = map(showResults, show => {
    let output = null;
    const eventsByShowQuery = { 'show._id': show._id };
    const events = Events.find(
      eventsByShowQuery,
      {
        sort: {
          startDate: 1,
        },
      }).fetch();

    // Reformat results to be results { show: {}, events: []}
    // If events filters are used only return show if there are events
    if (!isEmpty(events)) {
      output = {
        show,
        events,
      };
    // if there is no events query return show only
    // size(privateEventQuery) === 1 is the check
    // because we add the showResultIds to the query above
    } else if (isEmpty(events) && size(privateEventQuery) === 1) {
      output = {
        show,
      };
    }

    return output;
  });

  return results;
};

const count = new ReactiveVar(0);

const SearchShowsResultsContainer = createContainer((props) => {
  const { query, updateQuery, locale } = props;
  let loading = false;
  let skip = 0;
  let showResults = [];
  const showResultIds = [];
  let results = [];
  let shareImageFilename = '';

  if (!isEmpty(query)) {
    // Use an internal query so nothing strange gets passed straight through
    const privateShowQuery = {};
    const privateEventQuery = {};

    if (query.interests && query.interests instanceof Array) {
      privateShowQuery.interests = {
        $in: query.interests,
      };
    }

    if (query.country && query.country instanceof Array) {
      privateShowQuery.country = {
        $in: query.country,
      };
    }

    if (query.languages && query.languages instanceof Array) {
      privateShowQuery.languages = {
        $in: query.languages,
      };
    }

    if (query.page) {
      skip = Number(query.page) * 20;
    }

    // The publication can't accept regex values as the argument so make a seperate query to pass
    const plainTextQuery = clone(privateShowQuery);

    if (query.name) {
      const nameRegex = formatForSearch(query.name);
      privateShowQuery.nameSearch = new RegExp(`.*${nameRegex}.*`);
      plainTextQuery.name = query.name;
    }

    // Make sure privateShowQuery is not empty otherwise all records are returned
    if (!isEmpty(privateShowQuery)) {
      const showsSubscribe = TAPi18n.subscribe('shows.search', plainTextQuery, skip);
      loading = !showsSubscribe.ready();
      showResults = Shows.find(
        {},
        {
          sort: {
            name: 1,
          },
          // limit: 20,
          limit: 1000,
        }
      ).fetch();

      const profiles = [];
      each(showResults, show => {
        showResultIds.push(show._id);
        each(show.author, author => profiles.push(author._id));
      });
      // profilesSubscribe
      TAPi18n.subscribe('profiles.byId', profiles);
    }

    // Process Event query items
    if (query.eventType) {
      privateEventQuery.eventType = query.eventType;
    }

    if (query.eventsCountry && query.eventsCountry instanceof Array) {
      privateEventQuery.country = {
        $in: query.eventsCountry,
      };
    }

    if (query.locality && query.locality instanceof Array) {
      privateEventQuery.locality = {
        $in: query.locality,
      };
    }

    if (query.administrativeArea && query.administrativeArea instanceof Array) {
      privateEventQuery.administrativeArea = {
        $in: query.administrativeArea,
      };
    }

    if (query.startDate) {
      privateEventQuery.endDate = {
        $gte: moment(query.startDate).startOf('day').toDate(),
      };
    }

    if (query.endDate) {
      privateEventQuery.startDate = {
        $lte: moment(query.endDate).endOf('day').toDate(),
      };
    }

    // // If there are show results, check for events and return whatever we find.
    // // Otherwise check for event filters then load parent shows
    if (!isEmpty(showResults)) {
      // Load all the events for these shows
      privateEventQuery['show._id'] = { $in: showResultIds };
      // eventsSubscribe
      Meteor.subscribe('events.search', privateEventQuery, 0);

      results = getEventsFromShows({ showResults, privateEventQuery });
    } else if (!isEmpty(privateEventQuery) && isEmpty(privateShowQuery)) {
      // Otherwise check for event filters then load parent shows
      // But ONLY if there are no show filters. Otherwise this would cause
      // bad recursion. If privateShowQuery is not empty then something should have
      // been found above.
      // eventsSubscribe
      Meteor.subscribe('events.search', privateEventQuery, skip);

      const eventResults = Events.find(
        privateEventQuery,
        {
          sort: {
            startDate: 1,
          },
        }).fetch();

      // Get author and show ids for these events
      const resultsAuthors = [];
      const resultShowIds = [];
      const parentShowResults = [];
      each(eventResults, (event) => {
        parentShowResults.push(event.show);
        resultShowIds.push(event.show._id);
        resultsAuthors.push(event.organizations._id);
        each(event.show.author, (author) => resultsAuthors.push(author._id));
      });

      // resultsAuthorsSubscribe
      TAPi18n.subscribe('profiles.byId', resultsAuthors);
      // resultsShowsSubscribe
      TAPi18n.subscribe('shows.multipleById', resultShowIds);
      // privateEventQuery['show._id'] = { $in: resultShowIds }; // ??

      results = getEventsFromShows({
        showResults: parentShowResults,
        privateEventQuery,
      });
    }

    // Clean out null values in results
    // (from map if none of the return values are met)
    results = compact(results);

    // Generate the filename from privateQuery so pager is not included
    // Put the show and event queries together
    const privateQueryString = `${qs.stringify(privateShowQuery)}${qs.stringify(privateEventQuery)}`; // eslint-disable-line max-len
    // Include the locale to keep the images seperate
    // and the type otherwise hash will match other types
    // using the name query fields (like date)
    shareImageFilename = hash(`${locale}shows${privateQueryString}`).toString();

    // Make a call to the API for the overall count
    // The query can be passed straight in because the api will handle validation
    // @TODO: API has to be refactored to handle queries for events using show data
    // (e.g. number of events for shows in portuguese)
    if (!isEmpty(query)) {
      const queryForGQL = clone(query);
      // Date fields have different names
      queryForGQL.startsBefore = query.endDate;
      queryForGQL.endsAfter = query.startDate;
      delete queryForGQL.endDate;
      delete queryForGQL.startDate;
      // page field is not valid on the API
      delete queryForGQL.page;

      HTTP.call(
        'POST',
        Meteor.settings.public.WTMDataApi,
        {
          data: {
            query: gql`query ($input: CountEventsFiltersInput) {
              countEvents(input: $input) {
                total
              }
            }`,
            variables: { input: queryForGQL },
          },
          headers: {
            Authorization: Meteor.settings.public.WTMDataApiAuth,
            'Content-Type': 'application/json',
          },
        },
        (error, result) => {
          if (error) {
            console.log(error); // eslint-disable-line no-console
          } else if (result.statusCode === 200) {
            const apiCount = get(result, 'data.data.countEvents.total');
            // @TODO: Instead of passing count, why not pass the whole summary?
            //        Do any components need count instead of summary?
            count.set(apiCount);

            // Trigger the image creation here. That way we know it's ready with the new number.
            const summaryReact = (
              <IntlProvider locale={props.intl.locale} messages={props.intl.messages}>
                <SearchShowsResultsSummary
                  query={query}
                  count={apiCount}
                />
              </IntlProvider>
            );

            const summary = sanitizeHtml(markup(summaryReact), { allowedTags: [] });

            upsert.call({
              shareImageFilename,
              count: apiCount,
              summary,
              locale,
            });
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
    shareImageFilename,
  };
}, SearchShowsResults);

export default injectIntl(SearchShowsResultsContainer);
