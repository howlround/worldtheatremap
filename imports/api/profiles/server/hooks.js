import { Meteor } from 'meteor/meteor';
import {
  reduce,
  isEqual,
  pullAll,
  pick,
  each,
  includes,
  isEmpty,
} from 'lodash';
var YAML = require('yamljs');

import { Profiles } from '../profiles.js';

// AWS
var AWS = require('aws-sdk');
var creds = new AWS.Credentials({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});
AWS.config.region = Meteor.settings.AWSRegion;

// Can't use the anonymous function shortcut or this.previous breaks
Profiles.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Meteor.isServer) {
    AWS.config.credentials.get((err) => {
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

      const changedKeys = compareDocuments(doc, this.previous);

      const omitFields = [
        'savedHowlroundPosts',
        'howlroundPostsUrl',
        'howlroundPostSearchText',
        'nameSearch',
      ];
      const releventChangedKeys = pullAll(changedKeys, omitFields);

      const relevenatChanges = pick(doc, releventChangedKeys);
      const relevenatChangesOrig = pick(this.previous, releventChangedKeys);

      // If anything in i18n changed, find out what changed.
      // This is recursive from above, so probably could be a function.
      if (includes(releventChangedKeys, 'i18n')) {
        each(relevenatChanges.i18n, (fields, locale) => {
          const localeChangedKeys = compareDocuments(doc.i18n[locale], this.previous.i18n[locale]);
          const releventlocaleChangedKeys = pullAll(localeChangedKeys, omitFields);

          relevenatChangesOrig.i18n[locale] = pick(relevenatChangesOrig.i18n[locale], releventlocaleChangedKeys);
          relevenatChanges.i18n[locale] = pick(relevenatChanges.i18n[locale], releventlocaleChangedKeys);
        });
      }

      if (!isEmpty(relevenatChanges)) {
        const subject = `${Meteor.users.findOne(userId).emails[0].address} updated ${doc.name}`;
        let message = '';
        message += `Changes:\n${YAML.stringify(relevenatChanges)}\n`;
        message += `Previous:\n${YAML.stringify(relevenatChangesOrig)}`;

        const payload = {
          message,
          subject,
          _id: doc._id,
        }

        const params = {
          Records: [ //required
            {
              Data: Buffer.from(JSON.stringify(payload)), // required
              PartitionKey: 'shardId-000000000000', // required
            },
          ],
          StreamName: 'wtm-notifications-pipeline-WtmChangesStream-1XJYCTSGQ9TK4' // required
        };
        kinesis.putRecords(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          // else     console.log(data);           // successful response
        });
      }
    });
  }
});

const compareDocuments = function(a, b) {
  return reduce(a, function(result, value, key) {
    // return isEqual(value, b[key]) ? result : result.concat(key);
    const comparison = isEqual(value, b[key]) ? result : result.concat(key);
    // console.log(comparison);
    return comparison;
  }, []);
}
