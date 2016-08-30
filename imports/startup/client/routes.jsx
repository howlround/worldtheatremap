import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

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
// import SearchParent from '../../ui/pages/SearchParent.jsx';
import SearchProfilesContainer from '../../ui/containers/SearchProfilesContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="profiles/add" component={ProfileAddContainer}/>
      <Route path="profiles/:id" component={ProfileContainer}/>
      <Route path="profiles/:id/edit" component={ProfileEditContainer}/>
      <Route path="shows/add" component={ShowAddContainer}/>
      <Route path="shows/:id" component={ShowContainer}/>
      <Route path="shows/:id/edit" component={ShowEditContainer}/>
      <Route path="events/add" component={EventAddContainer}/>
      <Route path="events/:id" component={EventContainer}/>
      <Route path="events/:id/edit" component={EventEditContainer}/>
      <Route path="signin" component={AuthSignInPage}/>
      <Route path="join" component={AuthJoinPage}/>
      {/* <Route path="search" component={SearchParent}/> */}
      <Route path="search/profiles" component={SearchProfilesContainer}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
