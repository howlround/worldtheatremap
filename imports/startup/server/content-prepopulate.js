import { Meteor } from 'meteor/meteor';
import { Content } from '../../api/content/content.js';

Meteor.startup(() => {
  if (Content.find().count() === 0) {
    console.log('Re-populating content database...'); // eslint-disable-line no-console
    Content.insert({ title: 'Announcement', body: '' });
  }
});
