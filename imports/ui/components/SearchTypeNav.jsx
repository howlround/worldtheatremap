import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

export default class SearchTypeNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="search-type">
        <li>
          <Link to="/search/profiles" activeClassName="active">
            <FormattedMessage
              id="searchNav.profiles"
              description="Profile Search Tab"
              defaultMessage="Profiles"
            />
          </Link>
        </li>
        <li>
          <Link to="/search/events" activeClassName="active">
            <FormattedMessage
              id="searchNav.events"
              description="Event Search Tab"
              defaultMessage="Events"
            />
          </Link>
        </li>
        <li>
          <Link to="/search/shows" activeClassName="active">
            <FormattedMessage
              id="searchNav.shows"
              description="Show Search Tab"
              defaultMessage="Shows"
            />
          </Link>
        </li>
      </ul>
    );
  }
}
