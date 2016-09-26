import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';
import moment from 'moment';

const AppContainer = createContainer(() => {
  // Language
  // const lang = TAPi18n.getLanguage();
  const lang = window.AppState.getLocale();
  const supportedLanguages = TAPi18n.getLanguages();

  return {
    user: Meteor.user(),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    lang,
    supportedLanguages,
  };
}, App);

export default AppContainer;
