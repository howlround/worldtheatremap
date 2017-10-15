import React from 'react';
import classnames from 'classnames';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

// Components
import Interests from '../components/Interests.jsx';

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
    const { formatMessage } = this.props.intl;

    const interests = (query.interests) ?
      <Interests
        interests={query.interests}
        conjunction="or"
      />
      : '';

    return (
      <h3 className="search-results-summary">
        {count} profile interested in {interests}
      </h3>
    );
  }
}

SearchProfilesResultsSummary.propTypes = {
  query: React.PropTypes.object,
  count: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfilesResultsSummary);
