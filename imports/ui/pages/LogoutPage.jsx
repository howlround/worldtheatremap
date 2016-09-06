import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Meteor.logout();

    this.context.router.push({
      pathname: '/'
    });
  }

  render() {
    return null;
  }
}

LogoutPage.contextTypes = {
  router: React.PropTypes.object,
};
