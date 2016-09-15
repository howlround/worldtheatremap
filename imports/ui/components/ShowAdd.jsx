import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/shows/methods.js';
import { showSchema, defaultFormOptions } from '../../api/shows/shows.js';
import { insert as insertProfile } from '../../api/profiles/methods.js';
import { Profiles } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ShowAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: {
        author: [
          {}
        ]
      }
    };

    this.throttledAdd = _.throttle(newShow => {
      if (newShow) {
        const newID = insert.call({
          newShow,
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
    const newShow = this.refs.form.getValue();
    if (newShow) {
      const newID = this.throttledAdd(newShow);

      // Redirect
      this.context.router.push(`/shows/${ newID }`);
    }
  }

  onChange(value, path) {
    // @TODO: Merge with ShowEdit.jsx
    if (path[0] == 'author' && path[2] == 'name') {
      const search = value.author[path[1]].name;
      const resultsElement = $('.form-group-author-' + path[1] + '-name').siblings('ul.autocomplete-results');

      // Search for profiles and save to ul.show-author-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.author[path[1]]._id = '';
        this.setState({show: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Profiles.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        resultsElement.html('');

        if (results.length > 0) {
          results.map(profile => {
            resultsElement.append('<li><b>' + profile.name + '</b> (' + profile._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                newValue.author[path[1]].name = profile.name;
                newValue.author[path[1]]._id = profile._id;
                this.setState({show: newValue});

                // Clear fields
                resultsElement.html('');
            });
          });
        }
        else {
          // Add new profile workflow
          resultsElement.append('<li>Add Profile for <b>' + search + '</b>?</li>').find('li:last-child').click(() => {
            // Build a new profile object
            const newProfile = {
              name: search,
            }
            // Save profile to DB
            const newProfileID = this.throttledAddProfile(newProfile);
            // Save the new profile to the new show state
            const newValue = value;
            newValue.author[path[1]].name = search;
            newValue.author[path[1]]._id = newProfileID;
            this.setState({show: newValue});

            // Clear fields
            resultsElement.html('');
          });
        }
      }
      else {
        $('ul.autocomplete-results').html('');
      }
    }
  }

  render() {
    const formOptions = defaultFormOptions();
    return (
      <form className="show-edit-form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off" >
        <Form
          ref="form"
          type={showSchema}
          options={formOptions}
          value={this.state.show}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button
            type="submit"
            className="edit-show-save">
            Save
          </button>
        </div>
      </form>
    )
  }
}

// ShowAdd.propTypes = {
//   show: React.PropTypes.object,
// };

ShowAdd.contextTypes = {
  router: React.PropTypes.object,
};
