import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, FormattedDate, intlShape, injectIntl } from 'react-intl';

import Authors from '../components/Authors.jsx';
import ShowNameContainer from '../containers/ShowNameContainer.jsx';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

class EventTeaserWithShow extends React.Component {
  render() {
    const { event } = this.props;
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

    const seperator = (locale === 'fr') ? ' :' : ':';

    return (
      <article className="event-teaser event-teaser-with-show">
        <div className="event-main-info">
          <h3 className="event-show-name">
            <ShowNameContainer
              showId={event.show._id}
              defaultName={event.show.name}
            />
          </h3>
          <div className="event-authorship">
            <FormattedMessage
              id="show.authors"
              description="By line for authors of a show"
              defaultMessage={`by {authors}`}
              values={{ authors: <Authors authors={event.show.author} /> }}
            />
          </div>
          { event.organizations ?
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
              <span className="event-type-seperator">{seperator}</span>
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
            to={{
              pathname: `/${locale}/events/${ event._id }`,
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
  }
}

EventTeaserWithShow.propTypes = {
  event: React.PropTypes.object,
  intl: intlShape.isRequired,
};

EventTeaserWithShow.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventTeaserWithShow);
