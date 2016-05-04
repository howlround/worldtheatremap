import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/profiles/methods.js';
import { profileSchema, defaultFormOptions } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ProfileAdd extends React.Component {
  constructor(props) {
    super(props);

    this.throttledAdd = _.throttle(newProfile => {
      if (newProfile) {
        const newID = insert.call({
          newProfile,
        }, displayError);

        return newID;
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
      const newID = this.throttledAdd(newProfile);

      // Redirect
      this.context.router.push(`/profiles/${ newID }`);
    }
  }

  render() {
    const formOptions = defaultFormOptions();

    return (
      <form className="profile-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={profileSchema}
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

// ProfileAdd.propTypes = {
//   profile: React.PropTypes.object,
// };

ProfileAdd.contextTypes = {
  router: React.PropTypes.object,
};
