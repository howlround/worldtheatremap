import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import { renderRoutes } from '../imports/startup/routes.jsx';

// import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  // render(<App />, document.getElementById('render-target'));
  render(renderRoutes(), document.getElementById('render-target'));
});
