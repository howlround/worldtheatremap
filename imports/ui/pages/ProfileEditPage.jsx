// Utilities
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Components
import ProfileEdit from '../components/ProfileEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

class ProfileEditPage extends React.Component {
  render() {
    const { profile, user, loading } = this.props;
    const { locale } = this.props.intl;

    const profilePageClass = classnames({
      page: true,
    });

    if (loading) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <Loading key="loading" />
        </div>
      );
    } else if (!loading && !profile) {
      return (
        <NotFoundPage />
      );
    } else if (user) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className={profilePageClass}>
            <Helmet title={`Edit ${profile.name}`} />
            <Link
              to={`/${locale}/profiles/${profile._id}`}
              title="Back"
              className="overlay-close"
            >
              &times;
            </Link>
            <ProfileEdit
              profile={profile}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className="page auth">
            <AccessDeniedMessage />
            <div className="page-content">
              <Helmet title="Sign in to edit this profile" />
              <AuthSignIn />
            </div>
          </div>
        </div>
      );
    }
  }
}

ProfileEditPage.propTypes = {
  profile: React.PropTypes.object,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  shows: React.PropTypes.array,
  roles: React.PropTypes.array,
  connections: React.PropTypes.array,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileEditPage);
