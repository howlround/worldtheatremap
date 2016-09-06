import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Link } from 'react-router';

import { Profiles } from '../../api/profiles/profiles.js';
import UserMenu from '../components/UserMenu.jsx';
import AddMenu from '../components/AddMenu.jsx';
import Profile from '../components/Profile.jsx';
import EventsGlobe from '../components/EventsGlobe.jsx';

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
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a profile once profiles are ready
    // if (!loading && !children) {
    //   const profile = Profiles.findOne();
    //   this.context.router.replace(`/profiles/${ profile._id }`);
    // }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout();
  }

  hideDropDown(menu, value) {
    if (menu == 'AddMenu') {
      this.setState({ forceCloseDropDown: { AddMenu: value, UserMenu: false } });
    }
    else if (menu == 'UserMenu') {
      this.setState({ forceCloseDropDown: { UserMenu: value, AddMenu: false } });
    }
  }

  renderTodayMap() {
    const { eventsTodayWithLocations, loading } = this.props;

    if (!loading && eventsTodayWithLocations) {
      return (
        <section className="homepage-events-globe">
          <div className="homepage-section-header"><h2>What's Happening Today</h2></div>
          <p>The World Theatre Map is a user-generated directory and a real-time media hub of the world’s theatre community. </p>
          <EventsGlobe events={ eventsTodayWithLocations } />
        </section>
      );
    }
  }

  renderHomePageProfiles() {
    const { profiles } = this.props;

    return (
      profiles.map(profile => (
        <li key={profile._id}>
          <Link
            to={`/profiles/${ profile._id }`}
            title={profile.name}
            className="profile-view"
            activeClassName="active"
          >
            {profile.name}
          </Link>
        </li>
      ))
    );
  }

  renderHomePageShows() {
    const { shows } = this.props;

    return (
      shows.map(show => (
        <li key={show._id}>
          <Link
            to={`/shows/${ show._id }`}
            title={show.name}
            className="show-view"
            activeClassName="active"
          >
            {show.name}
          </Link>
        </li>
      ))
    );
  }

  render() {
    const { showConnectionIssue, forceCloseDropDown } = this.state;
    const {
      user,
      connected,
      loading,
      profiles,
      menuOpen,
      children,
      location,
    } = this.props;

    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
      user,
    });

    return (
      <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <a className="skip-to-content" href="#content-container" tabindex="1">Skip to main content</a>
        <header id="header">
          <section id="menu">
            <Link
              to="/"
              className="home"
            >World Theatre Map</Link>
            <UserMenu user={user} logout={this.logout} hideDropDown={this.hideDropDown} forceCloseDropDown={forceCloseDropDown}/>
            <AddMenu hideDropDown={this.hideDropDown} forceCloseDropDown={forceCloseDropDown}/>
            <div className="menu-right menu-container menu-with-divider">
              <Link
                to="search"
                className="menu-parent"
              >Directory</Link>
            </div>
          </section>
        </header>
        {showConnectionIssue && !connected
          ? <ConnectionNotification/>
          : null}
        <div className="content-overlay" onClick={closeMenu}></div>
        <div id="content-container">
          {loading
            ? <Loading key="loading"/>
            : clonedChildren}
          {!clonedChildren ?
            <div className="page">
              {this.renderTodayMap()}
              <ul>
                {this.renderHomePageProfiles()}
                {this.renderHomePageShows()}
              </ul>
            </div> : ''
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
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
