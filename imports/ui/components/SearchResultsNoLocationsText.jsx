import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class SearchResultsNoLocationsText extends React.Component {
  render() {
    return (
      <span className="search-results-message">
        <h3>
          <FormattedMessage
            id='search.noLocationsText'
            description='Text for search results without locations'
            defaultMessage='There are results but none have locations to display on the map'
          />
        </h3>
      </span>
    );
  }
}

export default injectIntl(SearchResultsNoLocationsText);
