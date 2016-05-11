import React from 'react';
import classnames from 'classnames';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import Play from '../components/Play.jsx';
import PlayAdd from '../components/PlayAdd.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';


export default class PlayAddPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { add, user } = this.props;

    const pageClass = classnames({
      'page': true,
      'plays-add': true,
    });

    if (add && user) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className={pageClass}>
            <PlayAdd/>
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

PlayAddPage.propTypes = {
  add: React.PropTypes.bool,
  user: React.PropTypes.object,
};
