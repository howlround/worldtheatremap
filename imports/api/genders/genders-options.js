import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { Genders } from './genders.js';
import { TAPi18n } from 'meteor/tap:i18n';

const messages = defineMessages({
  'gender.Female': {
    id: 'gender.Female',
    defaultMessage: 'Female',
  },
  'gender.Male': {
    id: 'gender.Male',
    defaultMessage: 'Male',
  },
  'gender.Transgender': {
    id: 'gender.Transgender',
    defaultMessage: 'Transgender',
  },
  'gender.Another Identity': {
    id: 'gender.Another Identity',
    defaultMessage: 'Another Identity',
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

const allGenders = _.map(messages, gender => (
  {
    value: gender.defaultMessage,
    label: gender.defaultMessage,
    i18n: {},
  }
));

// Populate each gender translation
// Native forEach alters the interated object
allGenders.forEach(gender => {
  const thisGender = gender;
  _.each(supportedLanguages, (name, locale) => {
    thisGender.i18n[locale] = {
      label: translations[locale][`gender.${thisGender.value}`],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating gender options database...');
  allGenders.forEach(gender => {
    Genders.upsert({ value: gender.value }, { $set: gender });
  });
});
