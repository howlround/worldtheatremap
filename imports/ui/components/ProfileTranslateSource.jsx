import React from 'react';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { update } from '../../api/profiles/methods.js';
import { translateFormSchema, translateSourceFormOptions } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ProfileTranslateSource extends React.Component {
  render() {
    const formOptions = translateSourceFormOptions();

    return (
      <form className="profile-edit-form">
        <Form
          ref="form"
          type={translateFormSchema}
          options={formOptions}
          value={this.props.profile}
        />
      </form>
    );
  }
}

ProfileTranslateSource.propTypes = {
  profile: React.PropTypes.object,
};
