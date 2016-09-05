import React from 'react';
import { _ } from 'meteor/underscore';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';

export default class SearchEventsResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results, loading } = this.props;
    if (!loading && !_.isEmpty(results)) {
      return(
        <ul className="search-results">
          { results.map(event => (
            <li key={event._id}>
              <EventTeaserWithShow event={event} />
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

SearchEventsResults.contextTypes = {
  router: React.PropTypes.object,
};

SearchEventsResults.propTypes = {
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
