import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  each,
  isEmpty,
} from 'lodash';

import EventsGlobe from '../components/EventsGlobe.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';
import ShowTeaser from '../components/ShowTeaser.jsx';

export default class SearchShowsResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsDisplay: 'list',
    };

    this.resultsViewList = this.resultsViewList.bind(this);
    this.resultsViewGlobe = this.resultsViewGlobe.bind(this);
  }

  resultsViewList(event) {
    event.preventDefault();

    this.setState({ resultsDisplay: 'list' });
  }

  resultsViewGlobe(event) {
    event.preventDefault();

    this.setState({ resultsDisplay: 'globe' });
  }

  render() {
    const {
      results,
      loading,
      skip,
      query,
      updateQuery,
    } = this.props;

    const { resultsDisplay } = this.state;

    let output = null;

    if (loading) {
      output = <SearchResultsLoading />;
    } else if (!isEmpty(results)) {
      switch (resultsDisplay) {
        case 'globe': {
          // results will either have just a show item or show and events.
          const eventsOnly = [];
          each(results, result => each(result.events, event => eventsOnly.push(event)));

          output = (
            <EventsGlobe
              events={eventsOnly}
            />
          );
          break;
        }

        case 'list':
        default: {
          output = (
            <div className="search-results-wrapper">
              <ul className="search-results">
                {results.map(result => (
                  <li key={result.show._id}>
                    <ShowTeaser
                      show={result.show}
                      eventsByShow={result.events}
                      defaultOpen
                    />
                  </li>
                ))}
              </ul>
              <SearchResultsPager
                count={results.length}
                skip={skip}
                query={query}
                updateQuery={updateQuery}
              />
            </div>
          );
          break;
        }
      }
    } else {
      output = <SearchResultsEmptyText />;
    }

    // Include the map/list toggle on all cases
    return (
      <div>
        <div className="search-results-toggle">
          <a href="#" className="search-results-toggle-item" onClick={this.resultsViewList}>
            <FormattedMessage
              id="searchResultsToggle.list"
              description="Search results toggle link: List"
              defaultMessage="List"
            />
          </a>
          <a href="#" className="search-results-toggle-item" onClick={this.resultsViewGlobe}>
            <FormattedMessage
              id="searchResultsToggle.globe"
              description="Search results toggle link: Globe"
              defaultMessage="Globe"
            />
          </a>
        </div>
        {output}
      </div>
    );
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
