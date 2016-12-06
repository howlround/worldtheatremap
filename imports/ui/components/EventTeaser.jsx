import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, intlShape, injectIntl } from 'react-intl';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

class EventTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { event } = this.props;
    const { locale } = this.props.intl;

    const locationLine = [event.locality, event.administrativeArea, event.country].filter(function (val) {return val;}).join(', ');

    return (
      <article className="event-teaser">
        <div className="event-main-info">
          <h3 className="event-name">
            <Link to={`/${locale}/events/${ event._id }`} key={event._id}>{event.eventType}</Link>
          </h3>
          { event.organizations ?
            <div className="event-organizations">
              <Link to={`/${locale}/profiles/${ event.organizations._id }`}>
                <ProfileNameContainer profileId={event.organizations._id} />
              </Link>
            </div>: ''}
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
  intl: intlShape.isRequired,
};

EventTeaser.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventTeaser);
