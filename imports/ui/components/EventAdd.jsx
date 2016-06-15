import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/events/methods.js';
import { eventSchema, defaultFormOptions } from '../../api/events/events.js';
import { Plays } from '../../api/plays/plays.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class EventAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {
        play: [
          {}
        ]
      }
    };

    this.throttledAdd = _.throttle(newEvent => {
      if (newEvent) {
        const newID = insert.call({
          newEvent,
        }, displayError);

        return newID;
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formValues = this.refs.form.getValue();
    let newEvent = this.state.event;

    newEvent.about = formValues.about;
    if (newEvent) {
      const newID = this.throttledAdd(newEvent);

      // Redirect
      this.context.router.push(`/events/${ newID }`);
    }
  }

  onChange(value, path) {
    // @TODO: Merge with EventEdit.jsx
    if (path[0] == 'play' && path[2] == 'name') {
      const search = value.play[path[1]].name;
      const resultsElement = $('.form-group-play-' + path[1] + '-name').siblings('ul.event-play-edit-results');

      // Search for profiles and save to ul.event-play-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.play[path[1]].id = '';
        this.setState({event: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Plays.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        resultsElement.html('');

        if (results.length > 0) {
          results.map(show => {
            resultsElement.append('<li><b>' + show.name + '</b> (' + show._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                // Set the show state to the selected show
                newValue.play[path[1]] = show;
                // We are using 'id' without the underscore later so
                // manually specify that
                newValue.play[path[1]].id = show._id;
                newValue.play[path[1]]._id = null;

                this.setState({event: newValue});

                // Clear fields
                resultsElement.html('');
            });
          });
        }
        else {
          // @TODO: Add new profile workflow
        }
      }
      else {
        $('ul.event-play-edit-results').html('');
      }
    }
  }

  render() {
    const formOptions = defaultFormOptions();
    return (
      <form className="event-edit-form" onSubmit={this.handleSubmit.bind(this)} autocomplete="off" >
        <Form
          ref="form"
          type={eventSchema}
          options={formOptions}
          value={this.state.event}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button
            type="submit"
            className="edit-event-save">
            Save
          </button>
        </div>
      </form>
    )
  }
}

// EventAdd.propTypes = {
//   event: React.PropTypes.object,
// };

EventAdd.contextTypes = {
  router: React.PropTypes.object,
};
