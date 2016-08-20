import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert, update } from '../../api/events/methods.js';
import { eventSchema, defaultFormOptions } from '../../api/events/events.js';
import { Shows } from '../../api/shows/shows.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class EventEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: this.props.event,
    };

    this.throttledUpdate = _.throttle(newEvent => {
      if (newEvent) {
        update.call({
          eventId: this.props.event._id,
          newEvent,
        }, displayError);
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formValues = this.refs.form.getValue();
    let newEvent = this.state.event;

    if (newEvent && formValues) {
      newEvent.about = formValues.about;
      newEvent.eventType = formValues.eventType;

      this.throttledUpdate(newEvent);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.event._id, false);
      const { router } = this.context;
      router.push(`/events/${ this.props.event._id }`);
    }
  }

  onChange(value, path) {
    // @TODO: Merge with EventEdit.jsx
    if (path[0] == 'show' && path[1] == 'name') {
      const search = value.show.name;
      const resultsElement = $('.form-group-show-name').siblings('ul.autocomplete-results');

      // Search for profiles and save to ul.event-show-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.show.id = '';
        this.setState({event: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Shows.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        resultsElement.html('');

        if (results.length > 0) {
          results.map(show => {
            resultsElement.append('<li><b>' + show.name + '</b> (' + show._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                // Set the show state to the selected show
                newValue.show = show;
                // We are using 'id' without the underscore later so
                // manually specify that
                // @TODO: Refactor to only use the _id
                newValue.show.id = show._id;

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
        $('ul.autocomplete-results').html('');
      }
    }
  }

  render() {
    const formOptions = defaultFormOptions();
    return (
      <form className="event-edit-form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off" >
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

EventEdit.propTypes = {
  event: React.PropTypes.object,
};

EventEdit.contextTypes = {
  router: React.PropTypes.object,
};
