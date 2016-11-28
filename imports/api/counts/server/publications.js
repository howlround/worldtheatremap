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
  let countArtists = 0;
  let countOrganizations = 0;
  let countShows = 0;
  let countEvents = 0;
  let countLocations = 0;
  let initializing = true;
  // observeChanges only returns after the initial `added` callbacks
  // have run. Until then, we don't want to send a lot of
  // `self.changed()` messages - hence tracking the
  // `initializing` state.
  const handleProfiles = Profiles.find({}).observeChanges({
    added: function() {
      countProfiles++;
      if (!initializing) {
        self.changed('Counts', 'Theatremakers', { count: countProfiles });
      }
    },
    removed: function() {
      countProfiles--;
      self.changed('Counts', 'Theatremakers', { count: countProfiles });
    },
    // don't care about changed
  });
  const handleArtists = Profiles.find({"profileType": "Individual"}).observeChanges({
    added: function() {
      countArtists++;
      if (!initializing) {
        self.changed('Counts', 'Artists', { count: countArtists });
      }
    },
    removed: function() {
      countArtists--;
      self.changed('Counts', 'Artists', { count: countArtists });
    },
    // don't care about changed
  });
  const handleOrganizations = Profiles.find({"profileType": "Organization"}).observeChanges({
    added: function() {
      countOrganizations++;
      if (!initializing) {
        self.changed('Counts', 'Organizations', { count: countOrganizations });
      }
    },
    removed: function() {
      countOrganizations--;
      self.changed('Counts', 'Organizations', { count: countOrganizations });
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
  const handleEventLocations = Events.find({"lat": { $gt: ""}}).observeChanges({
    added: function() {
      countLocations++;
      if (!initializing) {
        self.changed('Counts', 'Locations', { count: countLocations });
      }
    },
    removed: function() {
      countLocations--;
      self.changed('Counts', 'Locations', { count: countLocations });
    },
    // don't care about changed
  });
  const handleProfileLocations = Profiles.find({"lat": { $gt: ""}}).observeChanges({
    added: function() {
      countLocations++;
      if (!initializing) {
        self.changed('Counts', 'Locations', { count: countLocations });
      }
    },
    removed: function() {
      countLocations--;
      self.changed('Counts', 'Locations', { count: countLocations });
    },
    // don't care about changed
  });
  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  self.added('Counts', 'Theatremakers', { count: countProfiles });
  self.added('Counts', 'Artists', { count: countArtists });
  self.added('Counts', 'Organizations', { count: countOrganizations });
  self.added('Counts', 'Shows', { count: countShows });
  self.added('Counts', 'Events', { count: countEvents });
  self.added('Counts', 'Locations', { count: countLocations });
  self.ready();
  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  self.onStop(() => {
    handleProfiles.stop();
    handleArtists.stop();
    handleOrganizations.stop();
    handleShows.stop();
    handleEvents.stop();
    handleEventLocations.stop();
    handleProfileLocations.stop();
  });
});
