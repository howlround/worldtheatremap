import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import {
  updateName,
  remove,
} from '../../api/profiles/methods.js';
import { profileSchema } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.profile,
    };

    this.throttledUpdate = _.throttle(newProfile => {
      if (newProfile) {
        updateName.call({
          profileId: this.props.profile._id,
          newProfile,
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
    const newProfile = this.refs.form.getValue();
    if (newProfile) {
      this.throttledUpdate(newProfile);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.profile._id, false);
    }
  }

  defaultOptions() {
    return {
      fields: {
        name: {
          attrs: {
            className: 'profile-name-edit',
          },
          error: 'Name is required',
        },
        about: {
          type: 'textarea',
          attrs: {
            rows: '10',
            className: 'profile-about-edit',
          },
        },
      },
    };
  }

  render() {
    const { profile } = this.props;
    const formOptions = this.defaultOptions();

    return (
      <form className="profile-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={profileSchema}
          value={this.state.profile}
          options={formOptions}
        />

        <button
          type="submit"
          className="edit-profile-save"
        >Save</button>
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
