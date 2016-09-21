import React from 'react';
import { _ } from 'meteor/underscore';
import ProfileSearchResult from '../components/ProfileSearchResult.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';

export default class SearchProfilesResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results, loading, skip, totalCount, query, updateQuery } = this.props;

    if (!loading && !_.isEmpty(results)) {
      return (
        <div className="search-results-wrapper">
          <ul className="search-results">
            { results.map(profile => (
              <li key={profile._id}>
                <ProfileSearchResult profile={profile} />
              </li>
            )) }
          </ul>
          <SearchResultsPager totalCount={totalCount} skip={skip} query={query} updateQuery={updateQuery} />
        </div>
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
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
  skip: React.PropTypes.number,
  totalCount: React.PropTypes.number,
};
