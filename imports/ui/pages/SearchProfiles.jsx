import React from 'react';
import Profile from '../components/Profile.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';

export default class SearchProfiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profiles, loading } = this.props;

    if (loading) {
      return (
        <Loading key="loading"/>
      );
    }
    else {
      // @TODO: Refactor search type <ul> to be a component
      return (
        <div className="search page">
          <section>
            <ul className="search-type">
              <li><Link to="/search/shows" activeClassName="active">Shows</Link></li>
              <li><Link to="/search/profiles" activeClassName="active">Profiles</Link></li>
            </ul>
            <div className="search-type-content">
              <div className="search-filters"></div>
              <ul className="search-results"></ul>
            </div>
          </section>
        </div>
      );
    }
  }
}

SearchProfiles.contextTypes = {
  router: React.PropTypes.object,
};

SearchProfiles.propTypes = {
  profiles: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
