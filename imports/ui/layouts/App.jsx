// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import { _ } from 'meteor/underscore';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';

// Containers
import HomePageContainer from '../containers/HomePageContainer.jsx';
// Containers
import ContentCountsContainer from '../containers/ContentCountsContainer.jsx';

// Components
import Footer from '../components/Footer.jsx';
import FooterAddPitch from '../components/FooterAddPitch.jsx';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import UserMenu from '../components/UserMenu.jsx';
import AddMenu from '../components/AddMenu.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

marked.setOptions({
  tables: false,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
      forceCloseDropDown: { AddMenu: false, UserMenu: false },
    };

    this.logout = this.logout.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.renderAnnouncement = this.renderAnnouncement.bind(this);
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

  renderAnnouncement() {
    const { announcement } = this.props;
    const { locale } = this.props.intl;
    const access = Roles.userIsInRole(Meteor.userId(), ['admin']);

    if (announcement && _.has(announcement, 'body') && announcement.body) {
      return (
        <div className="announcement">
          {access ?
            <Link
              to={`/${locale}/announcement`}
              className="edit-announcement"
            >
              Edit
            </Link>
          : ''}
          <div
            className="markdown-formatted"
            dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(announcement.body))}}
          />
        </div>
      );
    }
  }

  render() {
    // @TODO: Need tests for search on the home page
    const { showConnectionIssue, forceCloseDropDown } = this.state;
    const { formatMessage, locale } = this.props.intl;
    const {
      user,
      connected,
      loading,
      menuOpen,
      children,
      location,
      supportedLanguages,
    } = this.props;

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
      user,
    });

    const siteName = formatMessage({
      'id': 'navigation.siteName',
      'defaultMessage': 'World Theatre Map',
      'description': 'Site name',
    });

    const siteDescription = formatMessage({
      'id': 'site.description',
      'defaultMessage': 'The World Theatre Map is a user-generated directory of the world\'s theatre community (makers, workers, companies, institutions) and a real-time media hub of its projects, events, performances, conversations, ideas.',
      'description': 'General description of the site',
    });

    return (
      <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <Helmet
          htmlAttributes={{ locale }}
          titleTemplate={`%s | ${siteName}`}
          defaultTitle={`${siteName}`}
          meta={[
            { name: 'description', content: siteDescription },
            { property: 'fb:app_id', content: '662843947226126' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `${Meteor.absoluteUrl(false, { secure: true })}${locale}` },
            { property: 'og:title', content: siteName },
            { property: 'og:image', content: `https://s3.amazonaws.com/wtm-static/wtm-share-fb-2016-12-13-${locale}.jpg` },
            { property: 'og:description', content: siteDescription },
            { property: 'twitter:card', content: 'summary_large_image'},
            { property: 'twitter:site', content: '@WorldTheatreMap' },
            { property: 'twitter:title', content: siteName },
            { property: 'twitter:description', content: siteDescription },
            { property: 'twitter:creator', content: '@WorldTheatreMap' },
            { property: 'twitter:image', content: `https://s3.amazonaws.com/wtm-static/wtm-share-tw-2016-12-13-${locale}.jpg` },
            { property: 'twitter:domain', content: `${Meteor.absoluteUrl(false, { secure: true })}` },
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
              to={`/${locale}`}
              className="home"
            >
              <FormattedMessage
                id="navigation.siteName"
                description="Site Name"
                defaultMessage="World Theatre Map"
              />
              &nbsp;
              <sup className="beta-label">
                beta
              </sup>
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
                to={`/${locale}/search`}
                className="menu-parent"
              >
                <FormattedMessage
                  id="navigation.directory"
                  description="Directory menu"
                  defaultMessage="Directory"
                />
              </Link>
            </div>
            <div className="menu-right menu-container menu-with-divider">
              <Link
                to={`/${locale}/about`}
                className="menu-parent"
              >
                <FormattedMessage
                  id="navigation.about"
                  description="About menu"
                  defaultMessage="About"
                />
              </Link>
            </div>
          </section>
        </header>
        <section>
          {this.renderAnnouncement()}
        </section>
        {showConnectionIssue && !connected
          ? <ConnectionNotification />
          : null}
        <LanguageSwitcher locale={locale} supportedLanguages={supportedLanguages} />
        <section id="content-container">
          {loading
            ? <Loading key="loading" />
            : clonedChildren}
          {(!clonedChildren && !loading) ?
            <HomePageContainer user={user} />
            : ''
          }
        </section>
        <FooterAddPitch />
        <ContentCountsContainer />
        <Footer />
        <div className="feedback-link">
          <a href="https://worldtheatremap.useresponse.com" target="_blank">
            <FormattedMessage
              id="navigation.feedbackLink"
              description="Link to feedback site"
              defaultMessage="Give feedback"
            />
          </a>
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
  announcement: React.PropTypes.object,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
  supportedLanguages: React.PropTypes.object,
  intl: intlShape.isRequired,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(App);
