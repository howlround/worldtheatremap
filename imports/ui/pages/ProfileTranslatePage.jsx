import React from 'react';
import classnames from 'classnames';

import ProfileTranslateSource from '../components/ProfileTranslateSource.jsx';
import ProfileTranslateTarget from '../components/ProfileTranslateTarget.jsx';

import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';

export default class ProfileTranslatePage extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { profile, user, loading, lang } = nextProps;

    if (!nextProps.loading && nextProps.lang !== 'es') {
      if (profile) {
        this.context.router.push(`/profiles/${ profile._id }`);
      }
      else {
        this.context.router.push('/');
      }
    }
  }

  render() {
    const { profile, user, loading, lang } = this.props;

    const profilePageClass = classnames({
      page: true,
      'translation-page': true,
    });

    if (loading) {
      return (
        <Loading key="loading" />
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
            <div className="translation-source">
              <h2>English</h2>
              <ProfileTranslateSource
                profile={profile}
              />
            </div>
            <div className="translation-target">
              <h2>Spanish</h2>
              <ProfileTranslateTarget
                profile={profile}
              />
            </div>
          </div>
          <Link
            to={`/profiles/${profile._id}`}
            title="Back"
            className="overlay-close"
          >
            &times;
          </Link>
        </div>
      );
    } else {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className="page auth">
            <Message
              title="Access denied"
              subtitle="Sign in or register to participate in the World Theatre Map"
            />
            <div className="page-content">
              <AuthSignIn />
            </div>
          </div>
        </div>
      );
    }
  }
}

ProfileTranslatePage.propTypes = {
  profile: React.PropTypes.object,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  shows: React.PropTypes.array,
  roles: React.PropTypes.array,
  connections: React.PropTypes.array,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
};

ProfileTranslatePage.contextTypes = {
  router: React.PropTypes.object,
};