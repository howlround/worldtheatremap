import React from 'react';

// Utilities
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

class ShowName extends React.Component {
  render() {
    const { showName, showId, defaultName, showExists } = this.props;
    const { locale } = this.props.intl;

    let output = '';
    if (!showExists) {
      // Show has been deleted
      output = defaultName;
    } else {
      output = (<Link
        to={{
          pathname: `/${locale}/shows/${ showId }`,
          query: {
            '_escaped_fragment_': '',
          },
        }}
        title={showName.name}
      >
        {showName.name}
      </Link>);
    }

    return (
      <span className="show-name">
        {output}
      </span>
    );
  }
}

ShowName.propTypes = {
  showName: React.PropTypes.object,
  defaultName: React.PropTypes.string,
  loading: React.PropTypes.bool,
  showExists: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ShowName.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowName);
