// Utilities
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

// Containers
import ContentCountsContainer from '../containers/ContentCountsContainer.jsx';

// Components
import EventsGlobe from '../components/EventsGlobe.jsx';
import HowlRoundPostFeatured from '../components/HowlRoundPostFeatured.jsx';
import Loading from '../components/Loading.jsx';

class HomePage extends React.Component {
  renderTodayMap() {
    const { eventsTodayWithLocations, loading } = this.props;
    const { formatMessage } = this.props.intl;

    const messages = defineMessages({
      siteName: {
        id: 'navigation.siteName',
        defaultMessage: 'World Theatre Map',
        description: 'Site name',
      },
    });

    const siteName = formatMessage(messages.siteName);

    return (
      <section className="homepage-events-globe">
        <Helmet
          title={siteName}
          titleTemplate="%s"
        />
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
    /* eslint-disable max-len */
    const { eventsTodayCount, startDate, endDate } = this.props;
    const { locale } = this.props.intl;

    return (
      <div className="homepage-globe-label">
        <h2>
          <Link
            to={{ pathname: `/${locale}/search/shows`, query: { startDate, endDate } }}
            className="events-today-view-all"
          >
            <FormattedMessage
              id="homepage.eventsTodayCount"
              description="Number of events happening today"
              defaultMessage={'{eventsTodayCount, number} {eventsTodayCount, plural, one {Event} other {Events}} Happening Today'}
              values={{ eventsTodayCount }}
            />
          </Link>
        </h2>
      </div>
    );
  }

  render() {
    const {
      eventsTodayWithLocations,
      howlroundPosts,
      loading,
    } = this.props;

    const { locale } = this.props.intl;

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
          <ContentCountsContainer hideHeader />
          <div className="homepage-search-links">
            <FormattedMessage
              id="homepage.searchLinks"
              description="Links to search by various types"
              defaultMessage={'Search by {people}, {organizations}, {shows}, or {festivals}'}
              values={{
                people: <Link to={{ pathname: `/${locale}/search/profiles`, query: {} }}>
                  <FormattedMessage
                    id="searchNav.people"
                    description="Alternate Profile Search Tab"
                    defaultMessage="People"
                  />
                </Link>,
                organizations: <Link to={{ pathname: `/${locale}/search/profiles`, query: {} }}>
                  <FormattedMessage
                    id="searchNav.organizations"
                    description="Alternate Profile Search Tab"
                    defaultMessage="Organizations"
                  />
                </Link>,
                shows: <Link to={{ pathname: `/${locale}/search/shows`, query: {} }}>
                  <FormattedMessage
                    id="searchNav.shows"
                    description="Show Search Tab"
                    defaultMessage="Shows"
                  />
                </Link>,
                festivals: <Link to={{ pathname: `/${locale}/search/festivals`, query: {} }}>
                  <FormattedMessage
                    id="searchNav.festivals"
                    description="Festival Search Tab"
                    defaultMessage="Festivals"
                  />
                </Link>,
              }}
            />
          </div>
          {(!loading && eventsTodayWithLocations) ? this.renderTodayMap() : ''}
          {(!loading && eventsTodayWithLocations) ? this.renderTodayList() : ''}
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
  intl: intlShape.isRequired,
};

HomePage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(HomePage);
