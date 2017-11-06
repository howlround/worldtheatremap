import { Meteor } from 'meteor/meteor';
import React from 'react';

// Utilities
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { OutboundLink } from 'react-ga';

// Components
import Event from '../components/Event.jsx';
import EventEdit from '../components/EventEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

// API
import {
  requestRemoval,
  denyRemoval,
  remove,
} from '../../api/events/methods.js';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: this.props.editing ? this.props.event._id : null
    };

    this.throttledRemove = _.throttle(eventId => {
      if (eventId) {
        requestRemoval.call({
          eventId,
        }, displayError);

        return true;
      }
    }, 300);

    this.confirmRequestRemoval = this.confirmRequestRemoval.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.denyDelete = this.denyDelete.bind(this);
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

  confirmRequestRemoval(_id) {
    const { locale, formatMessage } = this.props.intl;

    const messages = defineMessages({
      deleteConfirmText: {
        'id': 'ui.deleteConfirmText',
        'defaultMessage': 'Are you sure you want to delete this content? This action can not be undone.',
        'description': 'Text confirming deleting content',
      },
    });

    const deleteConfirmText = formatMessage(messages.deleteConfirmText);

    const confirm = window.confirm(deleteConfirmText);
    if (confirm === true) {
      this.throttledRemove(_id);
    }
  }

  confirmDelete(_id) {
    const { locale, formatMessage } = this.props.intl;

    const messages = defineMessages({
      deleteConfirmText: {
        'id': 'ui.deleteConfirmText',
        'defaultMessage': 'Are you sure you want to delete this content? This action can not be undone.',
        'description': 'Text confirming deleting content',
      },
    });

    const deleteConfirmText = formatMessage(messages.deleteConfirmText);

    const confirm = window.confirm(deleteConfirmText);
    if (confirm === true) {
      remove.call({
        eventId: _id,
      }, displayError);

      this.context.router.push(`/${locale}`);
    }
  }

  denyDelete(_id) {
    const { locale, formatMessage } = this.props.intl;

    const messages = defineMessages({
      denyDeleteConfirmText: {
        'id': 'ui.denyDeleteConfirmText',
        'defaultMessage': 'Deny the delete request. The content will remain in the system.',
        'description': 'Text confirming deleting content',
      },
    });

    const denyDeleteConfirmText = formatMessage(messages.denyDeleteConfirmText);

    const confirm = window.confirm(denyDeleteConfirmText);
    if (confirm === true) {
      denyRemoval.call({
        eventId: _id,
      }, displayError);
    }
  }

  render() {
    // const { event, eventExists, loading } = this.props;
    const { loading, event, user, participantsByEvent, loadingFullApp } = this.props;
    const { formatMessage, locale } = this.props.intl;
    const { editing } = this.state;
    const baseUrl = Meteor.absoluteUrl(false, { secure: true });

    const eventPageClass = classnames({
      'page': true,
      'events-show': true,
      editing,
    });

    const messages = defineMessages({
      siteName: {
        'id': 'navigation.siteName',
        'defaultMessage': 'World Theatre Map',
        'description': 'Site name',
      },
    });

    const siteName = formatMessage(messages.siteName);

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
            <Link
              to={`/${locale}/events/${ event._id }`}
              title='Back'
              className="overlay-close"
            >
              &times;
            </Link>
            <EventEdit
              event={event}
              onEditingChange={this.onEditingChange}
              loadingFullApp={loadingFullApp}
            />
          </div>
        </div>
      );
    }
    else if (editing) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className="page auth">
            <AccessDeniedMessage />
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
              { property: 'og:title', content: `${event.organizations.name} — ${event.show.name} | ${siteName}` },
              { property: 'twitter:title', content: `${event.organizations.name} — ${event.show.name} | ${siteName}` },
              { property: 'og:type', content: 'article' },
              { property: 'og:url', content: `${baseUrl}${locale}/events/${event._id}` },
            ]}
          />
          <div className="page-actions">
            <div className="page-actions-edit">
              <Link
                to={`/${locale}/events/${ event._id }/edit`}
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
              { user && !event.requestRemoval ?
                <a
                  href="#"
                  title={`Delete ${event.name}`}
                  className="page-delete-link"
                  onClick={this.confirmRequestRemoval.bind(this, event._id)}
                >
                  <FormattedMessage
                    id="ui.pageDelete"
                    description="Page delete link"
                    defaultMessage="Delete"
                  />
                </a>
                : ''
              }
              { user && event.requestRemoval ?
                <FormattedMessage
                  id="ui.pageDeleteRequested"
                  description="Page delete requested message"
                  defaultMessage="Delete request received"
                />
                : ''
              }
              { (event.requestRemoval && Roles.userIsInRole(Meteor.userId(), ['admin'])) ?
                <div className="admin-actions">
                  <a
                    href="#"
                    title={`Permenantly delete ${event.name}`}
                    className="page-confirm-removal-link"
                    onClick={this.confirmDelete.bind(this, event._id)}
                  >
                    <FormattedMessage
                      id="ui.pageConfirmDelete"
                      description="Page confirm delete link"
                      defaultMessage="Confirm Removal"
                    />
                  </a>
                  <a
                    href="#"
                    title={`Deny removal of ${event.name}`}
                    className="page-deny-removal-link"
                    onClick={this.denyDelete.bind(this, event._id)}
                  >
                    <FormattedMessage
                      id="ui.pageDenyDelete"
                      description="Page deny removal link"
                      defaultMessage="Deny Removal"
                    />
                  </a>
                </div>
                : ''
              }
            </div>

            <div className="page-actions-share">
              <OutboundLink
                eventLabel="twitter-share"
                to={`https://twitter.com/intent/tweet?text=${event.organizations.name} — ${event.show.name} — ${siteName} ${baseUrl}${locale}/events/${event._id} @HowlRound`}
                className="twitter-share"
              >
                <FormattedMessage
                  id="pageActions.tweet"
                  description="Twitter Share Text"
                  defaultMessage="Tweet"
                />
              </OutboundLink>
              <OutboundLink
                eventLabel="facebook-share"
                to={`https://www.facebook.com/dialog/share?app_id=662843947226126&display=popup&href=${baseUrl}${locale}/events/${event._id}&redirect_uri=${baseUrl}${locale}/events/${event._id}`}
                className="facebook-share"
              >
                <FormattedMessage
                  id="pageActions.share"
                  description="Facebook Share Text"
                  defaultMessage="Share"
                />
              </OutboundLink>
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
  intl: intlShape.isRequired,
};

EventPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventPage);
