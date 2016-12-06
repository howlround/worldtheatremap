// Utilities
import { Meteor } from 'meteor/meteor';
import Helmet from 'react-helmet';
import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Components
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';

class AuthSignInPage extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;

    const signInTitle = formatMessage({
      'id': 'auth.signInTitle',
      'defaultMessage': 'Sign In',
      'description': 'Title for the Sign In screen',
    });

    return (
      <div className="overlay-wrapper">
        <Modal/>
        <div className="page auth">
          <div className="page-content">
            <Helmet title={signInTitle} />
            <AuthSignIn/>
          </div>
        </div>
      </div>
    );
  }
}

AuthSignInPage.propTypes = {
  intl: intlShape.isRequired,
};

AuthSignInPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthSignInPage);
