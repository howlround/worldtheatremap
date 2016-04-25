import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import { Profiles } from '../api/profiles.js';

// Profile component - represents a single todo item
export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  deleteThisProfile() {
    Meteor.call('profiles.remove', this.props.profile._id);
  }

  render() {
    const { profile } = this.props;
    console.log(profile);

    return (
      <article>
        {this.props.params.id}
        <h1 className="profile-name">Title: {this.props.profile.name}</h1>
        <span className="text">
          <strong>{this.props.profile.username}</strong>
        </span>
      </article>
    );
  }
}

// export default createContainer(() => {
//   Meteor.subscribe('profiles');

//   return {
//     profile: Profiles.find({"name": "Favorite place theatre"}, { sort: { createdAt: -1 } }).fetch(),
//   }
// }, Profile);

Profile.propTypes = {
  profile: PropTypes.array.isRequired,
};
