// Utilities
import Helmet from 'react-helmet';
import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

// Components
import Modal from '../components/Modal.jsx';
import AuthResetPassword from '../components/AuthResetPassword.jsx';

const AuthResetPasswordPage = (props) => {
  const { formatMessage } = props.intl;
  const { token } = props.params;

  const messages = defineMessages({
    resetTitle: {
      id: 'auth.resetTitle',
      defaultMessage: 'Change Password',
    },
    resetText: {
      id: 'auth.resetText',
      defaultMessage: 'Click on the link in your email to reset your password.',
    }
  });

  const resetTitle = formatMessage(messages.resetTitle);

  return (
    <div className="overlay-wrapper">
      <Modal />
      <div className="page auth">
        <div className="page-content">
          <Helmet title={resetTitle} />
          {token ?
            <AuthResetPassword token={token} />
            : <h3>{formatMessage(messages.resetText)}</h3>
          }
        </div>
      </div>
    </div>
  );
};

AuthResetPasswordPage.propTypes = {
  intl: intlShape.isRequired,
  params: React.PropTypes.object,
};

AuthResetPasswordPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthResetPasswordPage);
