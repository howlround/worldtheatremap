// Utilities
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

// Components
import EventsGlobe from '../components/EventsGlobe.jsx';
import HowlRoundPostFeatured from '../components/HowlRoundPostFeatured.jsx';
import HomePageDisplayToggle from '../components/HomePageDisplayToggle.jsx';
import Loading from '../components/Loading.jsx';
import ProfilesGlobe from '../components/ProfilesGlobe.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'people',
    };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(display) {
    this.setState({ display });
  }

  displaySwitch() {
    const { display } = this.state;
    const {
      eventsTodayWithLocations,
      profilesVis,
      loading,
    } = this.props;
    const { locale } = this.props.intl;
    let output = '';

    if (loading) {
      output = <Loading key="loading" interiorBlock />;
    } else {
      switch (display) {
        case 'people':
          output = (
            <div>
              {this.renderProfilesTitle()}
              <ProfilesGlobe
                items={profilesVis}
              />
            </div>
          );
          break;
        case 'events':
        default:
          if (eventsTodayWithLocations) {
            output = (
              <div>
                {this.renderEventsTitle()}
                <EventsGlobe
                  items={eventsTodayWithLocations}
                />
              </div>
            );
          }
          break;
      }
    }

    return (
      <section className="homepage-globe">
        <HomePageDisplayToggle
          updateDisplay={this.updateDisplay}
          active={display}
        />
        {output}
      </section>
    );
  }

  renderEventsTitle() {
    /* eslint-disable max-len */
    const { eventsTodayCount, startDate, endDate } = this.props;
    const { locale } = this.props.intl;

    return (
      <div className="homepage-globe-label">
        <h2>
          <Link
            to={{
              pathname: `/${locale}/search/shows`,
              query: {
                startDate,
                endDate,
                '_escaped_fragment_': '',
              },
            }}
            className="events-today-view-all"
          >
            <FormattedMessage
              id="homepage.eventsTodayCount"
              description="Number of events happening today"
              defaultMessage={'{eventsTodayCount, number} Upcoming {eventsTodayCount, plural, one {Event} other {Events}}'}
              values={{ eventsTodayCount }}
            />
          </Link>
        </h2>
      </div>
    );
  }

  renderProfilesTitle() {
    /* eslint-disable max-len */
    const { profilesVisCount } = this.props;
    const { locale } = this.props.intl;

    return (
      <div className="homepage-globe-label">
        <h2>
          <Link
            to={{
              pathname: `/${locale}/search/profiles`,
              query: {
                'gender[]': "Female",
                '_escaped_fragment_': '',
              },
            }}
            className="people-view-all"
          >
            <FormattedMessage
              id="homepage.peopleGlobeLabel"
              defaultMessage="{profilesVisCount} Female Theatremakers Around the World"
              values={{ profilesVisCount }}
            />
          </Link>
        </h2>
      </div>
    );
  }

  renderSearchLinks() {
    const { locale } = this.props.intl;

    return (
      <div className="homepage-search-links">
        <FormattedMessage
          id="homepage.searchLinks"
          description="Links to search by various types"
          defaultMessage={'Search by {people}, {organizations}, {shows}, or {festivals}'}
          values={{
            people: <Link to={{ pathname: `/${locale}/search/profiles`, query: { '_escaped_fragment_': '' } }}>
              <FormattedMessage
                id="searchNav.people"
                description="Alternate Profile Search Tab"
                defaultMessage="People"
              />
            </Link>,
            organizations: <Link to={{ pathname: `/${locale}/search/profiles`, query: { '_escaped_fragment_': '' } }}>
              <FormattedMessage
                id="searchNav.organizations"
                description="Alternate Profile Search Tab"
                defaultMessage="Organizations"
              />
            </Link>,
            shows: <Link to={{ pathname: `/${locale}/search/shows`, query: { '_escaped_fragment_': '' } }}>
              <FormattedMessage
                id="searchNav.shows"
                description="Show Search Tab"
                defaultMessage="Shows"
              />
            </Link>,
            festivals: <Link to={{ pathname: `/${locale}/search/festivals`, query: { '_escaped_fragment_': '' } }}>
              <FormattedMessage
                id="searchNav.festivals"
                description="Festival Search Tab"
                defaultMessage="Festivals"
              />
            </Link>,
          }}
        />
      </div>
    );
  }

  render() {
    const {
      eventsTodayWithLocations,
      howlroundPosts,
      loading,
    } = this.props;
    const { display } = this.state;
    const { locale, formatMessage } = this.props.intl;

    const messages = defineMessages({
      siteName: {
        id: 'navigation.siteName',
        defaultMessage: 'World Theatre Map',
        description: 'Site name',
      },
    });

    const siteName = formatMessage(messages.siteName);

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
          <Helmet
            title={siteName}
            titleTemplate="%s"
          />
          {this.renderSearchLinks()}
          {!loading ? this.displaySwitch() : ''}
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
            {/*renderedHowlroundPosts*/}
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
  profilesVis: React.PropTypes.array,
  profilesVisCount: React.PropTypes.number,
  startDate: React.PropTypes.instanceOf(Date),
  endDate: React.PropTypes.instanceOf(Date),
  howlroundPosts: React.PropTypes.array,
  intl: intlShape.isRequired,
};

HomePage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(HomePage);
