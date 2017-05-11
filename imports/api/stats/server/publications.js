/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { _ } from 'meteor/underscore';

// API
import { Stats } from '../../stats/stats.js';
import { Profiles } from '../../profiles/profiles.js';
import { Shows } from '../../shows/shows.js';
import { Events } from '../../events/events.js';

Meteor.publish('stats.analytics', function statsAnalytics() {
  const self = this;
  let countOriginalLanguage = {};
  let countOriginalLanguageTotal = 0;
  const supportedLanguages = TAPi18n.getLanguages();
  _.each(supportedLanguages, (key, locale) => {
    countOriginalLanguage[locale] = 0;
  });

  let initializing = true;
  // observeChanges only returns after the initial `added` callbacks
  // have run. Until then, we don't want to send a lot of
  // `self.changed()` messages - hence tracking the
  // `initializing` state.
  const handleProfiles = Profiles.find({}).observeChanges({
    added: function(id, fields) {
      countOriginalLanguage[fields.source]++;
      countOriginalLanguageTotal++;
      if (!initializing) {
        self.changed(
          'Stats',
          'Original Language',
          {
            count: countOriginalLanguage,
            total: countOriginalLanguageTotal,
          }
        );
      }
    },
    // don't care about removed or changed
  });
  const handleShows = Shows.find({}).observeChanges({
    added: function(id, fields) {
      countOriginalLanguage[fields.source]++;
      countOriginalLanguageTotal++;
      if (!initializing) {
        self.changed(
          'Stats',
          'Original Language',
          {
            count: countOriginalLanguage,
            total: countOriginalLanguageTotal,
          }
        );
      }
    },
    // don't care about removed or changed
  });
  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  self.added(
    'Stats',
    'Original Language',
    {
      count: countOriginalLanguage,
      total: countOriginalLanguageTotal,
    }
  );
  self.ready();
  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  self.onStop(() => {
    handleProfiles.stop();
    handleShows.stop();
  });
});
