import React from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { intlShape, injectIntl } from 'react-intl';

// Pages
import NotFoundPage from '../pages/NotFoundPage.jsx';

// Components
import Profile from '../components/Profile.jsx';
import ProfileAdd from '../components/ProfileAdd.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import Loading from '../components/Loading.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';

class ProfileAddPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { add, loading, user } = this.props;

    const pageClass = classnames({
      'page': true,
      'profiles-add': true,
    });

    if (loading) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <Loading key="loading" />
        </div>
      );
    } else if (add && user) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className={pageClass}>
            <Helmet title="Add Profile" />
            <span
              className="overlay-close"
              onClick={this.context.router.goBack}
              title="Back"
            >
              &times;
            </span>
            <ProfileAdd />
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className="page auth">
            <AccessDeniedMessage />
            <div className="page-content">
              <Helmet title="Sign in to add a profile" />
              <AuthSignIn />
            </div>
          </div>
        </div>
      );
    }
  }
}

ProfileAddPage.propTypes = {
  add: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  user: React.PropTypes.object,
  intl: intlShape.isRequired,
};

ProfileAddPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ProfileAddPage);
