import React from 'react';
import classnames from 'classnames';

class ProfileName extends React.Component {
  render() {
    const { profileName, profileExists } = this.props;

    const classNames = {
      'profile-name': true,
      'profile-exists': profileExists,
    }

    return (
      <span className={classNames}>
        {profileExists ?
          profileName.name
          : ''
        }
      </span>
    );
  }
}

ProfileName.propTypes = {
  profileName: React.PropTypes.object,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
};

ProfileName.contextTypes = {
  router: React.PropTypes.object,
};

export default ProfileName;
