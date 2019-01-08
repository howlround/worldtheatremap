// Utilities
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';

// Components
import ShowAdd from '../components/ShowAdd.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthHowlRound from '../components/AuthHowlRound.jsx';
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
            <Helmet title="Add Show" />
            <span
              className="overlay-close"
              onClick={this.context.router.goBack}
              title="Back"
            >
              &times;
            </span>
            <ShowAdd />
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
              <Helmet title="Sign in to add a show" />
              <AuthHowlRound />
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

ShowAddPage.contextTypes = {
  router: React.PropTypes.object,
};
