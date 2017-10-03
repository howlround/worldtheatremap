// Utilities
import React from 'react';
import Helmet from 'react-helmet';
import { Accounts } from 'meteor/accounts-base';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Components
import Modal from '../components/Modal.jsx';
import AuthJoin from '../components/AuthJoin.jsx';
import Loading from '../components/Loading.jsx';

class AuthJoinPage extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { loading } = this.props;

    const messages = defineMessages({
      joinTitle: {
        'id': 'auth.joinTitle',
        'defaultMessage': 'Join',
        'description': 'Title for the Join screen',
      },
    });

    const joinTitle = formatMessage(messages.joinTitle);

    if (loading) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <Loading key="loading" />
        </div>
      );
    } else {
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
}

AuthJoinPage.propTypes = {
  intl: intlShape.isRequired,
  loading: React.PropTypes.bool,
};

AuthJoinPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthJoinPage);
