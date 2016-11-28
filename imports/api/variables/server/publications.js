/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

// API
import { Variables } from '../variables.js';

Meteor.publish('variables.get', function variablesGet(ids) {
  return Variables.find({ _id: { $in: ids } }, {
    fields: Variables.publicFields,
  });
});
