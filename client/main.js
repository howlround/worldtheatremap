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
  // All modern browsers, except `Safari`, have implemented
  // the `ECMAScript Internationalization API`.
  // For that we need to patch in on runtime.
  if (!global.Intl) {
    require.ensure(['intl'], require => {
      require('intl').default
      initiateRender();
      window.AppState.render();
    }, 'IntlBundle');
  } else {
    initiateRender();
    window.AppState.render();
  }
});
