import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { FormattedMessage } from 'react-intl';

import SearchProfilesContainer from '../containers/SearchProfilesContainer.jsx';

import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import UserMenu from '../components/UserMenu.jsx';
import AddMenu from '../components/AddMenu.jsx';
import EventsGlobe from '../components/EventsGlobe.jsx';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';

import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
      forceCloseDropDown: { AddMenu: false, UserMenu: false },
    };

    this.logout = this.logout.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  logout() {
    Meteor.logout();
  }

  hideDropDown(menu, value) {
    if (menu === 'AddMenu') {
      this.setState({ forceCloseDropDown: { AddMenu: value, UserMenu: false } });
    } else if (menu === 'UserMenu') {
      this.setState({ forceCloseDropDown: { UserMenu: value, AddMenu: false } });
    }
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
    // @TODO: Need tests for search on the home page
    const { showConnectionIssue, forceCloseDropDown } = this.state;
    const {
      user,
      connected,
      loading,
      eventsTodayWithLocations,
      menuOpen,
      children,
      location,
      lang,
      supportedLanguages,
    } = this.props;

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
      user,
    });

    return (
      <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <a
          className="skip-to-content"
          href="#content-container"
          tabIndex="1"
        >
          Skip to main content
        </a>
        <header id="header">
          <section id="menu">
            <Link
              to="/"
              className="home"
            >
              <FormattedMessage
                id='navigation.siteName'
                description="Site Name"
                defaultMessage="World Theatre Map"
              />
            </Link>
            <UserMenu
              user={user}
              logout={this.logout}
              hideDropDown={this.hideDropDown}
              forceCloseDropDown={forceCloseDropDown}
            />
            <AddMenu
              hideDropDown={this.hideDropDown}
              forceCloseDropDown={forceCloseDropDown}
            />
            <div className="menu-right menu-container menu-with-divider">
              <Link
                to="search"
                className="menu-parent"
              >
                <FormattedMessage
                  id='navigation.directory'
                  description="Directory menu"
                  defaultMessage="Directory"
                />
              </Link>
            </div>
          </section>
        </header>
        {showConnectionIssue && !connected
          ? <ConnectionNotification />
          : null}
        <LanguageSwitcher lang={lang} supportedLanguages={supportedLanguages} />
        <div id="content-container">
          {loading
            ? <Loading key="loading" />
            : clonedChildren}
          {(!clonedChildren && !loading) ?
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
                  <SearchProfilesContainer location={{ query: {} }} />
                </div>
              </div>
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  profiles: React.PropTypes.array,   // all profiles visible to the current user
  shows: React.PropTypes.array,
  eventsTodayWithLocations: React.PropTypes.array,
  eventsTodayCount: React.PropTypes.number,
  startDate: React.PropTypes.instanceOf(Date),
  endDate: React.PropTypes.instanceOf(Date),
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
  lang: React.PropTypes.string,
  supportedLanguages: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};
