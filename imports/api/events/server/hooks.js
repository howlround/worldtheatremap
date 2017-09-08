import { Meteor } from 'meteor/meteor';
import {
  each,
  forOwn,
  includes,
  isEmpty,
  isEqual,
  isNull,
  pick,
  pullAll,
  reduce,
} from 'lodash';
import YAML from 'yamljs';

// AWS
import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});
AWS.config.region = Meteor.settings.AWSRegion;

// API
import { Events } from '../events.js';

// Insert
Events.after.insert(function(userId, doc) {
  if (Meteor.isServer && Meteor.settings.SendContentNotifications) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.');
        console.error(err);
        return;
      }
      // create kinesis service object
      const kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02'
      });

      const omitFields = [
        'nameSearch',
      ];
      const relevenatChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          relevenatChanges[key] = value;
        }
      });

      if (!isEmpty(relevenatChanges)) {
        const Subject = `An event for "${doc.show.name}" has been created by ${Meteor.users.findOne(userId).emails[0].address}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });
        TextBody += `Event: ${baseUrl}events/${doc._id}\n\n`;
        TextBody += YAML.stringify(relevenatChanges);

        const payload = {
          TextBody,
          Subject,
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

// Update
Events.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Meteor.isServer && Meteor.settings.SendContentNotifications) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.');
        console.error(err);
        return;
      }
      // create kinesis service object
      const kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02'
      });

      // Refactor this to use fieldNames also
      const changedKeys = compareDocuments(doc, this.previous);

      const omitFields = [
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
        const Subject = `An event for "${doc.show.name}" has been updated by ${Meteor.users.findOne(userId).emails[0].address}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });
        TextBody += `Event: ${baseUrl}events/${doc._id}\n\n`;
        TextBody += `These are the new changes to the page:\n${YAML.stringify(relevenatChanges)}\n`;
        TextBody += `This was the previous version:\n${YAML.stringify(relevenatChangesOrig)}`;

        const payload = {
          TextBody,
          Subject,
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

// Remove
Events.after.remove(function(userId, doc) {
  if (Meteor.isServer && Meteor.settings.SendContentNotifications) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.');
        console.error(err);
        return;
      }
      // create kinesis service object
      const kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02'
      });

      const omitFields = [
        'nameSearch',
      ];
      const relevenatChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          relevenatChanges[key] = value;
        }
      });

      if (!isEmpty(relevenatChanges)) {
        const Subject = `An event for "${doc.show.name}" has been deleted by ${Meteor.users.findOne(userId).emails[0].address}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });
        TextBody += `Event: ${baseUrl}events/${doc._id}\n\n`;
        TextBody += YAML.stringify(relevenatChanges);

        const payload = {
          TextBody,
          Subject,
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
        kinesis.putRecords(params, function(kinesisErr, data) {
          if (kinesisErr) console.log(kinesisErr, kinesisErr.stack); // an error occurred
          // else     console.log(data);           // successful response
        });
      }
    });
  }
});

const compareDocuments = (a, b) => {
  return reduce(a, (result, value, key) => {
    // return isEqual(value, b[key]) ? result : result.concat(key);
    const comparison = isEqual(value, b[key]) ? result : result.concat(key);
    // console.log(comparison);
    return comparison;
  }, []);
};
