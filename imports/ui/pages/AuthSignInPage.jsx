import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import { Link } from 'react-router';

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
