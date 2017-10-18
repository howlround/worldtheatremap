import React from 'react';
import {
  each,
  isEmpty,
  size,
} from 'lodash';

import EventsGlobe from '../components/EventsGlobe.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';
import SearchResultsToggle from '../components/SearchResultsToggle.jsx';
import SearchShowsResultsSummary from '../components/SearchShowsResultsSummary.jsx';
import ShowTeaser from '../components/ShowTeaser.jsx';

export default class SearchShowsResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsDisplay: 'list',
    };

    this.updateResultsDisplay = this.updateResultsDisplay.bind(this);
  }

  updateResultsDisplay(display) {
    this.setState({ resultsDisplay: display });
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
        case 'map': {
          // results will either have just a show item or show and events.
          const eventsOnly = [];
          each(results, result => each(result.events, event => eventsOnly.push(event)));

          output = (
            <EventsGlobe
              items={eventsOnly}
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

    // Include the map/list toggle on all cases to maintain a consistant interface
    return (
      <div>
        <SearchShowsResultsSummary
          query={query}
          count={size(results)}
        />
        <SearchResultsToggle
          toggle={this.updateResultsDisplay}
          active={resultsDisplay}
        />
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
