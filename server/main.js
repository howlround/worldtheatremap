import { Meteor } from 'meteor/meteor';
import '/imports/startup/server';

// Don't use basic auth locally for tests
if (Meteor.settings.length > 0) {
  const basicAuth = new HttpBasicAuth('world theatre map', 'world theatre map');
  basicAuth.protect();
}
