/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Plays } from '../plays.js';

Meteor.publish('plays.public', function playsPublic() {
  return Plays.find({}, {
    fields: Plays.publicFields,
  });
});
