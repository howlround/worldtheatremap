// Utilities
import Helmet from 'react-helmet';
import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

// Components
import Modal from '../components/Modal.jsx';
import AuthHowlRound from '../components/AuthHowlRound.jsx';

const AuthRecoverPage = (props) => {
  const { formatMessage } = props.intl;

  const messages = defineMessages({
    recoverTitle: {
      id: 'auth.recoverTitle',
      defaultMessage: 'Recover Password',
    },
  });

  const recoverTitle = formatMessage(messages.recoverTitle);

  return (
    <div className="overlay-wrapper">
      <Modal />
      <div className="page auth">
        <div className="page-content">
          <Helmet title={recoverTitle} />
          <AuthHowlRound />
        </div>
      </div>
    </div>
  );
};

AuthRecoverPage.propTypes = {
  intl: intlShape.isRequired,
};

AuthRecoverPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthRecoverPage);
