// Utilities
import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Accounts } from 'meteor/accounts-base';

// Components
import Modal from '../components/Modal.jsx';
import AuthJoin from '../components/AuthJoin.jsx';

export default class AuthJoinPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overlay-wrapper">
        <Modal/>
        <div className="page auth">
          <div className="page-content">
            <Helmet title="Join" />
            <AuthJoin/>
          </div>
        </div>
      </div>
    );
  }
}

AuthJoinPage.contextTypes = {
  router: React.PropTypes.object,
};
