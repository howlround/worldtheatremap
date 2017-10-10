import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { OrgTypes } from './orgTypes.js';
import { TAPi18n } from 'meteor/tap:i18n';

const messages = defineMessages({
  'orgType.Cultural / Sociocultural Service': {
    id: 'orgType.Cultural / Sociocultural Service',
    defaultMessage: 'Cultural / Sociocultural Service',
  },
  'orgType.Development / Residency Organization': {
    id: 'orgType.Development / Residency Organization',
    defaultMessage: 'Development / Residency Organization',
  },
  'orgType.Festival': {
    id: 'orgType.Festival',
    defaultMessage: 'Festival',
  },
  'orgType.Funder / Supporting Institution': {
    id: 'orgType.Funder / Supporting Institution',
    defaultMessage: 'Funder / Supporting Institution',
  },
  'orgType.Network / Association / Union': {
    id: 'orgType.Network / Association / Union',
    defaultMessage: 'Network / Association / Union',
  },
  'orgType.Performing Company / Ensemble': {
    id: 'orgType.Performing Company / Ensemble',
    defaultMessage: 'Performing Company / Ensemble',
  },
  'orgType.Producer / Presenter': {
    id: 'orgType.Producer / Presenter',
    defaultMessage: 'Producer / Presenter',
  },
  'orgType.Resource Centre': {
    id: 'orgType.Resource Centre',
    defaultMessage: 'Resource Centre',
  },
  'orgType.School / University / Training Organization': {
    id: 'orgType.School / University / Training Organization',
    defaultMessage: 'School / University / Training Organization',
  },
  'orgType.Venue': {
    id: 'orgType.Venue',
    defaultMessage: 'Venue',
  },
  'orgType.Other': {
    id: 'orgType.Other',
    defaultMessage: 'Other',
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

const allOrgTypes = _.map(messages, orgType => (
  {
    value: orgType.defaultMessage,
    label: orgType.defaultMessage,
    i18n: {},
  }
));

// Populate each orgType translation
// Native forEach alters the interated object
allOrgTypes.forEach(orgType => {
  const thisOrgType = orgType;
  _.each(supportedLanguages, (name, locale) => {
    thisOrgType.i18n[locale] = {
      label: translations[locale][`orgType.${thisOrgType.value}`],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating org types database...');
  allOrgTypes.forEach(orgType => {
    OrgTypes.upsert({ value: orgType.value }, { $set: orgType });
  });
});
