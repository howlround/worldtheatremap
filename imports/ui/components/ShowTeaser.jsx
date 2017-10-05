import React from 'react';
import { Link } from 'react-router';
import {
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  intlShape,
  injectIntl
} from 'react-intl';

// Components
import Authors from '../components/Authors.jsx';
import EventTeaser from '../components/EventTeaser.jsx';

// Containers
import ShowNameContainer from '../containers/ShowNameContainer.jsx';

class ShowTeaser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.defaultOpen,
    }

    this.toggle = this.toggle.bind(this);
    this.eventsToggleLink = this.eventsToggleLink.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      open: !this.state.open,
    });
  }

  eventsToggleLink() {
    const { eventsByShow } = this.props;

    return (
      <a href="#" className="show-events-toggle" onClick={this.toggle}>
        <span className="count">
          <FormattedNumber
            value={eventsByShow.length}
          />
        </span>
        &nbsp;
        <span className="type">
          <FormattedPlural
            value={eventsByShow.length}
            one={
              <FormattedMessage
                id="singular.event"
                description="Singular for view events on show teaser"
                defaultMessage="Event"
              />
            }
            other={
              <FormattedMessage
                id="plural.events"
                description="Plural for view events on show teaser"
                defaultMessage="Events"
              />
            }
          />
        </span>
      </a>
    );
  }

  render() {
    const { show, eventsByShow } = this.props;
    const { open } = this.state;
    const { locale } = this.props.intl;

    let events;
    if (eventsByShow && eventsByShow.length) {
      events = eventsByShow.map(event => (
        <li key={event._id}>
          <EventTeaser
            event={event}
            displayOrg={false}
          />
        </li>
      ));
    }

    return (
      <article className="show-teaser">
        <div className="show-main-info">
          <h3 className="show-name">
            <ShowNameContainer showId={show._id} defaultName={show.name} />
          </h3>
          <div className="show-authorship">
            <FormattedMessage
              id="show.authors"
              description='By line for authors of a show'
              defaultMessage={`by {authors}`}
              values={{ authors: <Authors authors={show.author} /> }}
            />
          </div>

          {events ? this.eventsToggleLink() : ''}
        </div>
        {open ?
          <ul className="show-events">
            {events}
          </ul>
        : ''}
      </article>
    );
  }
}

ShowTeaser.propTypes = {
  show: React.PropTypes.object,
  eventsByShow: React.PropTypes.array,
  defaultOpen: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ShowTeaser.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowTeaser);
