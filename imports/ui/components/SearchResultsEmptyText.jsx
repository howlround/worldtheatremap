import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class SearchResultsEmptyText extends React.Component {
  render() {
    return (
      <span className="search-results-message">
        <h3>
          <FormattedMessage
            id='search.emptyText'
            description='Empty text for search results'
            defaultMessage='No results'
          />
        </h3>
      </span>
    );
  }
}

export default injectIntl(SearchResultsEmptyText);
