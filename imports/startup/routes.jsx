import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import App from '../ui/App.jsx';
import About from '../ui/About.jsx';
import ProfileContainer from '../ui/ProfileContainer.jsx';

// https://guide.meteor.com/react.html#routing
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="profile/:id" component={ProfileContainer}/>
    </Route>
  </Router>
);
