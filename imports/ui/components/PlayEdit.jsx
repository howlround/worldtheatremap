import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import {
  updateName,
  remove,
} from '../../api/plays/methods.js';
import { playSchema, defaultFormOptions } from '../../api/plays/plays.js';
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
        updateName.call({
          playId: this.props.play._id,
          newPlay,
        }, displayError);
      }
    }, 300);

    // this.updatePlay = this.updatePlay.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPlay = this.refs.form.getValue();
    if (newPlay) {
      this.throttledUpdate(newPlay);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.play._id, false);
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
