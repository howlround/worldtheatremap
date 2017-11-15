import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { Roles } from './selfDefinedRoles.js';
import { TAPi18n } from 'meteor/tap:i18n';

const messages = defineMessages({
  'role.Administrator, Manager, Producer': {
    id: 'role.Administrator, Manager, Producer',
    defaultMessage: 'Administrator, Manager, Producer',
  },
  'role.Agent, Representative': {
    id: 'role.Agent, Representative',
    defaultMessage: 'Agent, Representative',
  },
  'role.Choreographer': {
    id: 'role.Choreographer',
    defaultMessage: 'Choreographer',
  },
  'role.Curator / Programmer': {
    id: 'role.Curator / Programmer',
    defaultMessage: 'Curator / Programmer',
  },
  'role.Designer': {
    id: 'role.Designer',
    defaultMessage: 'Designer',
  },
  'role.Designer: Costume': {
    id: 'role.Designer: Costume',
    defaultMessage: 'Designer: Costume',
  },
  'role.Designer: Graphic': {
    id: 'role.Designer: Graphic',
    defaultMessage: 'Designer: Graphic',
  },
  'role.Designer: Lighting': {
    id: 'role.Designer: Lighting',
    defaultMessage: 'Designer: Lighting',
  },
  'role.Designer: Projection': {
    id: 'role.Designer: Projection',
    defaultMessage: 'Designer: Projection',
  },
  'role.Designer: Props': {
    id: 'role.Designer: Props',
    defaultMessage: 'Designer: Props',
  },
  'role.Designer: Puppets': {
    id: 'role.Designer: Puppets',
    defaultMessage: 'Designer: Puppets',
  },
  'role.Designer: Scenic': {
    id: 'role.Designer: Scenic',
    defaultMessage: 'Designer: Scenic',
  },
  'role.Designer: Sound': {
    id: 'role.Designer: Sound',
    defaultMessage: 'Designer: Sound',
  },
  'role.Director': {
    id: 'role.Director',
    defaultMessage: 'Director',
  },
  'role.Dramaturg': {
    id: 'role.Dramaturg',
    defaultMessage: 'Dramaturg',
  },
  'role.Educator / Scholar': {
    id: 'role.Educator / Scholar',
    defaultMessage: 'Educator / Scholar',
  },
  'role.Funder': {
    id: 'role.Funder',
    defaultMessage: 'Funder',
  },
  'role.Journalist / Critic': {
    id: 'role.Journalist / Critic',
    defaultMessage: 'Journalist / Critic',
  },
  'role.Marketing / Communication': {
    id: 'role.Marketing / Communication',
    defaultMessage: 'Marketing / Communication',
  },
  'role.Music Composer': {
    id: 'role.Music Composer',
    defaultMessage: 'Music Composer',
  },
  'role.Other': {
    id: 'role.Other',
    defaultMessage: 'Other',
  },
  'role.Performer': {
    id: 'role.Performer',
    defaultMessage: 'Performer',
  },
  'role.Performer: Dancer': {
    id: 'role.Performer: Dancer',
    defaultMessage: 'Performer: Dancer',
  },
  'role.Performer: Musician': {
    id: 'role.Performer: Musician',
    defaultMessage: 'Performer: Musician',
  },
  'role.Performer: Singer': {
    id: 'role.Performer: Singer',
    defaultMessage: 'Performer: Singer',
  },
  'role.Playwright': {
    id: 'role.Playwright',
    defaultMessage: 'Playwright',
  },
  'role.Production/Technical Staff': {
    id: 'role.Production/Technical Staff',
    defaultMessage: 'Production/Technical Staff',
  },
  'role.Student': {
    id: 'role.Student',
    defaultMessage: 'Student',
  },
  'role.Translator': {
    id: 'role.Translator',
    defaultMessage: 'Translator',
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

const allRoles = _.map(messages, role => (
  {
    value: role.defaultMessage,
    label: role.defaultMessage,
    i18n: {},
  }
));

// Populate each role translation
// Native forEach alters the interated object
allRoles.forEach(role => {
  const thisRole = role;
  _.each(supportedLanguages, (name, locale) => {
    thisRole.i18n[locale] = {
      label: translations[locale][`role.${thisRole.value}`],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating self defined roles database...');
  allRoles.forEach(role => {
    Roles.upsert({ value: role.value }, { $set: role });
  });
});
