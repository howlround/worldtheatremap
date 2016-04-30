import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import {
  updateName,
  remove,
} from '../../api/profiles/methods.js';
import t from 'tcomb-form';

const Form = t.form.Form;

const FormSchema = t.struct({
  name: t.String,         // a required string
})

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.profile,
    };

    this.throttledUpdate = _.throttle(value => {
      if (value) {
        updateName.call({
          profileId: this.props.profile._id,
          name: value,
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
    const value = this.refs.form.getValue();
    if (value) {
      this.throttledUpdate(value.name);
    }

    this.props.onEditingChange(this.props.profile._id, false);
  }

  render() {
    const { profile } = this.props;
    const formOptions = {
      fields: {
        name: {
          attrs: {
            className: 'profile-name'
          }
        }
      }
    };

    return (
      <form className="edit-profile" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={FormSchema}
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
