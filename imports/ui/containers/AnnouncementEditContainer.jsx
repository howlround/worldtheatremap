import { Meteor } from 'meteor/meteor';
import { Content } from '../../api/content/content.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { TAPi18n } from 'meteor/tap:i18n';

import ContentEditPage from '../pages/ContentEditPage.jsx';

const AnnouncementEditContainer = createContainer(() => {
  const singleContentSubscription = TAPi18n.subscribe('content.singleByTitle', 'Announcement');
  const content = Content.findOne({ title: 'Announcement' });
  const loading = !(singleContentSubscription.ready());
  const access = Roles.userIsInRole(Meteor.userId(), ['admin']);

  return {
    loading,
    content,
    access,
  };
}, ContentEditPage);

export default AnnouncementEditContainer;
