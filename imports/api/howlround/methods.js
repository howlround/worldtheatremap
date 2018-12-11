import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';
import { check } from 'meteor/check';
import url from 'url';

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
    this.unblock();

    // if (!this.userId) {
    //   throw new Meteor.Error('profiles.howlroundSearchPosts.accessDenied',
    //     'You must be logged in to complete this operation.');
    // }

    if (Meteor.isServer) {
      var result = HTTP.call(
        'GET',
        Meteor.settings.public.HowlroundPostsURL,
        {
          auth: Meteor.settings.HowlroundAuth,
          params: {
            search_api_fulltext: searchText,
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
            if ($('#edit-search-api-fulltext').val() === searchText) {
              $('.post-header a').each((i, el) => {
                const relativeUrl = $(el).attr('href');
                const newUrl = url.parse(Meteor.settings.public.HowlroundURL);
                newUrl.pathname = relativeUrl;
                $(el).attr('href', url.format(newUrl));
                $(el).attr('target', '_blank');
              });

              $('.post-header img').each((i, el) => {
                const relativeSrc = url.parse($(el).attr('src'));
                const newSrc = url.parse(Meteor.settings.public.HowlroundURL);
                newSrc.pathname = relativeSrc.pathname;
                newSrc.search = relativeSrc.search;
                newSrc.query = relativeSrc.query;
                $(el).attr('src', url.format(newSrc));
              });

              $('.views-row').slice(0, 3).each((i, el) => {
                posts.push($(el).html());
              });

              const postsUrl = url.parse(Meteor.settings.public.HowlroundPostsSeeAllURL);
              postsUrl.query = {
                keys: searchText,
              };

              Profiles.update(_id, {
                $set: {
                  savedHowlroundPosts: posts,
                  howlroundPostsUrl: url.format(postsUrl),
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
    this.unblock();
    // if (!this.userId) {
    //   throw new Meteor.Error('profiles.howlroundSearchPosts.accessDenied',
    //     'You must be logged in to complete this operation.');
    // }

    // @TODO: switch to live
    if (Meteor.isServer) {
      var result = HTTP.call(
        'GET',
        Meteor.settings.public.HomepagePostsURL,
        {
          auth: Meteor.settings.HowlroundAuth,
        },
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
