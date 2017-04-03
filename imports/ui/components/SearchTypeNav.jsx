import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class SearchTypeNav extends React.Component {
  render() {
    const { locale } = this.props.intl;

    return (
      <ul className="search-type">
        <li>
          <Link to={`/${locale}/search/profiles`} activeClassName="active">
            <FormattedMessage
              id="searchNav.profiles"
              description="Profile Search Tab"
              defaultMessage="Profiles"
            />
          </Link>
        </li>
        <li>
          <Link to={`/${locale}/search/events`} activeClassName="active">
            <FormattedMessage
              id="searchNav.events"
              description="Event Search Tab"
              defaultMessage="Events"
            />
          </Link>
        </li>
        <li>
          <Link to={`/${locale}/search/shows`} activeClassName="active">
            <FormattedMessage
              id="searchNav.shows"
              description="Show Search Tab"
              defaultMessage="Shows"
            />
          </Link>
        </li>
        <li>
          <Link to={`/${locale}/search/festivals`} activeClassName="active">
            <FormattedMessage
              id="searchNav.festivals"
              description="Festival Search Tab"
              defaultMessage="Festivals"
            />
          </Link>
        </li>
      </ul>
    );
  }
}

SearchTypeNav.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchTypeNav);
