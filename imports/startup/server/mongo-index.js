import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';

Profiles._ensureIndex({
  "name": 1
});

Shows._ensureIndex({
  "name": 1
});
