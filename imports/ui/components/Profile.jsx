import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/profiles/methods.js';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.createNewProfile = this.createNewProfile.bind(this);
  }

  createNewProfile() {
    const { router } = this.context;
    const listId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create list.');
      }
    });
    router.push(`/profiles/${ listId }`);
  }

  render() {
    const { profile } = this.props;
    return (
      <h1 className="profile-name page-title">{profile.name}</h1>
    );
  }
}

Profile.propTypes = {
  profile: React.PropTypes.object,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};
