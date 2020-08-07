import { Meteor } from 'meteor/meteor';
import ReactGA from 'react-ga';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

// Layout
import App from '../layouts/App.jsx';

// API
import { Content } from '../../api/content/content.js';

const AppContainer = createContainer(() => {
  const supportedLanguages = TAPi18n.getLanguages();
  // Disable all logged in functionality
  // const user = Meteor.user();
  const user = null;
  // announcementSubscription
  TAPi18n.subscribe('content.singleByTitle', 'Announcement');
  const announcement = Content.findOne({
    title: 'Announcement',
    body: {
      $ne: null,
    },
  });

  if (user) {
    Session.set('userId', user.profile.email);
    ReactGA.ga('set', 'dimension1', true);
  } else {
    Session.set('userId', false);
    ReactGA.ga('set', 'dimension1', false);
  }

  return {
    user,
    announcement,
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    supportedLanguages,
  };
}, App);

export default AppContainer;
