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
  });

  const resetTitle = formatMessage(messages.resetTitle);

  return (
    <div className="overlay-wrapper">
      <Modal />
      <div className="page auth">
        <div className="page-content">
          <Helmet title={resetTitle} />
          <AuthResetPassword token={token} />
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
