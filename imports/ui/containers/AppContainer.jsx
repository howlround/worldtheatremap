import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import ReactGA from 'react-ga';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

// Layout
import App from '../layouts/App.jsx';

// API
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';

const AppContainer = createContainer(() => {
  // Language
  // const lang = TAPi18n.getLanguage();
  const lang = window.AppState.getLocale();

  const supportedLanguages = TAPi18n.getLanguages();

  const user = Meteor.user();

  if (user) {
    Session.set('userId', user.emails[0].address);
    ReactGA.ga('set', 'dimension1', true);
  } else {
    Session.set('userId', false);
    ReactGA.ga('set', 'dimension1', false);
  }

  return {
    user,
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    lang,
    supportedLanguages,
  };
}, App);

export default AppContainer;
