import { Meteor } from 'meteor/meteor';
import React from 'react';
import AuthSignIn from '../components/AuthSignIn.jsx';
import { Link } from 'react-router';

export default class AuthSignInPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page auth">
        <AuthSignIn/>
      </div>
    );
  }
}

AuthSignInPage.contextTypes = {
  router: React.PropTypes.object,
};
