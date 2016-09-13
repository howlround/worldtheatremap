import React from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';

export default class EventTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { event } = this.props;

    const locationLine = [event.locality, event.administrativeArea, event.country].filter(function (val) {return val;}).join(', ');

    return (
      <article className="event-teaser">
        <div className="event-main-info">
          <h3 className="event-name">
            <Link to={`/events/${ event._id }`} key={event._id}>{event.eventType}</Link>
          </h3>
          { typeof locationLine != 'undefined' ?
            <div className="event-location">{ locationLine }</div> : '' }
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
        </div>
      </article>
    );
  }
}

EventTeaser.propTypes = {
  event: React.PropTypes.object,
};

EventTeaser.contextTypes = {
  router: React.PropTypes.object,
};
