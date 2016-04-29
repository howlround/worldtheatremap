import React from 'react';
import ReactDOM from 'react-dom';
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
      if (value) {
        updateName.call({
          profileId: this.props.profile._id,
          newName: value,
        }, displayError);
      }
    }, 300);

    // this.updateProfile = this.updateProfile.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onEditingChange(this.props.profile._id, false);
    this.throttledUpdate(ReactDOM.findDOMNode(this.refs.name).value.trim());
  }

  render() {
    const { profile } = this.props;
    return (
      <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="name"
          defaultValue={profile.name}
          className="profile-name"
        />
        <input
          type="submit"
          value="Save"
          className="edit-profile-save"
        />
      </form>
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
