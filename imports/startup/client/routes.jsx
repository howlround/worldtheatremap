import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import ProfileAddContainer from '../../ui/containers/ProfileAddContainer.jsx';
import PlayAddContainer from '../../ui/containers/PlayAddContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
import ProfileEditContainer from '../../ui/containers/ProfileEditContainer.jsx';
import PlayContainer from '../../ui/containers/PlayContainer.jsx';
import AuthSignInPage from '../../ui/pages/AuthSignInPage.jsx';
import AuthJoinPage from '../../ui/pages/AuthJoinPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lists/:id" component={ListContainer}/>
      <Route path="profiles/add" component={ProfileAddContainer}/>
      <Route path="profiles/:id" component={ProfileContainer}/>
      <Route path="profiles/:id/edit" component={ProfileEditContainer}/>
      <Route path="plays/add" component={PlayAddContainer}/>
      <Route path="plays/:id" component={PlayContainer}/>
      <Route path="signin" component={AuthSignInPage}/>
      <Route path="join" component={AuthJoinPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
