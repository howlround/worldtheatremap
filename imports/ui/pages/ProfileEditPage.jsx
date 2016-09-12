import React from 'react';
import classnames from 'classnames';
import ProfileEdit from '../components/ProfileEdit.jsx';

import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';

export default class ModalPage extends React.Component {
  render() {
    const { profile, user, loading } = this.props;

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
            <ProfileEdit
              profile={profile}
            />
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

ModalPage.propTypes = {
  profile: React.PropTypes.object,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  shows: React.PropTypes.array,
  roles: React.PropTypes.array,
  connections: React.PropTypes.array,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
};
