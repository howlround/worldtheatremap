import { Meteor } from 'meteor/meteor';
import React from 'react';

// Utilities
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { OutboundLink } from 'react-ga';

// Components
import Show from '../components/Show.jsx';
import ShowEdit from '../components/ShowEdit.jsx';
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
} from '../../api/shows/methods.js';

class ShowPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: this.props.editing ? this.props.show._id : null,
    };

    this.throttledRemove = _.throttle(showId => {
      if (showId) {
        requestRemoval.call({
          showId,
        }, displayError);

        return true;
      }
    }, 300);

    this.confirmRequestRemoval = this.confirmRequestRemoval.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.denyDelete = this.denyDelete.bind(this);
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

  confirmRequestRemoval(_id) {
    const { locale, formatMessage } = this.props.intl;

    const deleteConfirmText = formatMessage({
      'id': 'ui.deleteConfirmText',
      'defaultMessage': 'Are you sure you want to delete this content? This action can not be undone.',
      'description': 'Text confirming deleting content',
    });

    const confirm = window.confirm(deleteConfirmText);
    if (confirm === true) {
      this.throttledRemove(_id);
    }
  }

  confirmDelete(_id) {
    const { locale, formatMessage } = this.props.intl;

    const deleteConfirmText = formatMessage({
      'id': 'ui.deleteConfirmText',
      'defaultMessage': 'Are you sure you want to delete this content? This action can not be undone.',
      'description': 'Text confirming deleting content',
    });

    const confirm = window.confirm(deleteConfirmText);
    if (confirm === true) {
      remove.call({
        showId: _id,
      }, displayError);

      this.context.router.push(`/${locale}`);
    }
  }

  denyDelete(_id) {
    const { locale, formatMessage } = this.props.intl;

    const denyDeleteConfirmText = formatMessage({
      'id': 'ui.denyDeleteConfirmText',
      'defaultMessage': 'Deny the delete request. The content will remain in the system.',
      'description': 'Text confirming deleting content',
    });

    const confirm = window.confirm(denyDeleteConfirmText);
    if (confirm === true) {
      denyRemoval.call({
        showId: _id,
      }, displayError);
    }
  }

  render() {
    // const { show, showExists, loading } = this.props;
    const { loading, show, user, eventsByShow } = this.props;
    const { editing } = this.state;
    const { formatMessage, locale } = this.props.intl;
    const baseUrl = Meteor.absoluteUrl(false, { secure: true });

    const showPageClass = classnames({
      page: true,
      'shows-show': true,
      editing,
    });

    const siteName = formatMessage({
      'id': 'navigation.siteName',
      'defaultMessage': 'World Theatre Map',
      'description': 'Site name',
    });

    if (loading) {
      return (
        <Loading key="loading" />
      );
    } else if (!show) {
      return (
        <NotFoundPage />
      );
    } else if (editing && user) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className={showPageClass}>
            <Helmet
              title={`Edit ${show.name}`}
              meta={[
                { property: 'og:title', content: `${show.name} | ${siteName}` },
                { property: 'twitter:title', content: `${show.name} | ${siteName}` },
                { property: 'og:type', content: 'article' },
                { property: 'og:url', content: `${baseUrl}${locale}/shows/${show._id}` },
              ]}
            />
            {show.about ?
              <Helmet
                meta={[
                  { name: 'description', content: show.about },
                  { property: 'og:description', content: show.about },
                  { property: 'twitter:description', content: show.about },
                ]}
              /> : ''
            }
            <Link
              to={`/${locale}/shows/${show._id}`}
              title="Back"
              className="overlay-close"
            >
              &times;
            </Link>
            <ShowEdit
              show={show}
              onEditingChange={this.onEditingChange}
            />
          </div>
        </div>
      );
    } else if (editing) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className="page auth">
            <AccessDeniedMessage />
            <div className="page-content">
              <Helmet title="Sign in to edit this show" />
              <AuthSignIn />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={showPageClass}>
          <Helmet
            title={show.name}
            meta={[
              { property: 'og:title', content: `${show.name} | ${siteName}` },
              { property: 'twitter:title', content: `${show.name} | ${siteName}` },
              { property: 'og:type', content: 'article' },
              { property: 'og:url', content: `${baseUrl}${locale}/shows/${show._id}` },
            ]}
          />
          {show.about ?
            <Helmet
              meta={[
                { name: 'description', content: show.about },
                { property: 'og:description', content: show.about },
                { property: 'twitter:description', content: show.about },
              ]}
            /> : ''
          }
          <div className="page-actions">
            <div className="page-actions-edit">
              <Link
                to={`/${locale}/shows/${show._id}/edit`}
                key={`${show._id}-edit`}
                title={`Edit ${show.name}`}
                className="page-edit-link"
              >
                <FormattedMessage
                  id="ui.pageEdit"
                  description="Page edit link"
                  defaultMessage="Edit details"
                />
              </Link>
              { user && !show.requestRemoval ?
                <a
                  href="#"
                  title={`Delete ${show.name}`}
                  className="page-delete-link"
                  onClick={this.confirmRequestRemoval.bind(this, show._id)}
                >
                  <FormattedMessage
                    id="ui.pageDelete"
                    description="Page delete link"
                    defaultMessage="Delete"
                  />
                </a>
                : ''
              }
              { user && show.requestRemoval ?
                <FormattedMessage
                  id="ui.pageDeleteRequested"
                  description="Page delete requested message"
                  defaultMessage="Delete request received"
                />
                : ''
              }
              { (show.requestRemoval && Roles.userIsInRole(Meteor.userId(), ['admin'])) ?
                <div className="admin-actions">
                  <a
                    href="#"
                    title={`Permenantly delete ${show.name}`}
                    className="page-confirm-removal-link"
                    onClick={this.confirmDelete.bind(this, show._id)}
                  >
                    <FormattedMessage
                      id="ui.pageConfirmDelete"
                      description="Page confirm delete link"
                      defaultMessage="Confirm Removal"
                    />
                  </a>
                  <a
                    href="#"
                    title={`Deny removal of ${show.name}`}
                    className="page-deny-removal-link"
                    onClick={this.denyDelete.bind(this, show._id)}
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
                to={`https://twitter.com/intent/tweet?text=${show.name} on the World Theatre Map ${baseUrl}${locale}/profiles/${show._id} %23howlround @HowlRound @WorldTheatreMap`}
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
                to={`https://www.facebook.com/dialog/share?app_id=662843947226126&display=popup&href=${baseUrl}${locale}/shows/${show._id}&redirect_uri=${baseUrl}${locale}/shows/${show._id}`}
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
  intl: intlShape.isRequired,
};

ShowPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowPage);
