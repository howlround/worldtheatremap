import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { Router, Route, IndexRedirect, browserHistory, useRouterHistory } from 'react-router';
import { Session } from 'meteor/session';
import { stringify, parse } from 'qs'

// route components
import AboutPage from '../../ui/pages/AboutPage.jsx';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import AuthJoinContainer from '../../ui/containers/AuthJoinContainer.jsx';
import AuthSignInPage from '../../ui/pages/AuthSignInPage.jsx';
import EventAddContainer from '../../ui/containers/EventAddContainer.jsx';
import EventContainer from '../../ui/containers/EventContainer.jsx';
import EventEditContainer from '../../ui/containers/EventEditContainer.jsx';
import LangaugeRedirect from '../../ui/pages/LangaugeRedirect.jsx';
import LogoutPage from '../../ui/pages/LogoutPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import ProfileAddContainer from '../../ui/containers/ProfileAddContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
import ProfileEditContainer from '../../ui/containers/ProfileEditContainer.jsx';
import SearchEventsContainer from '../../ui/containers/SearchEventsContainer.jsx';
import SearchProfilesContainer from '../../ui/containers/SearchProfilesContainer.jsx';
import SearchShowsContainer from '../../ui/containers/SearchShowsContainer.jsx';
import ShowAddContainer from '../../ui/containers/ShowAddContainer.jsx';
import ShowContainer from '../../ui/containers/ShowContainer.jsx';
import ShowEditContainer from '../../ui/containers/ShowEditContainer.jsx';
import TermsOfUsePage from '../../ui/pages/TermsOfUsePage.jsx';

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
      <Route path="/">
        <IndexRedirect to={`${locale}`} />
        <Route path="profiles">
          <IndexRedirect to={`/${locale}/profiles`} />
          <Route path="add">
            <IndexRedirect to={`/${locale}/profiles/add`} />
          </Route>
          <Route path=":id">
            <IndexRedirect to={`/${locale}/profiles/:id`} />
          </Route>
          <Route path=":id/edit">
            <IndexRedirect to={`/${locale}/profiles/:id/edit`} />
          </Route>
        </Route>
        <Route path="shows">
          <IndexRedirect to={`/${locale}/shows`} />
          <Route path="add">
            <IndexRedirect to={`/${locale}/shows/add`} />
          </Route>
          <Route path=":id">
            <IndexRedirect to={`/${locale}/shows/:id`} />
          </Route>
          <Route path=":id/edit">
            <IndexRedirect to={`/${locale}/shows/:id/edit`} />
          </Route>
        </Route>
        <Route path="events">
          <IndexRedirect to={`/${locale}/events`} />
          <Route path="add">
            <IndexRedirect to={`/${locale}/events/add`} />
          </Route>
          <Route path=":id">
            <IndexRedirect to={`/${locale}/events/:id`} />
          </Route>
          <Route path=":id/edit">
            <IndexRedirect to={`/${locale}/events/:id/edit`} />
          </Route>
        </Route>
        <Route path="signin">
          <IndexRedirect to={`/${locale}/signin`} />
        </Route>
        <Route path="join">
          <IndexRedirect to={`/${locale}/join`} />
        </Route>
        <Route path="about">
          <IndexRedirect to={`/${locale}/about`} />
        </Route>
        <Route path="terms-of-use">
          <IndexRedirect to={`/${locale}/terms-of-use`} />
        </Route>
        <Route path="logout" component={LogoutPage} />
        <Route path="search">
          <IndexRedirect to={`/${locale}/search/profiles`} />
          <Route path="profiles">
            <IndexRedirect to={`/${locale}/search/profiles`} />
          </Route>
          <Route path="events">
            <IndexRedirect to={`/${locale}/search/events`} />
          </Route>
          <Route path="shows">
            <IndexRedirect to={`/${locale}/search/shows`} />
          </Route>
        </Route>
      </Route>
      <Route path="/:locale" component={AppContainer}>
        <Route path="profiles">
          <IndexRedirect to="add" />
          <Route path="add" component={ProfileAddContainer} />
          <Route path=":id" component={ProfileContainer} />
          <Route path=":id/edit" component={ProfileEditContainer} />
        </Route>
        <Route path="shows">
          <IndexRedirect to="add" />
          <Route path="add" component={ShowAddContainer} />
          <Route path=":id" component={ShowContainer} />
          <Route path=":id/edit" component={ShowEditContainer} />
        </Route>
        <Route path="events">
          <IndexRedirect to="add" />
          <Route path="add" component={EventAddContainer} />
          <Route path=":id" component={EventContainer} />
          <Route path=":id/edit" component={EventEditContainer} />
        </Route>
        <Route path="signin" component={AuthSignInPage} />
        <Route path="join" component={AuthJoinContainer} />
        <Route path="about" component={AboutPage} />
        <Route path="terms-of-use" component={TermsOfUsePage} />
        <Route path="logout" component={LogoutPage} />
        <Route path="search">
          <IndexRedirect to="profiles" />
          <Route path="profiles" component={SearchProfilesContainer} />
          <Route path="events" component={SearchEventsContainer} />
          <Route path="shows" component={SearchShowsContainer} />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </IntlProvider>
);
