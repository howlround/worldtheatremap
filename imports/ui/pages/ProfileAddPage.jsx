import React from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import Profile from '../components/Profile.jsx';
import ProfileAdd from '../components/ProfileAdd.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';


export default class ProfileAddPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { add, user } = this.props;

    const pageClass = classnames({
      'page': true,
      'profiles-add': true,
    });

    if (add && user) {
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
            <Message title="Access denied" subtitle="Sign in or register to participate in the World Theatre Map"/>
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
  user: React.PropTypes.object,
};

ProfileAddPage.contextTypes = {
  router: React.PropTypes.object,
};
