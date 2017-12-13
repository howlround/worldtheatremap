import { Meteor } from 'meteor/meteor';
import { render, unmountComponentAtNode } from 'react-dom';

import 'moment/locale/es';
import '/public/i18n/moment_custom/fr';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import moment from 'moment';
import ReactGA from 'react-ga';
import { addLocaleData } from 'react-intl'
import { renderRoutes, loadTranslation } from '../imports/startup/client/routes.jsx';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

import '/imports/startup/client';

addLocaleData(en);
addLocaleData(es);
addLocaleData(fr);

const initiateRender = () => {
  window.AppState = {
    container: document.getElementById('app'),

    getLocale: function() {
      return localStorage.getItem('locale') || 'en';
    },

    setLocale: function(locale) {
      localStorage.setItem('locale', locale);
      TAPi18n.setLanguage(locale);
      moment.locale(locale);
    },

    render: function() {
      const supportedLanguages = TAPi18n.getLanguages();

      // https://alicoding.com/language-code-url-in-react-intl/
      const localePath = window.location.pathname;
      const localeCode = localePath.split('/')[1];
      let localeCodeVerified = false;

      if (_.has(supportedLanguages, localeCode)) {
        localeCodeVerified = true;
        // const neutralPath = localePath.substring(localeCode.length + 1);
      }

      var locale = (localeCodeVerified === true) ? localeCode : this.getLocale();
      this.setLocale(locale);

      // Locale / Language
      ReactGA.ga('set', 'dimension2', locale);

      const messages = loadTranslation( { locale });

      render(renderRoutes({ locale, messages }), this.container);
    },

    unmount: function() {
      unmountComponentAtNode(this.container);
    },

    rerender: function() {
      this.unmount();
      this.render();
    }
  }
}

Meteor.startup(() => {
  const areIntlLocalesSupported = require('intl-locales-supported');

  const localesMyAppSupports = [
      'en',
      'es',
      'fr',
  ];

  ReactGA.initialize(Meteor.settings.public.GoogleAnalytics);
  // Locale / Language
  const locale = localStorage.getItem('locale') || 'en';
  ReactGA.ga('set', 'dimension2', locale);
  // Logged in
  ReactGA.ga('set', 'dimension1', !!Session.get('userId'));
  ReactGA.set({
    page: window.location.pathname + window.location.search,
    title: '',
    userId: Session.get('userId'),
  });
  ReactGA.pageview(window.location.pathname + window.location.search);

  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and patch the constructors we need with the polyfill's.
      var IntlPolyfill    = require('intl');
      Intl.NumberFormat   = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
    initiateRender();
    window.AppState.render();
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');

    initiateRender();
    window.AppState.render();
  }
});
