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
import { Participants } from '../../participants/participants.js';
import { markUsed } from '../../languages/methods.js';

// Helper function to compare previous and current versions
const compareDocuments = (a, b) => (
  reduce(a, (result, value, key) => {
    // return isEqual(value, b[key]) ? result : result.concat(key);
    const comparison = isEqual(value, b[key]) ? result : result.concat(key);
    // console.log(comparison);
    return comparison;
  }, [])
);

// Insert
Shows.after.insert((userId, doc) => {
  // Update Language collection
  if (!isEmpty(doc.languages)) {
    each(doc.languages, language => {
      markUsed.call({ language });
    });
  }

  // Notify admins and subscribers
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
      const releventChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          releventChanges[key] = value;
        }
      });

      if (!isEmpty(releventChanges)) {
        const userEmail = Meteor.users.findOne(userId).emails[0].address;
        const Subject = `"${doc.name}" has been created by ${userEmail}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}shows/${doc._id}`;
        HtmlBody += `<div>Show: <a href="${url}">${url}</a></div>`;

        const markup = (
          <IntlProvider>
            <Show show={doc} />
          </IntlProvider>
        );
        HtmlBody += ReactDOMServer.renderToString(markup);

        // Plain text
        TextBody += `Show: ${baseUrl}shows/${doc._id}\n\n`;
        TextBody += YAML.stringify(releventChanges);

        const payload = {
          HtmlBody,
          TextBody,
          Subject,
          _id: doc._id,
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
        kinesis.putRecords(params, kinesisErr => {
          if (kinesisErr) {
            // an error occurred
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
          // else     console.log(data);           // successful response
        });
      }
    });
  }
});

// Update
Shows.after.update(function (userId, doc) {
  Participants.update({
    'event.show._id': doc._id,
  }, {
    $set: {
      'event.show.author': doc.author,
      "name" : doc.name,
      "nameSearch" : doc.nameSearch,
    }
  }, {
    multi: true,
  });

  // Update Language collection
  if (!isEmpty(doc.languages)) {
    each(doc.languages, language => {
      markUsed.call({ language });
    });
  }

  // Notify admins and subscribers
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

      // Refactor this to use fieldNames also (optional third argument to the update hook)
      // if we don't need this.previous, then this can be an arrow function again
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

          releventChangesOrig.i18n[locale] = pick(
            releventChangesOrig.i18n[locale],
            releventlocaleChangedKeys
          );

          releventChanges.i18n[locale] = pick(
            releventChanges.i18n[locale],
            releventlocaleChangedKeys
          );
        });
      }

      if (!isEmpty(releventChanges)) {
        const userEmail = Meteor.users.findOne(userId).emails[0].address;
        const Subject = `"${doc.name}" has been updated by ${userEmail}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}shows/${doc._id}`;
        HtmlBody += `<div>Show: <a href="${url}">${url}</a></div>`;

        const releventChangesMarkup = (
          <IntlProvider>
            <Show show={releventChanges} />
          </IntlProvider>
        );
        const releventChangesRender = ReactDOMServer.renderToString(releventChangesMarkup);
        HtmlBody += `<h1>These are the new changes to the page:</h1>\n${releventChangesRender}\n`;

        const releventChangesOrigMarkup = (
          <IntlProvider>
            <Show show={releventChangesOrig} />
          </IntlProvider>
        );
        const releventChangesOrigRender = ReactDOMServer.renderToString(releventChangesOrigMarkup);
        HtmlBody += `<h1>This was the previous version:</h1>\n${releventChangesOrigRender}\n`;

        // Plain text
        TextBody += `Show: ${baseUrl}shows/${doc._id}\n\n`;
        TextBody += `These are the new changes to the page:\n${YAML.stringify(releventChanges)}\n`;
        TextBody += `This was the previous version:\n${YAML.stringify(releventChangesOrig)}`;

        const payload = {
          HtmlBody,
          TextBody,
          Subject,
          _id: doc._id,
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
        kinesis.putRecords(params, kinesisErr => {
          if (kinesisErr) {
            // an error occurred
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
          // else     console.log(data);           // successful response
        });
      }
    });
  }
});

// Remove
Shows.after.remove((userId, doc) => {
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
      const releventChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          releventChanges[key] = value;
        }
      });

      if (!isEmpty(releventChanges)) {
        const userEmail = Meteor.users.findOne(userId).emails[0].address;
        const Subject = `"${doc.name}" has been deleted by ${userEmail}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}shows/${doc._id}`;
        HtmlBody += `<div>Show: <a href="${url}">${url}</a></div>`;

        const markup = (
          <IntlProvider>
            <Show show={doc} />
          </IntlProvider>
        );
        HtmlBody += ReactDOMServer.renderToString(markup);

        // Plain text
        TextBody += `Show: ${baseUrl}shows/${doc._id}\n\n`;
        TextBody += YAML.stringify(releventChanges);

        const payload = {
          HtmlBody,
          TextBody,
          Subject,
          _id: doc._id,
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
        kinesis.putRecords(params, kinesisErr => {
          if (kinesisErr) {
            // an error occurred
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
          // else     console.log(data);           // successful response
        });
      }
    });
  }
});
