// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Components
import Event from '../components/Event.jsx';
import EventEdit from '../components/EventEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

export default class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.editing ? this.props.event._id : null
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editing !== nextProps.editing) {
      this.setState({
        editing: nextProps.editing,
      });
    }
  }

  render() {
    // const { event, eventExists, loading } = this.props;
    const { loading, event, user, participantsByEvent, loadingFullApp } = this.props;
    const { editing } = this.state;
    const baseUrl = Meteor.absoluteUrl(false, { secure: true });

    const eventPageClass = classnames({
      'page': true,
      'events-show': true,
      editing,
    });

    if (editing && loading) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <Loading key="loading" />
        </div>
      );
    } else if (loading) {
      return (
        <Loading key="loading" />
      );
    } else if (!event) {
      return (
        <NotFoundPage/>
      );
    }
    else if (editing && user) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className={eventPageClass}>
            <Helmet
              title={`Edit Event: ${event.organizations.name} presents ${event.show.name}`}
            />
            <EventEdit
              event={event}
              onEditingChange={this.onEditingChange}
              loadingFullApp={loadingFullApp}
            />
          </div>
          <Link
            to={`/events/${ event._id }`}
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
        <div className={eventPageClass}>
          <Helmet
            title={`${event.organizations.name} presents ${event.show.name}`}
            meta={[
              { property: 'og:title', content: `${event.organizations.name} presents ${event.show.name} | World Theatre Map` },
              { property: 'og:type', content: 'article' },
              { property: 'og:url', content: `${baseUrl}events/${event._id}` },
            ]}
          />
          <div className="page-actions">
            <Link
              to={`/events/${ event._id }/edit`}
              key={event._id}
              title={event.name}
              className="edit-link"
              activeClassName="active"
              onChange={this.onChange}
            >
              <FormattedMessage
                id="ui.pageEdit"
                description="Page edit link"
                defaultMessage="Edit details"
              />
            </Link>

            <div className="page-actions-share">
              <a
                href={`https://www.facebook.com/dialog/share?app_id=662843947226126&display=popup&href=${baseUrl}events/${event._id}&redirect_uri=${baseUrl}events/${event._id}`}
                className="facebook-share"
              >
                <FormattedMessage
                  id="pageActions.share"
                  description="Facebook Share Text"
                  defaultMessage="Share"
                />
              </a>
            </div>
          </div>
          <Event
            event={event}
            user={user}
            onEditingChange={this.onEditingChange}
            participantsByEvent={participantsByEvent}
          />
        </div>
      );
    }
  }
}

EventPage.propTypes = {
  event: React.PropTypes.object,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  participantsByEvent: React.PropTypes.array,
  loading: React.PropTypes.bool,
  loadingFullApp: React.PropTypes.bool,
  // eventExists: React.PropTypes.bool,
};
