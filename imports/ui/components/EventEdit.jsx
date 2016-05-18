import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert, update } from '../../api/events/methods.js';
import { eventSchema, defaultFormOptions } from '../../api/events/events.js';
import { Plays } from '../../api/plays/plays.js';
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
    const newEvent = this.refs.form.getValue();
    if (newEvent) {
      this.throttledUpdate(newEvent);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.event._id, false);
      const { router } = this.context;
      router.push(`/events/${ this.props.event._id }`);
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
          results.map(profile => {
            resultsElement.append('<li><b>' + profile.name + '</b> (' + profile._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                newValue.play[path[1]].name = profile.name;
                newValue.play[path[1]].id = profile._id;
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

EventEdit.propTypes = {
  event: React.PropTypes.object,
};

EventEdit.contextTypes = {
  router: React.PropTypes.object,
};
