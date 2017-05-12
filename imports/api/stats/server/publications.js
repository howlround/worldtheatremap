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
  let countEventsByUS = { us: 0, other: 0 };
  let countEventsTotal = 0;
  let countIndividualsByUS = { us: 0, other: 0 };
  let countIndividualsTotal = 0;
  let countOrganizationsByUS = { us: 0, other: 0 };
  let countOrganizationsTotal = 0;
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
      // Content by language
      countOriginalLanguage[fields.source]++;
      countOriginalLanguageTotal++;
      if (!initializing) {
        self.changed(
          'Stats',
          'Content Original Language',
          {
            count: countOriginalLanguage,
            total: countOriginalLanguageTotal,
          }
        );
      }

      // Individuals by US/Other
      if (_.contains(fields.profileType, 'Individual')) {
        if (fields.country === 'United States') {
          countIndividualsByUS.us++;
          countIndividualsTotal++; // Only get percentage of profiles reporting a country
        }
        else {
          countIndividualsByUS.other++;
          countIndividualsTotal++; // Only get percentage of profiles reporting a country
        }
        if (!initializing) {
          self.changed(
            'Stats',
            'Theatremakers by Country',
            {
              items: [
                {
                  label: 'United States',
                  value: countIndividualsByUS.us,
                },
                {
                  label: 'Other Countries',
                  value: countIndividualsByUS.other,
                },
              ],
              total: countIndividualsTotal,
            }
          );
        }
      }

      // Individuals by US/Other
      // Second IF statement because a profile could be both
      if (_.contains(fields.profileType, 'Organization')) {
        if (fields.country === 'United States') {
          countOrganizationsByUS.us++;
          countOrganizationsTotal++; // Only get percentage of profiles reporting a country
        }
        else {
          countOrganizationsByUS.other++;
          countOrganizationsTotal++; // Only get percentage of profiles reporting a country
        }
        if (!initializing) {
          self.changed(
            'Stats',
            'Organizations by Country',
            {
              items: [
                {
                  label: 'United States',
                  value: countOrganizationsByUS.us,
                },
                {
                  label: 'Other Countries',
                  value: countOrganizationsByUS.other,
                },
              ],
              total: countOrganizationsTotal,
            }
          );
        }
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
          'Content Original Language',
          {
            count: countOriginalLanguage,
            total: countOriginalLanguageTotal,
          }
        );
      }
    },
    // don't care about removed or changed
  });
  const handleEvents = Events.find({}).observeChanges({
    added: function(id, fields) {
      if (fields.country === 'United States') {
        countEventsByUS.us++;
      }
      else {
        countEventsByUS.other++;
      }
      countEventsTotal++;
      if (!initializing) {
        self.changed(
          'Stats',
          'Events by Country',
          {
            items: [
              {
                label: 'United States',
                value: countEventsByUS.us,
              },
              {
                label: 'Other Countries',
                value: countEventsByUS.other,
              },
            ],
            total: countEventsTotal,
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
    'Content Original Language',
    {
      items: countOriginalLanguage,
      total: countOriginalLanguageTotal,
    }
  );
  self.added(
    'Stats',
    'Events by Country',
    {
      items: [
        {
          label: 'United States',
          value: countEventsByUS.us,
        },
        {
          label: 'Other Countries',
          value: countEventsByUS.other,
        },
      ],
      total: countEventsTotal,
    }
  );
  self.added(
    'Stats',
    'Theatremakers by Country',
    {
      items: [
        {
          label: 'United States',
          value: countIndividualsByUS.us,
        },
        {
          label: 'Other Countries',
          value: countIndividualsByUS.other,
        },
      ],
      total: countIndividualsTotal,
    }
  );
  self.added(
    'Stats',
    'Organizations by Country',
    {
      items: [
        {
          label: 'United States',
          value: countOrganizationsByUS.us,
        },
        {
          label: 'Other Countries',
          value: countOrganizationsByUS.other,
        },
      ],
      total: countOrganizationsTotal,
    }
  );
  self.ready();
  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  self.onStop(() => {
    handleProfiles.stop();
    handleShows.stop();
    handleEvents.stop();
  });
});
