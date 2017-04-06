import React from 'react';
import { _ } from 'meteor/underscore';
import ShowTeaser from '../components/ShowTeaser.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';

export default class SearchShowsResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results, loading } = this.props;

    if (loading) {
      return (
        <SearchResultsLoading />
      );
    } else if (!_.isEmpty(results)) {
      return(
        <ul className="search-results">
          { results.map(result => (
            <li key={result._id}>
              <ShowTeaser show={result} />
            </li>
          )) }
        </ul>
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
};
