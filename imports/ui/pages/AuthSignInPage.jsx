// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

// Components
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';

export default class AuthSignInPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overlay-wrapper">
        <Modal/>
        <div className="page auth">
          <div className="page-content">
            <Helmet title="Sign In" />
            <AuthSignIn/>
          </div>
        </div>
      </div>
    );
  }
}

AuthSignInPage.contextTypes = {
  router: React.PropTypes.object,
};
