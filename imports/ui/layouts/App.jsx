import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Link } from 'react-router';

import { Profiles } from '../../api/profiles/profiles.js';
import UserMenu from '../components/UserMenu.jsx';
import AddMenu from '../components/AddMenu.jsx';
import Profile from '../components/Profile.jsx';

import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
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

    // if we are on a private profile, we'll need to go to a public one
    if (this.props.params.id) {
      const profile = Profiles.findOne(this.props.params.id);
      if (profile.userId) {
        const publicList = Profiles.findOne({ userId: { $exists: false } });
        this.context.router.push(`/profiles/${ publicList._id }`);
      }
    }
  }

  renderHomePageContent() {
    const { profiles } = this.props;

    return (
      profiles.map(profile => (
        <li>
          <Link
            to={`/profiles/${ profile._id }`}
            key={profile._id}
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

  render() {
    const { showConnectionIssue } = this.state;
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
        <header id="header">
          <section id="menu">
            <Link
              to="/"
              className="home"
            >World Theatre Map</Link>
            <UserMenu user={user} logout={this.logout}/>
            <AddMenu/>
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
              <ul>
                {this.renderHomePageContent()}
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
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
