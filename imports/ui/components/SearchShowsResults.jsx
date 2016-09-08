import React from 'react';
import { _ } from 'meteor/underscore';
import ShowTeaser from '../components/ShowTeaser.jsx';

export default class SearchShowsResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results, loading } = this.props;
    if (!loading && !_.isEmpty(results)) {
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
      return (null);
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
