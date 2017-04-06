import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class SearchResultsLoading extends React.Component {
  render() {
    return (
      <span className="search-results-message">
        <h3>
          <FormattedMessage
            id='search.loadingText'
            description='Loading text for search results'
            defaultMessage='Loading'
          />...
        </h3>
      </span>
    );
  }
}

export default injectIntl(SearchResultsLoading);
