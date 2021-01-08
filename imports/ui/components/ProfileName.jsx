import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { intlShape, injectIntl } from 'react-intl';

class ProfileName extends React.Component {
  render() {
    const { profileName, profileId, defaultName, profileExists, noLinks } = this.props;
    const { locale } = this.props.intl;

    const classNames = {
      'profile-name': true,
      'profile-exists': profileExists,
    }

    let output = '';
    if (!profileExists) {
      output = defaultName;
    } else if (noLinks) {
      output = profileName.name;
    } else {
      output = (<Link to={{
        pathname: `/${locale}/profiles/${ profileId }`,
        query: {
          '_escaped_fragment_': '',
        },
      }} className="show-author">
        {profileName.name}
      </Link>);
    }

    return (
      <span className={classnames(classNames)}>
        {output}
      </span>
    );
  }
}

ProfileName.propTypes = {
  profileName: React.PropTypes.object,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ProfileName.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ProfileName);
