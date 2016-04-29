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

  triggerEdit(event) {
    event.preventDefault();

    this.props.onEditingChange(this.props.profile._id, true);
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <h1 className="profile-name page-title">{profile.name}</h1>
        <Link
          to={`/profiles/${ profile._id }`}
          key={profile._id}
          title={profile.name}
          className="edit-profile"
          activeClassName="active"
          onClick={this.triggerEdit.bind(this)}
        >
          Edit
        </Link>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};
