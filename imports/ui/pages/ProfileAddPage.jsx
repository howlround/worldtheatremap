import React from 'react';
import classnames from 'classnames';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import Profile from '../components/Profile.jsx';
import ProfileAdd from '../components/ProfileAdd.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthPageSignIn from '../pages/AuthPageSignIn.jsx';


export default class ProfilePage extends React.Component {
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
          <Modal/>
          <div className={pageClass}>
            <ProfileAdd/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="page">
          <Message title="Access denied" subtitle="You must sign in or reigster to add content."/>
          <AuthPageSignIn/>
        </div>
      );
    }
  }
}

ProfilePage.propTypes = {
  add: React.PropTypes.bool,
  user: React.PropTypes.object,
};
