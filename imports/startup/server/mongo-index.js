import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';

Profiles._ensureIndex({
  "nameSearch": 1
});

Shows._ensureIndex({
  "name": 1
});

Events._ensureIndex({
  "startDate": 1
});
