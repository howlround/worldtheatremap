import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import ProfileAddContainer from '../../ui/containers/ProfileAddContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
import AuthSignInPage from '../../ui/pages/AuthSignInPage.jsx';
import AuthJoinPage from '../../ui/pages/AuthJoinPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lists/:id" component={ListContainer}/>
      <Route path="profiles/add" component={ProfileAddContainer}/>
      <Route path="profiles/:id" component={ProfileContainer}/>
      <Route path="signin" component={AuthSignInPage}/>
      <Route path="join" component={AuthJoinPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
