import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';
import { check } from 'meteor/check';

// API
import { Profiles, profileSchema } from '../profiles/profiles.js';
import { Variables } from '../variables/variables.js';

let cheerio = require('cheerio');

export const howlroundSearchPosts = new ValidatedMethod({
  name: 'howlround.searchPosts',
  validate({ searchText, _id }) {
    check(searchText, String);
    check(_id, String);
  },
  run({ searchText, _id }) {
    // if (!this.userId) {
    //   throw new Meteor.Error('profiles.howlroundSearchPosts.accessDenied',
    //     'You must be logged in to complete this operation.');
    // }

    if (Meteor.isServer) {
      var result = HTTP.call(
        'GET',
        'http://howlround.com/search',
        {
          params: {
            search_api_views_fulltext: searchText,
          }
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else if (result.statusCode === 200) {
            const posts = [];

            let $ = cheerio.load(result.content, {
                normalizeWhitespace: true,
            });

            // Do not save results if no results were found
            // (HowlRound returns misc results if nothing matches the query)
            // Check if the search box on howlround contains the terms.
            // That's the only clue I could find, the drupal message
            // isn't in the markup for some reason
            if ($('#edit-search-api-views-fulltext').val() === searchText) {
              $('.views-field-title a').each((i, el) => {
                const relativeUrl = $(el).attr('href');
                $(el).attr('href', `http://howlround.com${relativeUrl}`);
                $(el).attr('target', '_blank');
              });
              $('.views-row').slice(0, 3).each((i, el) => {
                posts.push($(el).html());
              });

              Profiles.update(_id, {
                $set: {
                  savedHowlroundPosts: posts,
                  howlroundPostsUrl: `http://howlround.com/search?search_api_views_fulltext=${searchText}`,
                },
              });
            }
          }
        }
      );
    }
  },
});

export const howlroundGetPosts = new ValidatedMethod({
  name: 'howlround.getPosts',
  validate({}) {
  },
  run({}) {
    // if (!this.userId) {
    //   throw new Meteor.Error('profiles.howlroundSearchPosts.accessDenied',
    //     'You must be logged in to complete this operation.');
    // }

    // @TODO: switch to live
    if (Meteor.isServer) {
      var result = HTTP.call(
        'GET',
        'http://howlround.com/posts/json',
        {},
        (error, result) => {
          if (error) {
            console.log(error);
          } else if (result.statusCode === 200) {
            const howlroundPostsJSON = JSON.parse(result.content);
            // Write to something (docs in specialized collection?, doc in generic system collection?)
            Variables.upsert('featuredHowlroundPosts', {
              value: howlroundPostsJSON.posts,
            });
          }
        }
      );
    }
  },
});

// Get profile of all method names on Profiles
const HOWLROUNDS_METHODS = _.pluck([
  howlroundSearchPosts,
  howlroundGetPosts,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 profile operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(HOWLROUNDS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
