import React from 'react';
import classnames from 'classnames';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import Show from '../components/Show.jsx';
import ShowEdit from '../components/ShowEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import { Link } from 'react-router';

export default class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.editing ? this.props.show._id : null
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  render() {
    // const { show, showExists, loading } = this.props;
    const { show, user, eventsByShow } = this.props;
    const { editing } = this.state;

    const showPageClass = classnames({
      'page': true,
      'shows-show': true,
      editing,
    });

    if (!show) {
      return (
        <NotFoundPage/>
      );
    }
    else if (editing && user) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className={showPageClass}>
            <ShowEdit
              show={show}
              onEditingChange={this.onEditingChange}
            />
          </div>
          <Link
            to={`/shows/${ show._id }`}
            title='Back'
            className="overlay-close"
          >
            &times;
          </Link>
        </div>
      );
    }
    else if (editing) {
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
      )
    }
    else {
      return (
        <div className={showPageClass}>
          <Show
            show={show}
            eventsByShow={eventsByShow}
            user={user}
            onEditingChange={this.onEditingChange}
          />
        </div>
      );
    }
  }
}

ShowPage.propTypes = {
  show: React.PropTypes.object,
  eventsByShow: React.PropTypes.array,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  // loading: React.PropTypes.bool,
  // showExists: React.PropTypes.bool,
};
