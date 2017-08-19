import { Meteor } from 'meteor/meteor';

import {
  reduce,
  isEqual,
  pullAll,
  pick,
  each,
  includes,
} from 'lodash';

import { Profiles } from '../../api/profiles/profiles.js';

let initializing = true;

const observeChangesHandle = Profiles.find({}).observeChanges({
  added: function() {
    // if (!initializing) {

    // }
  },
  removed: function() {
    // self.changed('Counts', 'Theatremakers', { count: countTheatremakers });
  },
  changed: function(id, fields) {
    // console.log(self);
    // @TODO: Ignore howlroundPostsUrl
    // console.log('observeChanges');
    // console.log(id);
    // console.log(fields);
  },
});

const observeHandle = Profiles.find({}).observe({
  added: function(newDocument) {
    // if (!initializing) {

    // }
  },
  removed: function(oldDocument) {
    // self.changed('Counts', 'Theatremakers', { count: countTheatremakers });
  },
  changed: function(newDocument, oldDocument) {
    const changedKeys = compareDocuments(newDocument, oldDocument);

    const omitFields = [
      'savedHowlroundPosts',
      'howlroundPostsUrl',
      'howlroundPostSearchText',
      'nameSearch',
    ];
    const releventChangedKeys = pullAll(changedKeys, omitFields);

    const relevenatChanges = pick(newDocument, releventChangedKeys);
    const relevenatChangesOrig = pick(oldDocument, releventChangedKeys);

    // If anything in i18n changed, find out what changed.
    // This is recursive from above, so probably could be a function.
    if (includes(releventChangedKeys, 'i18n')) {
      each(relevenatChanges.i18n, (fields, locale) => {
        const localeChangedKeys = compareDocuments(newDocument.i18n[locale], oldDocument.i18n[locale]);
        const releventlocaleChangedKeys = pullAll(localeChangedKeys, omitFields);

        relevenatChangesOrig.i18n[locale] = pick(relevenatChangesOrig.i18n[locale], releventlocaleChangedKeys);
        relevenatChanges.i18n[locale] = pick(relevenatChanges.i18n[locale], releventlocaleChangedKeys);
      });
    }

    console.log('relevenatChangesOrig');
    console.log(relevenatChangesOrig);
    console.log('relevenatChanges');
    console.log(relevenatChanges);

    // console.log(newDocument);
    // console.log(oldDocument);
  },
});

initializing = false;

const compareDocuments = function(a, b) {
  return reduce(a, function(result, value, key) {
    // return isEqual(value, b[key]) ? result : result.concat(key);
    const comparison = isEqual(value, b[key]) ? result : result.concat(key);
    // console.log(comparison);
    return comparison;
  }, []);
}
