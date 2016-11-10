// Utilities
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

// Components
import Show from '../components/Show.jsx';
import ShowEdit from '../components/ShowEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

export default class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.editing ? this.props.show._id : null
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editing !== nextProps.editing) {
      this.setState({
        editing: nextProps.editing,
      });
    }
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  render() {
    // const { show, showExists, loading } = this.props;
    const { loading, show, user, eventsByShow } = this.props;
    const { editing } = this.state;

    const showPageClass = classnames({
      'page': true,
      'shows-show': true,
      editing,
    });

    if (loading) {
      return (
        <Loading key="loading" />
      );
    } else if (!show) {
      return (
        <NotFoundPage/>
      );
    } else if (editing && user) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className={showPageClass}>
            <Helmet title={`Edit ${show.name}`} />
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
              <Helmet title="Sign in to edit this show" />
              <AuthSignIn/>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className={showPageClass}>
          <Helmet title={show.name} />
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
  loading: React.PropTypes.bool,
  showExists: React.PropTypes.bool,
};
