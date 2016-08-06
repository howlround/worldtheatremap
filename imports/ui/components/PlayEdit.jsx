import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import {
  update,
  remove,
} from '../../api/plays/methods.js';
import { playSchema, defaultFormOptions } from '../../api/plays/plays.js';
import { Profiles } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class PlayEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: this.props.play,
    };

    this.throttledUpdate = _.throttle(newPlay => {
      if (newPlay) {
        update.call({
          playId: this.props.play._id,
          newPlay,
        }, displayError);
      }
    }, 300);

    // this.updatePlay = this.updatePlay.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, path) {
    // @TODO: Merge with PlayEdit.jsx
    if (path[0] == 'author' && path[2] == 'name') {
      const search = value.author[path[1]].name;
      const element = $('.form-group-author-' + path[1] + '-name').siblings('ul.autocomplete-results');

      // Search for profiles and save to ul.play-author-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.author[path[1]].id = '';
        this.setState({play: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Profiles.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        element.html('');

        if (results.length > 0) {
          results.map(profile => {
            element.append('<li><b>' + profile.name + '</b> (' + profile._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                newValue.author[path[1]].name = profile.name;
                newValue.author[path[1]].id = profile._id;
                this.setState({play: newValue});

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
    const newPlay = this.refs.form.getValue();
    if (newPlay) {
      this.throttledUpdate(newPlay);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.play._id, false);
      const { router } = this.context;
      router.push(`/plays/${ this.props.play._id }`);
    }
  }

  render() {
    const { play } = this.props;
    const formOptions = defaultFormOptions();

    return (
      <form className="play-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={playSchema}
          value={this.state.play}
          options={formOptions}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-play-save"
        >Save</button>
      </form>
    );
  }
}

PlayEdit.propTypes = {
  play: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

PlayEdit.contextTypes = {
  router: React.PropTypes.object,
};
