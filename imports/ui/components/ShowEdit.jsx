import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage } from 'react-intl';
import {
  update,
  remove,
} from '../../api/shows/methods.js';
import { showSchema, defaultFormOptions } from '../../api/shows/shows.js';
import { Profiles } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ShowEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show,
    };

    this.throttledUpdate = _.throttle(newShow => {
      if (newShow) {
        update.call({
          showId: this.props.show._id,
          newShow,
        }, displayError);
      }
    }, 300);

    // this.updateShow = this.updateShow.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, path) {
    // @TODO: Merge with ShowEdit.jsx
    if (path[0] == 'author' && path[2] == 'name') {
      const search = value.author[path[1]].name;
      const element = $('.form-group-author-' + path[1] + '-name').siblings('ul.autocomplete-results');

      // Search for profiles and save to ul.show-author-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.author[path[1]]._id = '';
        this.setState({show: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Profiles.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        element.html('');

        if (results.length > 0) {
          results.map(profile => {
            element.append('<li><b>' + profile.name + '</b> (' + profile._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                newValue.author[path[1]].name = profile.name;
                newValue.author[path[1]]._id = profile._id;
                this.setState({show: newValue});

                // Clear fields
                element.html('');
            });
          });
        }
        else {
          // @TODO: Add new profile workflow
        }
      }
      else {
        $('ul.autocomplete-results').html('');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newShow = this.refs.form.getValue();
    if (newShow) {
      this.throttledUpdate(newShow);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.show._id, false);
      const { router } = this.context;
      router.push(`/shows/${ this.props.show._id }`);
    }
  }

  render() {
    const { show } = this.props;
    const formOptions = defaultFormOptions();

    return (
      <form className="show-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={showSchema}
          value={this.state.show}
          options={formOptions}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-show-save"
        >
          <FormattedMessage
            id='buttons.save'
            description='Generic save button'
            defaultMessage='Save'
          />
        </button>
      </form>
    );
  }
}

ShowEdit.propTypes = {
  show: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

ShowEdit.contextTypes = {
  router: React.PropTypes.object,
};
