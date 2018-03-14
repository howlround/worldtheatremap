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

// API
import { Events } from '../events.js';

// AWS
import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});
AWS.config.region = Meteor.settings.AWSRegion;

const compareDocuments = (a, b) => (
  reduce(a, (result, value, key) => {
    // return isEqual(value, b[key]) ? result : result.concat(key);
    const comparison = isEqual(value, b[key]) ? result : result.concat(key);
    // console.log(comparison);
    return comparison;
  }, [])
);

// Insert
Events.after.insert((userId, doc) => {
  if (Meteor.isServer && Meteor.settings.SendContentNotifications) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.'); // eslint-disable-line no-console
        console.error(err); // eslint-disable-line no-console
        return;
      }
      // create kinesis service object
      const kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02',
      });

      const omitFields = [
        'nameSearch',
      ];
      const relevantChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          relevantChanges[key] = value;
        }
      });

      if (!isEmpty(relevantChanges)) {
        const userEmail = Meteor.users.findOne(userId).profile.email;
        const Subject = `An event for "${doc.show.name}" has been created by ${userEmail}`;
        // let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });
        TextBody += `Event: ${baseUrl}events/${doc._id}\n\n`;
        TextBody += YAML.stringify(relevantChanges);

        const payload = {
          TextBody,
          Subject,
          _id: doc.show._id, // Use show id b/c there are no subs for events
        };

        const params = {
          Records: [ // required
            {
              Data: Buffer.from(JSON.stringify(payload)), // required
              PartitionKey: 'shardId-000000000000', // required
            },
          ],
          StreamName: 'wtm-notifications-pipeline-WtmChangesStream-1XJYCTSGQ9TK4', // required
        };
        kinesis.putRecords(params, (kinesisErr) => {
          if (kinesisErr) {
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
        });
      }
    });
  }
});

// Update
Events.after.update(function (userId, doc) {
  if (Meteor.isServer && Meteor.settings.SendContentNotifications) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.'); // eslint-disable-line no-console
        console.error(err); // eslint-disable-line no-console
        return;
      }
      // create kinesis service object
      const kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02',
      });

      // Refactor this to use fieldNames also
      // if we don't need this.previous, then this can be an arrow function again
      const changedKeys = compareDocuments(doc, this.previous);

      const omitFields = [
        'nameSearch',
      ];
      const relevantChangedKeys = pullAll(changedKeys, omitFields);

      const relevantChanges = pick(doc, relevantChangedKeys);
      const relevantChangesOrig = pick(this.previous, relevantChangedKeys);

      // If anything in i18n changed, find out what changed.
      // This is recursive from above, so probably could be a function.
      if (includes(relevantChangedKeys, 'i18n')) {
        each(relevantChanges.i18n, (fields, locale) => {
          const localeChangedKeys = compareDocuments(doc.i18n[locale], this.previous.i18n[locale]);
          const relevantlocaleChangedKeys = pullAll(localeChangedKeys, omitFields);

          relevantChangesOrig.i18n[locale] = pick(
            relevantChangesOrig.i18n[locale],
            relevantlocaleChangedKeys
          );

          relevantChanges.i18n[locale] = pick(
            relevantChanges.i18n[locale],
            relevantlocaleChangedKeys
          );
        });
      }

      if (!isEmpty(relevantChanges)) {
        const userEmail = Meteor.users.findOne(userId).profile.email;
        const Subject = `An event for "${doc.show.name}" has been updated by ${userEmail}`;
        // let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });
        TextBody += `Event: ${baseUrl}events/${doc._id}\n\n`;
        TextBody += `These are the new changes to the page:\n${YAML.stringify(relevantChanges)}\n`;
        TextBody += `This was the previous version:\n${YAML.stringify(relevantChangesOrig)}`;

        const payload = {
          TextBody,
          Subject,
          // No subscriptions for events so comment this out
          // _id: doc._id,
        };

        const params = {
          Records: [ // required
            {
              Data: Buffer.from(JSON.stringify(payload)), // required
              PartitionKey: 'shardId-000000000000', // required
            },
          ],
          StreamName: 'wtm-notifications-pipeline-WtmChangesStream-1XJYCTSGQ9TK4', // required
        };
        kinesis.putRecords(params, (kinesisErr) => {
          if (kinesisErr) {
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
        });
      }
    });
  }
});

// Remove
Events.after.remove((userId, doc) => {
  if (Meteor.isServer && Meteor.settings.SendContentNotifications) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.'); // eslint-disable-line no-console
        console.error(err); // eslint-disable-line no-console
        return;
      }
      // create kinesis service object
      const kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02',
      });

      const omitFields = [
        'nameSearch',
      ];
      const relevantChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          relevantChanges[key] = value;
        }
      });

      if (!isEmpty(relevantChanges)) {
        const userEmail = Meteor.users.findOne(userId).profile.email;
        const Subject = `An event for "${doc.show.name}" has been deleted by ${userEmail}`;
        // let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });
        TextBody += `Event: ${baseUrl}events/${doc._id}\n\n`;
        TextBody += YAML.stringify(relevantChanges);

        const payload = {
          TextBody,
          Subject,
          _id: doc.show._id, // Use show id b/c there are no subs for events
        };

        const params = {
          Records: [ // required
            {
              Data: Buffer.from(JSON.stringify(payload)), // required
              PartitionKey: 'shardId-000000000000', // required
            },
          ],
          StreamName: 'wtm-notifications-pipeline-WtmChangesStream-1XJYCTSGQ9TK4', // required
        };
        kinesis.putRecords(params, (kinesisErr) => {
          if (kinesisErr) {
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
        });
      }
    });
  }
});
