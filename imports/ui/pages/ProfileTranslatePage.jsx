import React from 'react';
import classnames from 'classnames';

import ProfileTranslateSource from '../components/ProfileTranslateSource.jsx';
import ProfileTranslateTarget from '../components/ProfileTranslateTarget.jsx';

import NotFoundPage from '../pages/NotFoundPage.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';

export default class ProfileTranslatePage extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;

    TAPi18n.setLanguage(locale);
  }
  componentWillReceiveProps(nextProps) {
    const { profile, user, loading, locale } = nextProps;

    if (!nextProps.loading && nextProps.locale !== 'es') {
      if (profile) {
        this.context.router.push(`/profiles/${ profile._id }`);
      }
      else {
        this.context.router.push('/');
      }
    }

    this.switchToTarget = this.switchToTarget.bind(this);
    this.switchToSource = this.switchToSource.bind(this);
  }

  switchToTarget() {
    const { locale } = this.props;

    TAPi18n.setLanguage(locale);
  }

  switchToSource() {
    TAPi18n.setLanguage('en');
  }

  render() {
    const { profile, user, loading, locale } = this.props;
    const currentLanguage = TAPi18n.getLanguage();
    const targetLangInfo = TAPi18n.getLanguages()[locale];

    const profilePageClass = classnames({
      page: true,
      'translation-page': true,
    });

    const sourceClassNames = classnames({
      'translation-source': true,
      'active-pane': currentLanguage === 'en',
      'passive-pane': currentLanguage !== 'en',
    });

    const targetClassNames = classnames({
      'translation-target': true,
      'active-pane': currentLanguage !== 'en',
      'passive-pane': currentLanguage === 'en',
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
            <Link
              to={`/profiles/${profile._id}`}
              title="Back"
              className="overlay-close"
            >
              &times;
            </Link>
            <div className={sourceClassNames} onClick={this.switchToSource}>
              <h2>English (for reference)</h2>
              <ProfileTranslateSource
                profile={profile}
              />
            </div>
            <div className={targetClassNames} onClick={this.switchToTarget}>
              <h2>{targetLangInfo.name}</h2>
              <ProfileTranslateTarget
                profile={profile}
              />
            </div>
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
  locale: React.PropTypes.string,
};

ProfileTranslatePage.contextTypes = {
  router: React.PropTypes.object,
};
