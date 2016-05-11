import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/plays/methods.js';
import { playSchema, defaultFormOptions } from '../../api/plays/plays.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class PlayAdd extends React.Component {
  constructor(props) {
    super(props);

    this.throttledAdd = _.throttle(newPlay => {
      if (newPlay) {
        const newID = insert.call({
          newPlay,
        }, displayError);

        return newID;
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
      const newID = this.throttledAdd(newPlay);

      // Redirect
      this.context.router.push(`/plays/${ newID }`);
    }
  }

  render() {
    const formOptions = defaultFormOptions();

    return (
      <form className="play-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={playSchema}
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

// PlayAdd.propTypes = {
//   play: React.PropTypes.object,
// };

PlayAdd.contextTypes = {
  router: React.PropTypes.object,
};
