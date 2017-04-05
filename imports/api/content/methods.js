import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

import { Content, contentSchema } from './content.js';

const CONTENT_ID_ONLY = new SimpleSchema({
  contentId: { type: String },
}).validator();

export const update = new ValidatedMethod({
  name: 'content.update',
  validate({ newContent }) {
    const result = t.validate(newContent, contentSchema);

    if (!result.isValid()) {
      throw new ValidationError(result.firstError());
    }
  },
  run({ contentId, newContent, locale }) {
    const access = Roles.userIsInRole(this.userId, ['admin']);
    if (!access) {
      throw new Meteor.Error('content.update.accessDenied',
        'You must be an administrator to complete this operation.');
    }

    const doc = {};
    doc[locale] = newContent;

    return Content.updateTranslations(contentId, doc);
  },
});

// Get content of all method names on Content
const CONTENT_METHODS = _.pluck([
  update,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 content operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(CONTENT_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
