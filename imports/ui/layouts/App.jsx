// Utilities
import React from 'react';
import { Meteor } from 'meteor/meteor';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Containers
import HomePageContainer from '../containers/HomePageContainer.jsx';

// Components
import Footer from '../components/Footer.jsx';
import FooterAddPitch from '../components/FooterAddPitch.jsx';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import UserMenu from '../components/UserMenu.jsx';
import AddMenu from '../components/AddMenu.jsx';
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

  render() {
    // @TODO: Need tests for search on the home page
    const { showConnectionIssue, forceCloseDropDown } = this.state;
    const {
      user,
      connected,
      loading,
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
        <Helmet
          htmlAttributes={{ lang }}
          titleTemplate="%s | World Theatre Map"
          defaultTitle="World Theatre Map"
          meta={[
            { name: 'description', content: 'The World Theatre Map is a user-generated directory of the world\'s theatre community (makers, workers, companies, institutions) and a real-time media hub of its projects, events, performances, conversations, ideas.' },
            { property: 'fb:app_id', content: '662843947226126' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: Meteor.absoluteUrl(false, { secure: true }) },
            { property: 'og:title', content: 'World Theatre Map' },
            { property: 'og:image', content: 'https://s3.amazonaws.com/wtm-static/wtm-share-2016-11-10.png' },
            { property: 'og:description', content: 'The World Theatre Map is a user-generated directory of the world\'s theatre community (makers, workers, companies, institutions) and a real-time media hub of its projects, events, performances, conversations, ideas.' },
          ]}
        />
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
                id="navigation.siteName"
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
                  id="navigation.directory"
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
        <section id="content-container">
          {loading
            ? <Loading key="loading" />
            : clonedChildren}
          {(!clonedChildren && !loading) ?
            <HomePageContainer />
            : ''
          }
        </section>
        <FooterAddPitch />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
  lang: React.PropTypes.string,
  supportedLanguages: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};
