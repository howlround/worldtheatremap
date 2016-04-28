import React from 'react';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import {
  updateName,
  remove,
} from '../../api/profiles/methods.js';

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.throttledUpdate = _.throttle(value => {
      console.log(value);
      if (value) {
        updateName.call({
          profileId: this.props.profile._id,
          newName: value,
        }, displayError);
      }
    }, 300);

    this.updateProfile = this.updateProfile.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.props.onEditingChange(this.props.profile._id, true);
  }

  onBlur(event) {
    this.props.onEditingChange(this.props.profile._id, false);
    this.throttledUpdate(event.target.value);
  }

  updateProfile(event) {
    // this.throttledUpdate(event.target.value);
  }

  render() {
    const { profile } = this.props;
    return (
      <input
        type="text"
        defaultValue={profile.name}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.updateProfile}
      />
    );
  }
}

ProfileEdit.propTypes = {
  profile: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

ProfileEdit.contextTypes = {
  router: React.PropTypes.object,
};
