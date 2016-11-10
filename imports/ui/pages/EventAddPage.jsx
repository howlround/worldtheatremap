// Utilities
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';

// Components
import Event from '../components/Event.jsx';
import EventAdd from '../components/EventAdd.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';
import ShowAdd from '../components/ShowAdd.jsx';

export default class EventAddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayNewShowForm: false,
      newShow: {
        name: '',
      },
    }

    this.newShowCallback = this.newShowCallback.bind(this);
    this.displayNewShowForm = this.displayNewShowForm.bind(this);
  }

  newShowCallback(newShow) {
    this.setState({
      newShow,
    });
    this.displayNewShowForm({ displayNewShowForm: false });
  }

  displayNewShowForm(value) {
    this.setState({ displayNewShowForm: !!value.display });

    // This should display it and also handle the default value
    // Should be able to take newShow as an argument somehow
    if (value.newShow) {
      this.setState({ newShow: value.newShow });
    }
  }

  render() {
    const { loading, add, user } = this.props;
    const { displayNewShowForm, newShow } = this.state;

    const pageClass = classnames({
      'page': true,
      'events-add': true,
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
            <Helmet title="Add Event" titleTemplate="%s | World Theatre Map" />
            <EventAdd displayNewShowForm={this.displayNewShowForm} showObject={newShow} />
          </div>

          {displayNewShowForm ?
            <div className="overlay-wrapper">
              <Modal/>
              <div className="page nested-overlay-page">
                <div className="nested-overlay-page-content">
                  <span
                    className="overlay-close"
                    onClick={this.displayNewShowForm.bind(this, { displayNewShowForm: false })}
                    title="Cancel Add Show"
                  >
                    &times;
                  </span>
                  <ShowAdd defaultName={newShow.name} showCallback={this.newShowCallback} />
                  <span
                    className="cancel-text"
                    onClick={this.displayNewShowForm.bind(this, { displayNewShowForm: false })}
                    title="Cancel Add Show"
                  >
                    Never mind, I don't want to add a new show
                  </span>
                </div>
              </div>
            </div>
          : ''}
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
              <Helmet title="Sign in to add an event" />
              <AuthSignIn/>
            </div>
          </div>
        </div>
      );
    }
  }
}

EventAddPage.propTypes = {
  add: React.PropTypes.bool,
  loading: React.PropTypes.bool,
};
