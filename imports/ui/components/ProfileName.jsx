import React from 'react';

class ProfileName extends React.Component {
  render() {
    const { profileName, profileExists } = this.props;

    return (
      <span>
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
