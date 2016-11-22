import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, FormattedDate, intlShape, injectIntl } from 'react-intl';

import Authors from '../components/Authors.jsx';
import ShowNameContainer from '../containers/ShowNameContainer.jsx';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

class EventTeaserWithShow extends React.Component {
  render() {
    const { event } = this.props;
    const { formatMessage } = this.props.intl;

    const locationLine = [ event.locality, event.administrativeArea, event.country ].filter(function (val) {return val;}).join(', ');

    return (
      <article className="event-teaser-with-show">
        <div className="event-main-info">
          { event.organizations ?
            <div className="event-organizations">
              <Link to={`/profiles/${ event.organizations._id }`}>
                <ProfileNameContainer profileId={event.organizations._id} />
              </Link> <span className="event-organizations-presents">Presents</span>
            </div>: ''}
          <h3 className="event-show-name">
            <Link to={`/shows/${ event.show._id }`} key={event.show._id}>
              <ShowNameContainer showId={event.show._id} />
            </Link>
          </h3>
          <div className="event-authorship">
            <FormattedMessage
              id="show.authors"
              description="By line for authors of a show"
              defaultMessage={`by {authors}`}
              values={{ authors: <Authors authors={event.show.author} /> }}
            />
          </div>
          <div className="event-type">
            {
              formatMessage({
                'id': `eventType.${event.eventType}`,
                'defaultMessage': event.eventType,
                'description': `Interests option: ${event.eventType}`
              })
            }
          </div>
          {typeof locationLine !== 'undefined' ?
            <div className="event-location">{locationLine}</div> : ''}
          {event.startDate && event.endDate ?
            <div className="event-date-range date">
              <FormattedDate
                value={event.startDate}
                year='numeric'
                month='short'
                day='numeric'
              />
              <span> – </span>
              <FormattedDate
                value={event.endDate}
                year='numeric'
                month='short'
                day='numeric'
              />
            </div> : ''}
          <Link
            to={`/events/${ event._id }`}
            className="event-view-link"
            key={event._id}
          >
            <FormattedMessage
              id="eventTeaser.viewEventLink"
              description="Link directly to event from teaser"
              defaultMessage="View Event"
            />
          </Link>
        </div>
      </article>
    );
  }
}

EventTeaserWithShow.propTypes = {
  event: React.PropTypes.object,
};

EventTeaserWithShow.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventTeaserWithShow);
