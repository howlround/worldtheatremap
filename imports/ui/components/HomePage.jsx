// Utilities
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Containers
import SearchProfilesContainerDummy from '../containers/SearchProfilesContainerDummy.jsx';

// Components
import EventsGlobe from '../components/EventsGlobe.jsx';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';
import HowlRoundPostFeatured from '../components/HowlRoundPostFeatured.jsx';
import Loading from '../components/Loading.jsx';

export default class HomePage extends React.Component {
  renderTodayMap() {
    const { eventsTodayWithLocations, loading } = this.props;

    return (
      <section className="homepage-events-globe">
        <div className="homepage-section-header">
          <Helmet
            title="World Theatre Map"
            titleTemplate="%s"
          />
          <h2>
            <FormattedMessage
              id="home.todayGlobeHeader"
              description="Header for home page events globe"
              defaultMessage="What's Happening Today"
            />
          </h2>
        </div>
        <p className="homepage-intro-text">
          <FormattedMessage
            id="home.introText"
            description="Large introduction text on the home page"
            defaultMessage="The World Theatre Map is a user-generated directory and a real-time media hub of the world’s theatre community."
          />
        </p>
        {loading ?
          <Loading key="loading" interiorBlock /> : ''
        }
        {!loading ?
          <EventsGlobe
            events={eventsTodayWithLocations}
          />
          : ''
        }
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
      eventsTodayWithLocations,
      howlroundPosts,
    } = this.props;

    const renderedHowlroundPosts = _.map(howlroundPosts, (item) => (
        <HowlRoundPostFeatured
          post={item.post}
          key={item.post.url}
        />
      )
    );

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
                  id="homepage.discoverSection"
                  description="Search filters header on the home page"
                  defaultMessage="Discover"
                />
              </h2>
            </div>
            <SearchProfilesContainerDummy location={{ query: {} }} />
          </div>
        </div>
        <div className="homepage-howlround-wrapper">
          <div className="homepage-howlround-content">
            <div className="homepage-section-header">
              <h2>
                <FormattedMessage
                  id="homepage.howlroundSection"
                  description="HowlRound header on the home page"
                  defaultMessage="From HowlRound"
                />
              </h2>
            </div>
            {renderedHowlroundPosts}
          </div>
        </div>
      </div>
    );
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
  howlroundPosts: React.PropTypes.array,
};

HomePage.contextTypes = {
  router: React.PropTypes.object,
};
