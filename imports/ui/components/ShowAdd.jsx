// Utilities
import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { displayError } from '../helpers/errors.js';
import t from 'tcomb-form';

// API
import { insert } from '../../api/shows/methods.js';
import { showSchema, defaultFormOptions } from '../../api/shows/shows.js';
import { insert as insertProfile } from '../../api/profiles/methods.js';
import { Profiles } from '../../api/profiles/profiles.js';

const Form = t.form.Form;

class ShowAdd extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props.intl;

    this.state = {
      name: this.props.defaultName,
      author: [ null ],
    };

    this.throttledAdd = _.throttle(newShow => {
      if (newShow) {
        const newID = insert.call({
          newShow,
          locale,
        }, displayError);

        return newID;
      }
    }, 300);

    this.throttledAddProfile = _.throttle(newProfile => {
      if (newProfile) {
        const newID = insertProfile.call({
          newProfile,
        }, displayError);

        return newID;
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { showCallback } = this.props;
    const newShow = this.refs.form.getValue();
    if (newShow) {
      const newID = this.throttledAdd(newShow);

      const callbackShowObj = {
        _id: newID,
        name: newShow.name,
        author: newShow.author,
      }

      if (showCallback) {
        showCallback(callbackShowObj);
      } else {
        // Redirect
        this.context.router.push(`/shows/${ newID }`);
      }
    }
  }

  onChange(value, path) {
    this.setState(value);
  }

  render() {
    const formOptions = defaultFormOptions();

    return (
      <form className="show-edit-form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off" >
        <h1>
          <FormattedMessage
            id="show.showAddPageTitle"
            description="Heading above affiliation form on events"
            defaultMessage="Add a New Show"
          />
        </h1>
        <Form
          ref="form"
          type={showSchema}
          options={formOptions}
          value={this.state}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button
            type="submit"
            className="edit-show-save">
            Create Show
          </button>
        </div>
      </form>
    )
  }
}

ShowAdd.propTypes = {
  showCallback: React.PropTypes.func,
  defaultName: React.PropTypes.string,
  intl: intlShape.isRequired,
};

ShowAdd.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowAdd);
