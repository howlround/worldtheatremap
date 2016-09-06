import React from 'react';
import { Router, Route, IndexRedirect, browserHistory, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { stringify, parse } from 'qs'

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import ShowAddContainer from '../../ui/containers/ShowAddContainer.jsx';
import ShowContainer from '../../ui/containers/ShowContainer.jsx';
import ShowEditContainer from '../../ui/containers/ShowEditContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
import ProfileAddContainer from '../../ui/containers/ProfileAddContainer.jsx';
import ProfileEditContainer from '../../ui/containers/ProfileEditContainer.jsx';
import EventContainer from '../../ui/containers/EventContainer.jsx';
import EventAddContainer from '../../ui/containers/EventAddContainer.jsx';
import EventEditContainer from '../../ui/containers/EventEditContainer.jsx';
import AuthSignInPage from '../../ui/pages/AuthSignInPage.jsx';
import AuthJoinPage from '../../ui/pages/AuthJoinPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import SearchProfilesContainer from '../../ui/containers/SearchProfilesContainer.jsx';
import SearchEventsContainer from '../../ui/containers/SearchEventsContainer.jsx';

// Use this to handle arrays in the query params
// https://github.com/reactjs/react-router/issues/939#issuecomment-215988002
const stringifyQuery = query => stringify(query, { arrayFormat: 'brackets', encode: false})
const customHistory = useRouterHistory(createBrowserHistory)({ parseQueryString: parse, stringifyQuery })

export const renderRoutes = () => (
  <Router history={customHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="profiles">
        <IndexRedirect to="add"/>
        <Route path="add" component={ProfileAddContainer}/>
        <Route path=":id" component={ProfileContainer}/>
        <Route path=":id/edit" component={ProfileEditContainer}/>
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
      <Route path="search">
        <IndexRedirect to="profiles"/>
        <Route path="profiles" component={SearchProfilesContainer}/>
        <Route path="events" component={SearchEventsContainer}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
