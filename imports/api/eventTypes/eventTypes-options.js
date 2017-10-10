import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { EventTypes } from './eventTypes.js';
import { TAPi18n } from 'meteor/tap:i18n';

const messages = defineMessages({
  'eventType.Performance': {
    id: 'eventType.Performance',
    defaultMessage: 'Performance',
  },
  'eventType.Reading': {
    id: 'eventType.Reading',
    defaultMessage: 'Reading',
  },
  'eventType.Workshop': {
    id: 'eventType.Workshop',
    defaultMessage: 'Workshop',
  },
});

const supportedLanguages = TAPi18n.getLanguages();
delete supportedLanguages.en;

const meteorRoot = fs.realpathSync(`${process.cwd()}/../`);
const publicPath = `${meteorRoot}/web.browser/app/`;
const translations = {};
_.each(supportedLanguages, (name, locale) => {
  const translationFile = fs.readFileSync(`${publicPath}/i18n/${locale}.json`);
  translations[locale] = JSON.parse(translationFile);
});

const allEventTypes = _.map(messages, eventType => (
  {
    value: eventType.defaultMessage,
    label: eventType.defaultMessage,
    i18n: {},
  }
));

// Populate each eventType translation
// Native forEach alters the interated object
allEventTypes.forEach(eventType => {
  const thisOrgType = eventType;
  _.each(supportedLanguages, (name, locale) => {
    thisOrgType.i18n[locale] = {
      label: translations[locale][`eventType.${thisOrgType.value}`],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating event types database...');
  allEventTypes.forEach(eventType => {
    EventTypes.upsert({ value: eventType.value }, { $set: eventType });
  });
});
