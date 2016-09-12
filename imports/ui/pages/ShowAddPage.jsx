import React from 'react';
import classnames from 'classnames';
import Show from '../components/Show.jsx';
import ShowAdd from '../components/ShowAdd.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

export default class ShowAddPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { add, user, loading } = this.props;

    const pageClass = classnames({
      'page': true,
      'shows-add': true,
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
          <Modal/>
          <div className={pageClass}>
            <ShowAdd/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className="page auth">
            <Message title="Access denied" subtitle="Sign in or register to participate in the World Theatre Map"/>
            <div className="page-content">
              <AuthSignIn/>
            </div>
          </div>
        </div>
      );
    }
  }
}

ShowAddPage.propTypes = {
  add: React.PropTypes.bool,
  loading: React.PropTypes.bool,
};
