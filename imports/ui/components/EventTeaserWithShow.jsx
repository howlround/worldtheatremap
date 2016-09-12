import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Authors from '../components/Authors.jsx';

export default class EventTeaserWithShow extends React.Component {
  render() {
    const { event } = this.props;

    const locationLine = [ event.locality, event.administrativeArea, event.country ].filter(function (val) {return val;}).join(', ');

    return (
      <article className="event-teaser-with-show">
        <div className="event-main-info">
          <div className="event-type">
            {event.eventType}
          </div>
          <h3 className="event-show-name">
            <Link to={`/shows/${ event.show._id }`} key={event.show._id}>{event.show.name}</Link>
          </h3>
          <div className="event-authorship">
            <FormattedMessage
              id="show.authors"
              description='By line for authors of a show'
              defaultMessage={`by {authors}`}
              values={{ authors: <Authors authors={event.show.author} /> }}
            />
          </div>
          {typeof locationLine !== 'undefined' ?
            <div className="event-location">{locationLine}</div> : ''}
          {event.dateRange ?
            <div className="event-date-range date">
              {event.dateRange}
            </div> : ''}
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
