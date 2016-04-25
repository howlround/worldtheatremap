import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Profile component - represents a single todo item
export default class Profile extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('profiles.setChecked', this.props.profile._id, !this.props.profile.checked);
  }

  deleteThisProfile() {
    Meteor.call('profiles.remove', this.props.profile._id);
  }

  togglePrivate() {
    Meteor.call('profiles.setPrivate', this.props.profile._id, ! this.props.profile.private);
  }

  render() {
    // Give profiles a different className when they are checked off,
    // so that we can style them nicely in CSS
    const profileClassName = classnames({
      checked: this.props.profile.checked,
      private: this.props.profile.private,
    });

    return (
      <li className={profileClassName}>
        <button className="delete" onClick={this.deleteThisProfile.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.profile.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.profile.private ? 'Private' : 'Public' }
          </button>
        ) : '' }

        <span className="text">
          <strong>{this.props.profile.username}</strong>: {this.props.profile.name}
        </span>
      </li>
    );
  }
}

Profile.propTypes = {
  // This component gets the profile to display through a React prop.
  // We can use propTypes to indicate it is required
  profile: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
