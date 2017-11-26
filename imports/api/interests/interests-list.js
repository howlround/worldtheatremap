import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { Interests } from './interests.js';
import { TAPi18n } from 'meteor/tap:i18n';

const messages = defineMessages({
  'interest.African Diaspora': {
    id: 'interest.African Diaspora',
    defaultMessage: 'African Diaspora',
  },
  'interest.Arab Diaspora': {
    id: 'interest.Arab Diaspora',
    defaultMessage: 'Arab Diaspora',
  },
  'interest.Artist Rights and Safety': {
    id: 'interest.Artist Rights and Safety',
    defaultMessage: 'Artist Rights and Safety',
  },
  'interest.Asian Diaspora': {
    id: 'interest.Asian Diaspora',
    defaultMessage: 'Asian Diaspora',
  },
  'interest.Burlesque / Cabaret': {
    id: 'interest.Burlesque / Cabaret',
    defaultMessage: 'Burlesque / Cabaret',
  },
  'interest.Circus': {
    id: 'interest.Circus',
    defaultMessage: 'Circus',
  },
  'interest.Classical': {
    id: 'interest.Classical',
    defaultMessage: 'Classical',
  },
  'interest.Climate Change': {
    id: 'interest.Climate Change',
    defaultMessage: 'Climate Change',
  },
  'interest.Contemporary': {
    id: 'interest.Contemporary',
    defaultMessage: 'Contemporary',
  },
  'interest.Dance / Movement / Choreography': {
    id: 'interest.Dance / Movement / Choreography',
    defaultMessage: 'Dance / Movement / Choreography',
  },
  'interest.Deaf': {
    id: 'interest.Deaf',
    defaultMessage: 'Deaf',
  },
  'interest.Devised / Ensemble': {
    id: 'interest.Devised / Ensemble',
    defaultMessage: 'Devised / Ensemble',
  },
  'interest.Disability': {
    id: 'interest.Disability',
    defaultMessage: 'Disability',
  },
  'interest.Documentary': {
    id: 'interest.Documentary',
    defaultMessage: 'Documentary',
  },
  'interest.Eco Theatre': {
    id: 'interest.Eco Theatre',
    defaultMessage: 'Eco Theatre',
  },
  'interest.Experimental': {
    id: 'interest.Experimental',
    defaultMessage: 'Experimental',
  },
  'interest.Immersive': {
    id: 'interest.Immersive',
    defaultMessage: 'Immersive',
  },
  'interest.Improvisation': {
    id: 'interest.Improvisation',
    defaultMessage: 'Improvisation',
  },
  'interest.Indigenous': {
    id: 'interest.Indigenous',
    defaultMessage: 'Indigenous',
  },
  'interest.International': {
    id: 'interest.International',
    defaultMessage: 'International',
  },
  'interest.Jewish Diaspora': {
    id: 'interest.Jewish Diaspora',
    defaultMessage: 'Jewish Diaspora',
  },
  'interest.Latino / Hispanic': {
    id: 'interest.Latino / Hispanic',
    defaultMessage: 'Latino / Hispanic',
  },
  'interest.LGBTQIA*': {
    id: 'interest.LGBTQIA*',
    defaultMessage: 'LGBTQIA*',
  },
  'interest.Migration': {
    id: 'interest.Migration',
    defaultMessage: 'Migration',
  },
  'interest.Monologue / Solo Performance': {
    id: 'interest.Monologue / Solo Performance',
    defaultMessage: 'Monologue / Solo Performance',
  },
  'interest.Multidisciplinary / Interdisciplinary': {
    id: 'interest.Multidisciplinary / Interdisciplinary',
    defaultMessage: 'Multidisciplinary / Interdisciplinary',
  },
  'interest.Musical Theatre': {
    id: 'interest.Musical Theatre',
    defaultMessage: 'Musical Theatre',
  },
  'interest.New Technology': {
    id: 'interest.New Technology',
    defaultMessage: 'New Technology',
  },
  'interest.New Work': {
    id: 'interest.New Work',
    defaultMessage: 'New Work',
  },
  'interest.Opera': {
    id: 'interest.Opera',
    defaultMessage: 'Opera',
  },
  'interest.Peacebuilding / Conflict Transformation': {
    id: 'interest.Peacebuilding / Conflict Transformation',
    defaultMessage: 'Peacebuilding / Conflict Transformation',
  },
  'interest.Performance Art': {
    id: 'interest.Performance Art',
    defaultMessage: 'Performance Art',
  },
  'interest.Physical Theatre': {
    id: 'interest.Physical Theatre',
    defaultMessage: 'Physical Theatre',
  },
  'interest.Political / Social': {
    id: 'interest.Political / Social',
    defaultMessage: 'Political / Social',
  },
  'interest.Puppetry': {
    id: 'interest.Puppetry',
    defaultMessage: 'Puppetry',
  },
  'interest.Refugee': {
    id: 'interest.Refugee',
    defaultMessage: 'Refugee',
  },
  'interest.Religion / Spirituality': {
    id: 'interest.Religion / Spirituality',
    defaultMessage: 'Religion / Spirituality',
  },
  'interest.Roma Diaspora': {
    id: 'interest.Roma Diaspora',
    defaultMessage: 'Roma Diaspora',
  },
  'interest.Rural Theatre': {
    id: 'interest.Rural Theatre',
    defaultMessage: 'Rural Theatre',
  },
  'interest.Senior Theatre': {
    id: 'interest.Senior Theatre',
    defaultMessage: 'Senior Theatre',
  },
  'interest.Site-specific': {
    id: 'interest.Site-specific',
    defaultMessage: 'Site-specific',
  },
  'interest.Street Performance': {
    id: 'interest.Street Performance',
    defaultMessage: 'Street Performance/Outdoor Theatre',
  },
  'interest.Theatre for or by Women': {
    id: 'interest.Theatre for or by Women',
    defaultMessage: 'Theatre for or by Women',
  },
  'interest.Traditional / Folk': {
    id: 'interest.Traditional / Folk',
    defaultMessage: 'Traditional / Folk',
  },
  'interest.Translations / Adaptations': {
    id: 'interest.Translations / Adaptations',
    defaultMessage: 'Translations / Adaptations',
  },
  'interest.Young People / Children / Educational': {
    id: 'interest.Young People / Children / Educational',
    defaultMessage: 'Young People / Children / Educational',
  },
});


const supportedLanguages = TAPi18n.getLanguages();
delete supportedLanguages.en;

const meteorRoot = fs.realpathSync( process.cwd() + '/../' );
const publicPath = meteorRoot + '/web.browser/app';
const translations = {};
_.each(supportedLanguages, (name, locale) => {
  const translationFile = fs.readFileSync(`${publicPath}/i18n/${locale}.json`);
  translations[locale] = JSON.parse(translationFile);
});

const allInterests = _.map(messages, interest => (
  {
    value: interest.defaultMessage,
    label: interest.defaultMessage,
    messageId: interest.id,
    i18n: {},
  })
);

// Populate each interest translation
// Native forEach alters the interated object
allInterests.forEach(interest => {
  const thisInterest = interest;
  _.each(supportedLanguages, (name, locale) => {
    thisInterest.i18n[locale] = {
      label: translations[locale][thisInterest.messageId],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating interests database...');
  allInterests.forEach(interest => {
    Interests.upsert({ value: interest.value }, { $set: interest });
  });
});
