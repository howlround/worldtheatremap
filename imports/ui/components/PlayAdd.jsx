import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/plays/methods.js';
import { playSchema, defaultFormOptions } from '../../api/plays/plays.js';
import { Profiles } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';
import Autosuggest from 'react-autosuggest';

const Form = t.form.Form;

export default class PlayAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      play: {
        author: [
          {}
        ]
      }
    };

    this.throttledAdd = _.throttle(newPlay => {
      if (newPlay) {
        const newID = insert.call({
          newPlay,
        }, displayError);

        return newID;
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPlay = this.refs.form.getValue();
    if (newPlay) {
      const newID = this.throttledAdd(newPlay);

      // Redirect
      this.context.router.push(`/plays/${ newID }`);
    }
  }

  onChange(value, path) {
    this.setState({ value })
  }

  render() {
    const formOptions = defaultFormOptions();
    return (
      <form className="play-edit-form" onSubmit={this.handleSubmit.bind(this)} autocomplete="off" >
        <t.form.Form
          ref="form"
          type={playSchema}
          options={formOptions}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button
            type="submit"
            className="edit-play-save">
            Save
          </button>
        </div>
      </form>
    )
  }
}

// PlayAdd.propTypes = {
//   play: React.PropTypes.object,
// };

PlayAdd.contextTypes = {
  router: React.PropTypes.object,
};
