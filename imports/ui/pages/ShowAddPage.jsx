// Utilities
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';

// Components
import ShowAdd from '../components/ShowAdd.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

export default class ShowAddPage extends React.Component {
  render() {
    const { add, user, loading } = this.props;

    const pageClass = classnames({
      page: true,
      'shows-add': true,
    });

    if (loading) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <Helmet title="Add Show" />
          <Loading key="loading" />
        </div>
      );
    } else if (add && user) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className={pageClass}>
            <Helmet title="Add Show" titleTemplate="%s | World Theatre Map" />
            <ShowAdd />
          </div>
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
              <Helmet title="Sign in to add a show" />
              <AuthSignIn />
            </div>
          </div>
        </div>
      );
    }
  }
}

ShowAddPage.propTypes = {
  user: React.PropTypes.object,
  add: React.PropTypes.bool,
  loading: React.PropTypes.bool,
};
