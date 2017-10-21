/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';

// API
import { Profiles } from '../../profiles/profiles.js';
import { Shows } from '../../shows/shows.js';
import { Events } from '../../events/events.js';

Meteor.publish('counts.collections', function countsCollections() {
  const self = this;
  let countTheatremakers = 0;
  let countOrganizations = 0;
  let countShows = 0;
  let countFestivals = 0;
  let countLocations = 0;
  let initializing = true;
  // observeChanges only returns after the initial `added` callbacks
  // have run. Until then, we don't want to send a lot of
  // `self.changed()` messages - hence tracking the
  // `initializing` state.
  const handleTheatremakers = Profiles.find({ profileType: 'Individual' }).observeChanges({
    added: () => {
      countTheatremakers++;
      if (!initializing) {
        self.changed('Counts', 'People', { count: countTheatremakers });
      }
    },
    removed: () => {
      countTheatremakers--;
      self.changed('Counts', 'People', { count: countTheatremakers });
    },
    // don't care about changed
  });
  const handleOrganizations = Profiles.find({ profileType: 'Organization' }).observeChanges({
    added: () => {
      countOrganizations++;
      if (!initializing) {
        self.changed('Counts', 'Organizations', { count: countOrganizations });
      }
    },
    removed: () => {
      countOrganizations--;
      self.changed('Counts', 'Organizations', { count: countOrganizations });
    },
    // don't care about changed
  });
  const handleFestivals = Profiles.find({ profileType: 'Festival' }).observeChanges({
    added: () => {
      countFestivals++;
      if (!initializing) {
        self.changed('Counts', 'Festivals', { count: countFestivals });
      }
    },
    removed: () => {
      countFestivals--;
      self.changed('Counts', 'Festivals', { count: countFestivals });
    },
    // don't care about changed
  });
  const handleShows = Shows.find({}).observeChanges({
    added: () => {
      countShows++;
      if (!initializing) {
        self.changed('Counts', 'Shows', { count: countShows });
      }
    },
    removed: () => {
      countShows--;
      self.changed('Counts', 'Shows', { count: countShows });
    },
    // don't care about changed
  });
  const handleEventLocations = Events.find({ lat: { $gt: '' } }).observeChanges({
    added: () => {
      countLocations++;
      if (!initializing) {
        self.changed('Counts', 'Locations', { count: countLocations });
      }
    },
    removed: () => {
      countLocations--;
      self.changed('Counts', 'Locations', { count: countLocations });
    },
    // don't care about changed
  });
  const handleProfileLocations = Profiles.find({ lat: { $gt: '' } }).observeChanges({
    added: () => {
      countLocations++;
      if (!initializing) {
        self.changed('Counts', 'Locations', { count: countLocations });
      }
    },
    removed: () => {
      countLocations--;
      self.changed('Counts', 'Locations', { count: countLocations });
    },
    // don't care about changed
  });
  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  self.added('Counts', 'People', { count: countTheatremakers });
  self.added('Counts', 'Organizations', { count: countOrganizations });
  self.added('Counts', 'Shows', { count: countShows });
  self.added('Counts', 'Festivals', { count: countFestivals });
  self.added('Counts', 'Locations', { count: countLocations });
  self.ready();
  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  self.onStop(() => {
    handleTheatremakers.stop();
    handleOrganizations.stop();
    handleShows.stop();
    handleFestivals.stop();
    handleEventLocations.stop();
    handleProfileLocations.stop();
  });
});
