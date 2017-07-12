import React from 'react';
import { _ } from 'meteor/underscore';

import SearchResultsPager from '../components/SearchResultsPager.jsx';
import ShowTeaser from '../components/ShowTeaser.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';

export default class SearchShowsResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      results,
      loading,
      skip,
      query,
      updateQuery,
    } = this.props;

    if (loading) {
      return (
        <SearchResultsLoading />
      );
    } else if (!_.isEmpty(results)) {
      return(
        <div className="search-results-wrapper">
          <ul className="search-results">
            { results.map(result => (
              <li key={result._id}>
                <ShowTeaser show={result} />
              </li>
            )) }
          </ul>
          <SearchResultsPager
            count={results.length}
            skip={skip}
            query={query}
            updateQuery={updateQuery}
          />
        </div>
      );
    }
    else {
      return (
        <SearchResultsEmptyText />
      );
    }
  }
}

SearchShowsResults.contextTypes = {
  router: React.PropTypes.object,
};

SearchShowsResults.propTypes = {
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
  skip: React.PropTypes.number,
};
