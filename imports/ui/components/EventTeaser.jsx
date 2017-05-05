import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, FormattedDate, intlShape, injectIntl } from 'react-intl';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

class EventTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { event, displayOrg } = this.props;
    const { formatMessage, locale } = this.props.intl;

    const locationLine = [
      event.locality,
      event.administrativeArea,
      formatMessage({
        'id': `country.${event.country}`,
        'defaultMessage': event.country,
        'description': `Country options: ${event.country}`
      })
    ].filter(function (val) {return val;}).join(', ');

    return (
      <article className="event-teaser">
        <div className="event-main-info">
          { (displayOrg && event.organizations) ?
            <div className="event-organizations">
              <ProfileNameContainer
                profileId={event.organizations._id}
                defaultName={event.organizations.name}
              />
            </div>: ''}
          {typeof locationLine !== 'undefined' ?
            <div className="event-location">{locationLine}</div> : ''}
          <div className="event-metadata">
            <div className="event-type">
              {
                formatMessage({
                  'id': `eventType.${event.eventType}`,
                  'defaultMessage': event.eventType,
                  'description': `Interests option: ${event.eventType}`
                })
              }
              <span className="event-type-seperator">:</span>
            </div>
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
          <Link
            to={`/${locale}/events/${ event._id }`}
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

EventTeaser.propTypes = {
  event: React.PropTypes.object,
  displayOrg: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

EventTeaser.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventTeaser);
