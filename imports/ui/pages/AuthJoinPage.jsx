// Utilities
import React from 'react';
import Helmet from 'react-helmet';
import { Accounts } from 'meteor/accounts-base';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Components
import Modal from '../components/Modal.jsx';
import AuthJoin from '../components/AuthJoin.jsx';

class AuthJoinPage extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;

    const joinTitle = formatMessage({
      'id': 'auth.joinTitle',
      'defaultMessage': 'Join',
      'description': 'Title for the Join screen',
    });

    return (
      <div className="overlay-wrapper">
        <Modal/>
        <div className="page auth">
          <div className="page-content">
            <Helmet title={joinTitle} />
            <AuthJoin />
          </div>
        </div>
      </div>
    );
  }
}

AuthJoinPage.propTypes = {
  intl: intlShape.isRequired,
};

AuthJoinPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthJoinPage);
