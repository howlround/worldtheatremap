import React from 'react';
import { _ } from 'meteor/underscore';
import ProfileSearchResult from '../components/ProfileSearchResult.jsx';

export default class SearchProfilesResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results, loading } = this.props;
    if (!loading && !_.isEmpty(results)) {
      return(
        <ul className="search-results">
          { results.map(profile => (
            <li key={profile._id}>
              <ProfileSearchResult profile={profile} />
            </li>
          )) }
        </ul>
      );
    }
    else {
      return (null);
    }
  }
}

SearchProfilesResults.contextTypes = {
  router: React.PropTypes.object,
};

SearchProfilesResults.propTypes = {
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
