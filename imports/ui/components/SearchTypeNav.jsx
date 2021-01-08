import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class SearchTypeNav extends React.Component {
  render() {
    const { locale } = this.props.intl;

    return (
      <ul className="search-type">
        <li>
          <Link
            to={{
              pathname: `/${locale}/search/profiles`,
              query: {
                '_escaped_fragment_': '',
              },
            }}
            activeClassName="active"
          >
            <FormattedMessage
              id="searchNav.profiles"
              description="Profile Search Tab"
              defaultMessage="Profiles"
            />
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: `/${locale}/search/shows`,
              query: {
                '_escaped_fragment_': '',
              },
            }}
            activeClassName="active"
          >
            <FormattedMessage
              id="searchNav.shows"
              description="Show Search Tab"
              defaultMessage="Shows"
            />
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: `/${locale}/search/festivals`,
              query: {
                '_escaped_fragment_': '',
              },
            }}
            activeClassName="active"
          >
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
