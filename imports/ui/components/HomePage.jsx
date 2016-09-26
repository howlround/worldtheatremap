import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { FormattedMessage } from 'react-intl';

import SearchProfilesContainerDummy from '../containers/SearchProfilesContainerDummy.jsx';

import EventsGlobe from '../components/EventsGlobe.jsx';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';

import Loading from '../components/Loading.jsx';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTodayMap() {
    const { eventsTodayWithLocations, loading } = this.props;

    return (
      <section className="homepage-events-globe">
        <div className="homepage-section-header">
          <h2>
            <FormattedMessage
              id='home.todayGlobeHeader'
              description='Header for home page events globe'
              defaultMessage="What's Happening Today"
            />
          </h2>
        </div>
        <p>
          <FormattedMessage
            id='home.introText'
            description='Large introduction text on the home page'
            defaultMessage="The World Theatre Map is a user-generated directory and a real-time media hub of the world’s theatre community."
          />
        </p>
        <EventsGlobe events={eventsTodayWithLocations} />
      </section>
    );
  }

  renderTodayList() {
    const { eventsTodayWithLocations, eventsTodayCount, startDate, endDate, loading } = this.props;

    if (!loading && eventsTodayWithLocations) {
      return (
        <section className="homepage-events-list">
          <h2>
            <FormattedMessage
              id="homepage.autocompleteCreate"
              description="Autocomplete option to create a related show"
              defaultMessage={`{eventsTodayCount, number} {eventsTodayCount, plural, one {Event} other {Events}} Happening Today`}
              values={{ eventsTodayCount }}
            />
          </h2>
          <ul className="results">
            {eventsTodayWithLocations.slice(0, 6).map(event => (
              <li key={event._id}>
                <EventTeaserWithShow event={event} />
              </li>
            ))}
          </ul>
          <Link
            to={{ pathname: '/search/events', query: { startDate, endDate } }}
            className="events-today-view-all"
          >
            <FormattedMessage
              id="home.todayEventsMoreLink"
              description="See all today's events link on home page"
              defaultMessage="See All Today's Events"
            />
          </Link>
        </section>
      );
    } else {
      return (null);
    }
  }

  render() {
    const {
      loading,
      eventsTodayWithLocations,
    } = this.props;

    if (loading) {
      return <Loading key="loading" />;
    } else {
      return (
        <div className="homepage-content-wrapper">
          <div className="page">
            {eventsTodayWithLocations ? this.renderTodayMap() : ''}
            {eventsTodayWithLocations ? this.renderTodayList() : ''}
          </div>
          <div className="homepage-search-wrapper">
            <div className="homepage-search-content">
              <div className="homepage-section-header">
                <h2>
                  <FormattedMessage
                    id='homepage.discoverSection'
                    description="Search filters header on the home page"
                    defaultMessage="Discover"
                  />
                </h2>
              </div>
              <SearchProfilesContainerDummy location={{ query: {} }} />
            </div>
          </div>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,     // subscription status
  profiles: React.PropTypes.array,   // all profiles visible to the current user
  shows: React.PropTypes.array,
  eventsTodayWithLocations: React.PropTypes.array,
  eventsTodayCount: React.PropTypes.number,
  startDate: React.PropTypes.instanceOf(Date),
  endDate: React.PropTypes.instanceOf(Date),
};

HomePage.contextTypes = {
  router: React.PropTypes.object,
};
