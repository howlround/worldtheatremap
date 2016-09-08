import React from 'react';
import { Link } from 'react-router';

export default class SearchTypeNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="search-type">
        <li><Link to="/search/profiles" activeClassName="active">Profiles</Link></li>
        <li><Link to="/search/events" activeClassName="active">Events</Link></li>
        <li><Link to="/search/shows" activeClassName="active">Shows</Link></li>
      </ul>
    );
  }
}
