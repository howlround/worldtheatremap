import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { Router, Route, IndexRedirect, browserHistory, useRouterHistory } from 'react-router';
import { Session } from 'meteor/session';
import { stringify, parse } from 'qs'

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import LangaugeRedirect from '../../ui/pages/LangaugeRedirect.jsx';
import ShowAddContainer from '../../ui/containers/ShowAddContainer.jsx';
import ShowContainer from '../../ui/containers/ShowContainer.jsx';
import ShowEditContainer from '../../ui/containers/ShowEditContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
import ProfileAddContainer from '../../ui/containers/ProfileAddContainer.jsx';
import ProfileEditContainer from '../../ui/containers/ProfileEditContainer.jsx';
import ProfileTranslateContainer from '../../ui/containers/ProfileTranslateContainer.jsx';
import EventContainer from '../../ui/containers/EventContainer.jsx';
import EventAddContainer from '../../ui/containers/EventAddContainer.jsx';
import EventEditContainer from '../../ui/containers/EventEditContainer.jsx';
import AuthSignInPage from '../../ui/pages/AuthSignInPage.jsx';
import AuthJoinPage from '../../ui/pages/AuthJoinPage.jsx';
import LogoutPage from '../../ui/pages/LogoutPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import SearchProfilesContainer from '../../ui/containers/SearchProfilesContainer.jsx';
import SearchEventsContainer from '../../ui/containers/SearchEventsContainer.jsx';
import SearchShowsContainer from '../../ui/containers/SearchShowsContainer.jsx';

// Use this to handle arrays in the query params
// https://github.com/reactjs/react-router/issues/939#issuecomment-215988002
const stringifyQuery = query => stringify(query, { arrayFormat: 'brackets', encode: false});
const customHistory = useRouterHistory(createBrowserHistory)({ parseQueryString: parse, stringifyQuery });

customHistory.listen(location => {
  ReactGA.set({
    page: location.pathname + location.search,
    title: '',
    userId: Session.get('userId'),
  });
  ReactGA.pageview(location.pathname + location.search);
});

export const loadTranslation = ({ locale }) => {
  let messages = {};
  if (locale === 'es') {
    messages = require("/i18n/es.json");
  }

  return messages;
};

export const renderRoutes = ({ locale, messages }) => (
  <IntlProvider locale={locale} key={locale} messages={messages}>
    <Router history={customHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="en" component={LangaugeRedirect} />
        <Route path="es" component={LangaugeRedirect} />
        <Route path="profiles">
          <IndexRedirect to="add"/>
          <Route path="add" component={ProfileAddContainer}/>
          <Route path=":id" component={ProfileContainer}/>
          <Route path=":id/edit" component={ProfileEditContainer}/>
          <Route path=":id/translate">
            <IndexRedirect to="es"/>
            <Route path=":lang" component={ProfileTranslateContainer}/>
          </Route>
        </Route>
        <Route path="shows">
          <IndexRedirect to="add"/>
          <Route path="add" component={ShowAddContainer}/>
          <Route path=":id" component={ShowContainer}/>
          <Route path=":id/edit" component={ShowEditContainer}/>
        </Route>
        <Route path="events">
          <IndexRedirect to="add"/>
          <Route path="add" component={EventAddContainer}/>
          <Route path=":id" component={EventContainer}/>
          <Route path=":id/edit" component={EventEditContainer}/>
        </Route>
        <Route path="signin" component={AuthSignInPage}/>
        <Route path="join" component={AuthJoinPage}/>
        <Route path="logout" component={LogoutPage}/>
        <Route path="search">
          <IndexRedirect to="profiles"/>
          <Route path="profiles" component={SearchProfilesContainer}/>
          <Route path="events" component={SearchEventsContainer}/>
          <Route path="shows" component={SearchShowsContainer}/>
        </Route>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Router>
  </IntlProvider>
);
