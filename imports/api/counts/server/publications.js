/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

// API
import { Counts } from '../../counts/counts.js';
import { Profiles } from '../../profiles/profiles.js';
import { Shows } from '../../shows/shows.js';
import { Events } from '../../events/events.js';

Meteor.publish('counts.collections', function() {
  const self = this;
  let countProfiles = 0;
  let countOrgs = 0;
  let countShows = 0;
  let countEvents = 0;
  let initializing = true;
  // observeChanges only returns after the initial `added` callbacks
  // have run. Until then, we don't want to send a lot of
  // `self.changed()` messages - hence tracking the
  // `initializing` state.
  const handleProfiles = Profiles.find({}).observeChanges({
    added: function() {
      countProfiles++;
      if (!initializing) {
        self.changed('Counts', 'Profiles', { count: countProfiles });
      }
    },
    removed: function() {
      countProfiles--;
      self.changed('Counts', 'Profiles', { count: countProfiles });
    },
    // don't care about changed
  });
  const handleShows = Shows.find({}).observeChanges({
    added: function() {
      countShows++;
      if (!initializing) {
        self.changed('Counts', 'Shows', { count: countShows });
      }
    },
    removed: function() {
      countShows--;
      self.changed('Counts', 'Shows', { count: countShows });
    },
    // don't care about changed
  });
  const handleEvents = Events.find({}).observeChanges({
    added: function() {
      countEvents++;
      if (!initializing) {
        self.changed('Counts', 'Events', { count: countEvents });
      }
    },
    removed: function() {
      countEvents--;
      self.changed('Counts', 'Events', { count: countEvents });
    },
    // don't care about changed
  });
  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  self.added('Counts', 'Profiles', { count: countProfiles });
  self.added('Counts', 'Shows', { count: countShows });
  self.added('Counts', 'Events', { count: countEvents });
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
