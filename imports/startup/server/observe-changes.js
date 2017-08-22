import { Meteor } from 'meteor/meteor';
import {
  reduce,
  isEqual,
  pullAll,
  pick,
  each,
  includes,
} from 'lodash';
var YAML = require('yamljs');

import { Profiles } from '../../api/profiles/profiles.js';

// AWS
var AWS = require('aws-sdk');
var creds = new AWS.Credentials({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});
AWS.config.region = Meteor.settings.AWSRegion;

let initializing = true;

const observeChangesHandle = Profiles.find({}).observeChanges({
  added: function() {
    // if (!initializing) {

    // }
  },
  removed: function() {
    // self.changed('Counts', 'Theatremakers', { count: countTheatremakers });
  },
  changed: function(id, fields) {
    // console.log(self);
    // @TODO: Ignore howlroundPostsUrl
    // console.log('observeChanges');
    // console.log(id);
    // console.log(fields);
  },
});

const observeHandle = Profiles.find({}).observe({
  added: function(newDocument) {
    // if (!initializing) {

    // }
  },
  removed: function(oldDocument) {
    // self.changed('Counts', 'Theatremakers', { count: countTheatremakers });
  },
  changed: function(newDocument, oldDocument) {
    AWS.config.credentials.get(function(err) {
      // attach event listener
      if (err) {
          console.error('Error retrieving AWS credentials.');
          console.error(err);
          return;
      }
      // create kinesis service object
      var kinesis = new AWS.Kinesis({
          apiVersion: '2013-12-02'
      });

      const changedKeys = compareDocuments(newDocument, oldDocument);

      const omitFields = [
        'savedHowlroundPosts',
        'howlroundPostsUrl',
        'howlroundPostSearchText',
        'nameSearch',
      ];
      const releventChangedKeys = pullAll(changedKeys, omitFields);

      const relevenatChanges = pick(newDocument, releventChangedKeys);
      const relevenatChangesOrig = pick(oldDocument, releventChangedKeys);

      // If anything in i18n changed, find out what changed.
      // This is recursive from above, so probably could be a function.
      if (includes(releventChangedKeys, 'i18n')) {
        each(relevenatChanges.i18n, (fields, locale) => {
          const localeChangedKeys = compareDocuments(newDocument.i18n[locale], oldDocument.i18n[locale]);
          const releventlocaleChangedKeys = pullAll(localeChangedKeys, omitFields);

          relevenatChangesOrig.i18n[locale] = pick(relevenatChangesOrig.i18n[locale], releventlocaleChangedKeys);
          relevenatChanges.i18n[locale] = pick(relevenatChanges.i18n[locale], releventlocaleChangedKeys);
        });
      }

      console.log('relevenatChangesOrig');
      console.log(relevenatChangesOrig);
      console.log('relevenatChanges');
      console.log(relevenatChanges);

      let payload = `xxx updated ${newDocument.name}:\n\n`;
      payload += `Changes:\n${YAML.stringify(relevenatChanges)}\n`;
      payload += `Previous:\n${YAML.stringify(relevenatChangesOrig)}`;

      const params = {
        Records: [ /* required */
          {
            Data: payload, /* required */
            PartitionKey: 'shardId-000000000000', /* required */
          },
        ],
        StreamName: 'wtm-notifications-pipeline-WtmChangesStream-1XJYCTSGQ9TK4' /* required */
      };
      kinesis.putRecords(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

      // console.log(newDocument);
      // console.log(oldDocument);
    });
  },
});

initializing = false;

const compareDocuments = function(a, b) {
  return reduce(a, function(result, value, key) {
    // return isEqual(value, b[key]) ? result : result.concat(key);
    const comparison = isEqual(value, b[key]) ? result : result.concat(key);
    // console.log(comparison);
    return comparison;
  }, []);
}
