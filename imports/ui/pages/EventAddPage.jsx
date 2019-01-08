// Utilities
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';

// Components
import Event from '../components/Event.jsx';
import EventAdd from '../components/EventAdd.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthHowlRound from '../components/AuthHowlRound.jsx';
import Loading from '../components/Loading.jsx';
import ShowAdd from '../components/ShowAdd.jsx';

class EventAddPage extends React.Component {
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
    const { formatMessage } = this.props.intl;
    const { displayNewShowForm, newShow } = this.state;

    const pageClass = classnames({
      'page': true,
      'events-add': true,
    });

    const messages = defineMessages({
      addEvent: {
        'id': 'navigation.addEvent',
        'defaultMessage': 'Add Show Event',
        'description': 'Add menu item for an Event',
      },
    });

    const translatableTitle = formatMessage(messages.addEvent);

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
            <Helmet title={translatableTitle} />
            <span
              className="overlay-close"
              onClick={this.context.router.goBack}
              title="Back"
            >
              &times;
            </span>
            <EventAdd displayNewShowForm={this.displayNewShowForm} showObject={newShow} />
          </div>

          {displayNewShowForm ?
            <div className="overlay-wrapper">
              <Modal />
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
                    <FormattedMessage
                      id="show.eventAddCancel"
                      description="Cancel text for New Show from Events Add form"
                      defaultMessage="Never mind, I don't want to add a new show"
                    />
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
            <AccessDeniedMessage />
            <div className="page-content">
              <Helmet title="Sign in to add an event" />
              <AuthHowlRound/>
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
  intl: intlShape.isRequired,
};

EventAddPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventAddPage);
