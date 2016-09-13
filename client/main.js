import { Meteor } from 'meteor/meteor';
import { render, unmountComponentAtNode } from 'react-dom';

import { TAPi18n } from 'meteor/tap:i18n';
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'

import { renderRoutes, loadTranslation } from '../imports/startup/client/routes.jsx';
import '/imports/startup/client';

addLocaleData(en);
addLocaleData(es);

const initiateRender = () => {
  window.AppState = {
    container: document.getElementById('app'),

    getLocale: function() {
      return localStorage.getItem('locale') || 'en';
    },

    setLocale: function(lang) {
      localStorage.setItem('locale', lang);
      // TAPi18n.setLanguage(lang);
    },

    render: function() {
      var locale = this.getLocale();
      TAPi18n.setLanguage(locale);

      const messages = loadTranslation( { locale });
      render(renderRoutes({ locale, messages }), this.container)
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
      'es'
  ];

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
