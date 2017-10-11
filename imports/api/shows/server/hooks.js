import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider } from 'react-intl';
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
import { Shows } from '../shows.js';
import Show from '../../../ui/components/Show.jsx';
import { markUsed } from '../../languages/methods.js';

// Insert
Shows.after.insert(function(userId, doc) {
  // Update Language collection
  if (!_.isEmpty(doc.languages)) {
    _.each(doc.languages, language => {
      markUsed.call({ language });
    });
  }

  // Notify admins and subscribers
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
      const releventChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          releventChanges[key] = value;
        }
      });

      if (!isEmpty(releventChanges)) {
        const Subject = `"${doc.name}" has been created by ${Meteor.users.findOne(userId).emails[0].address}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}shows/${doc._id}`;
        HtmlBody += `<div>Show: <a href="${url}">${url}</a></div>`;

        const markup = <IntlProvider>
          <Show show={doc} />
        </IntlProvider>;
        HtmlBody += ReactDOMServer.renderToString(markup);

        // Plain text
        TextBody += `Show: ${baseUrl}shows/${doc._id}\n\n`;
        TextBody += YAML.stringify(releventChanges);

        const payload = {
          HtmlBody,
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
Shows.after.update(function(userId, doc, fieldNames, modifier, options) {
  // Update Language collection
  if (!_.isEmpty(doc.languages)) {
    _.each(doc.languages, language => {
      markUsed.call({ language });
    });
  }

  // Notify admins and subscribers
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

      const releventChanges = pick(doc, releventChangedKeys);
      const releventChangesOrig = pick(this.previous, releventChangedKeys);

      // If anything in i18n changed, find out what changed.
      // This is recursive from above, so probably could be a function.
      if (includes(releventChangedKeys, 'i18n')) {
        each(releventChanges.i18n, (fields, locale) => {
          const localeChangedKeys = compareDocuments(doc.i18n[locale], this.previous.i18n[locale]);
          const releventlocaleChangedKeys = pullAll(localeChangedKeys, omitFields);

          releventChangesOrig.i18n[locale] = pick(releventChangesOrig.i18n[locale], releventlocaleChangedKeys);
          releventChanges.i18n[locale] = pick(releventChanges.i18n[locale], releventlocaleChangedKeys);
        });
      }

      if (!isEmpty(releventChanges)) {
        const Subject = `"${doc.name}" has been updated by ${Meteor.users.findOne(userId).emails[0].address}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}shows/${doc._id}`;
        HtmlBody += `<div>Show: <a href="${url}">${url}</a></div>`;

        const releventChangesMarkup = <IntlProvider>
          <Show show={releventChanges} />
        </IntlProvider>;
        HtmlBody += `<h1>These are the new changes to the page:</h1>\n${ReactDOMServer.renderToString(releventChangesMarkup)}\n`;

        const releventChangesOrigMarkup = <IntlProvider>
          <Show show={releventChangesOrig} />
        </IntlProvider>;
        HtmlBody += `<h1>This was the previous version:</h1>\n${ReactDOMServer.renderToString(releventChangesOrigMarkup)}\n`;

        // Plain text
        TextBody += `Show: ${baseUrl}shows/${doc._id}\n\n`;
        TextBody += `These are the new changes to the page:\n${YAML.stringify(releventChanges)}\n`;
        TextBody += `This was the previous version:\n${YAML.stringify(releventChangesOrig)}`;

        const payload = {
          HtmlBody,
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
Shows.after.remove(function(userId, doc) {
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
      const releventChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          releventChanges[key] = value;
        }
      });

      if (!isEmpty(releventChanges)) {
        const Subject = `"${doc.name}" has been deleted by ${Meteor.users.findOne(userId).emails[0].address}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}shows/${doc._id}`;
        HtmlBody += `<div>Show: <a href="${url}">${url}</a></div>`;

        const markup = <IntlProvider>
          <Show show={doc} />
        </IntlProvider>;
        HtmlBody += ReactDOMServer.renderToString(markup);

        // Plain text
        TextBody += `Show: ${baseUrl}shows/${doc._id}\n\n`;
        TextBody += YAML.stringify(releventChanges);

        const payload = {
          HtmlBody,
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
