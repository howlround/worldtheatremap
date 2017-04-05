import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Content } from '../../api/content/content.js';
import { createContainer } from 'meteor/react-meteor-data';
import ContentEditPage from '../pages/ContentEditPage.jsx';

const AnnouncementEditContainer = createContainer(() => {
  const singleContentSubscription = TAPi18n.subscribe('content.singleByTitle', 'Announcement');
  const content = Content.findOne({ title: 'Announcement' });
  const loading = !(singleContentSubscription.ready());
  const contentExists = !loading && !!content;
  return {
    loading,
    content,
  };
}, ContentEditPage);

export default AnnouncementEditContainer;
