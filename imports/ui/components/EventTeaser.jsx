import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, FormattedDate, intlShape, injectIntl } from 'react-intl';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

const EventTeaser = (props) => {
  const { event, displayOrg } = props;
  const { formatMessage, locale } = props.intl;

  // Can not defineMessages here because countries are coming from the database
  const locationLine = [
    event.locality,
    event.administrativeArea,
    formatMessage({
      id: `country.${event.country}`,
      defaultMessage: event.country,
      description: `Country options: ${event.country}`,
    }),
  ].filter(val => (val)).join(', ');

  const seperator = (locale === 'fr') ? ' :' : ':';

  return (
    <article className="event-teaser">
      <div className="event-main-info">
        {(displayOrg && event.organizations) ?
          <div className="event-organizations">
            <ProfileNameContainer
              profileId={event.organizations._id}
              defaultName={event.organizations.name}
            />
          </div> : ''}
        {typeof locationLine !== 'undefined' ?
          <div className="event-location">{locationLine}</div> : ''}
        <div className="event-metadata">
          <div className="event-type">
            {
              formatMessage({
                id: `eventType.${event.eventType}`,
                defaultMessage: event.eventType,
              })
            }
            <span className="event-type-seperator">{seperator}</span>
          </div>
          {event.startDate && event.endDate ?
            <div className="event-date-range date">
              <FormattedDate
                value={event.startDate}
                year="numeric"
                month="short"
                day="numeric"
              />
              <span> – </span>
              <FormattedDate
                value={event.endDate}
                year="numeric"
                month="short"
                day="numeric"
              />
            </div> : ''}
        </div>
        <Link
          to={{
            pathname: `/${locale}/events/${event._id}`,
            query: {
              '_escaped_fragment_': '',
            },
          }}
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
};

EventTeaser.propTypes = {
  event: React.PropTypes.object,
  displayOrg: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

EventTeaser.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventTeaser);
