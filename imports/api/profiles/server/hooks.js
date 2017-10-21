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
import { Profiles } from '../profiles.js';
import ProfileAllFields from '../../../ui/components/ProfileAllFields.jsx';

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
Profiles.after.insert((userId, doc) => {
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
        'savedHowlroundPosts',
        'howlroundPostsUrl',
        'howlroundPostSearchText',
        'nameSearch',
      ];
      const relevantChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          relevantChanges[key] = value;
        }
      });

      if (!isEmpty(relevantChanges)) {
        const userEmail = Meteor.users.findOne(userId).emails[0].address;
        const Subject = `"${doc.name}" has been created by ${userEmail}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}profiles/${doc._id}`;
        HtmlBody += `<div>Profile: <a href="${url}">${url}</a></div>`;

        const markup = (
          <IntlProvider>
            <ProfileAllFields profile={doc} />
          </IntlProvider>
        );
        HtmlBody += ReactDOMServer.renderToString(markup);

        // Plain text
        TextBody += `Profile: ${baseUrl}profiles/${doc._id}\n\n`;
        TextBody += YAML.stringify(relevantChanges);

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
Profiles.after.update((userId, doc) => {
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
      const changedKeys = compareDocuments(doc, this.previous);

      const omitFields = [
        'savedHowlroundPosts',
        'howlroundPostsUrl',
        'howlroundPostSearchText',
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
        const userEmail = Meteor.users.findOne(userId).emails[0].address;
        const Subject = `"${doc.name}" has been updated by ${userEmail}`;
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}profiles/${doc._id}`;
        HtmlBody += `<div>Profile: <a href="${url}">${url}</a></div>`;

        const relevantChangesMarkup = (
          <IntlProvider>
            <ProfileAllFields profile={relevantChanges} />
          </IntlProvider>
        );
        const relevantChangesRender = ReactDOMServer.renderToString(relevantChangesMarkup);
        HtmlBody += `<h1>These are the new changes to the page:</h1>\n${relevantChangesRender}\n`;

        const relevantChangesOrigMarkup = (
          <IntlProvider>
            <ProfileAllFields profile={relevantChangesOrig} />
          </IntlProvider>
        );
        const relevantChangesOrigRender = ReactDOMServer.renderToString(relevantChangesOrigMarkup);
        HtmlBody += `<h1>This was the previous version:</h1>\n${relevantChangesOrigRender}\n`;

        // Plain text
        TextBody += `Profile: ${baseUrl}profiles/${doc._id}\n\n`;

        TextBody += `These are the new changes to the page:\n${YAML.stringify(relevantChanges)}\n`;
        TextBody += `This was the previous version:\n${YAML.stringify(relevantChangesOrig)}`;

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
          // an error occurred
          if (kinesisErr) {
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
          // else     console.log(data);           // successful response
        });
      }
    });
  }
});

// Remove
Profiles.after.remove((userId, doc) => {
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
        'savedHowlroundPosts',
        'howlroundPostsUrl',
        'howlroundPostSearchText',
        'nameSearch',
      ];
      const relevantChanges = {};
      forOwn(doc, (value, key) => {
        if (!isNull(value) && !isEmpty(value) && !includes(omitFields, key)) {
          relevantChanges[key] = value;
        }
      });

      if (!isEmpty(relevantChanges)) {
        const Subject = `"${doc.name}" has been deleted by ${Meteor.users.findOne(userId).emails[0].address}`; // eslint-disable-line max-len
        let HtmlBody = '';
        let TextBody = '';
        const baseUrl = Meteor.absoluteUrl(false, { secure: true });

        // HTML
        const url = `${baseUrl}profiles/${doc._id}`;
        HtmlBody += `<div>Profile: <a href="${url}">${url}</a></div>`;

        const markup = (
          <IntlProvider>
            <ProfileAllFields profile={doc} />
          </IntlProvider>
        );
        HtmlBody += ReactDOMServer.renderToString(markup);

        // Plain text
        TextBody += `Profile: ${baseUrl}profiles/${doc._id}\n\n`;
        TextBody += YAML.stringify(relevantChanges);

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
        kinesis.putRecords(params, (kinesisErr) => {
          if (kinesisErr) {
            console.log(kinesisErr, kinesisErr.stack); // eslint-disable-line no-console
          }
        });
      }
    });
  }
});
