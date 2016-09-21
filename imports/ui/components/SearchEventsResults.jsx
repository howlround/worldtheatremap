import React from 'react';
import { _ } from 'meteor/underscore';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';

export default class SearchEventsResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results, loading, skip, totalCount, query, updateQuery } = this.props;
    if (!loading && !_.isEmpty(results)) {
      return(
        <div className="search-results-wrapper">
          <ul className="search-results">
            { results.map(event => (
              <li key={event._id}>
                <EventTeaserWithShow event={event} />
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

SearchEventsResults.contextTypes = {
  router: React.PropTypes.object,
};

SearchEventsResults.propTypes = {
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
  skip: React.PropTypes.number,
  totalCount: React.PropTypes.number,
};
