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
  // let loadingFullApp = false;
  // const triggerFullAppDataLoad = () => console.log('fake trigger');

  // Set up fake subscriptions so that we can trigger them later
  let profilesSubscribe = {
    ready: () => false,
  }
  let showsSubscribe = {
    ready: () => false,
  }

  // This shouldn't be a function. Maybe just copy the subscribes around to each other container then find a way to set a high level prop
  const triggerFullAppDataLoad = () => {
    // loadingFullApp = true;
    profilesSubscribe = TAPi18n.subscribe('profiles.public');
    showsSubscribe = Meteor.subscribe('shows.public');
  }

  const loadingFullApp = !(profilesSubscribe.ready() && showsSubscribe.ready());

  // Language
  // const lang = TAPi18n.getLanguage();
  const lang = window.AppState.getLocale();
  const supportedLanguages = TAPi18n.getLanguages();

  return {
    user: Meteor.user(),
    loadingFullApp,
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find().fetch(),
    shows: Shows.find().fetch(),
    lang,
    supportedLanguages,
    triggerFullAppDataLoad,
  };
}, App);

export default AppContainer;
