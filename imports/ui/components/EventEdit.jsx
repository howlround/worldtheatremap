import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import {
  update,
  remove,
} from '../../api/events/methods.js';
import { eventSchema, defaultFormOptions } from '../../api/events/events.js';
import { Profiles } from '../../api/profiles/profiles.js';
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

    // this.updateEvent = this.updateEvent.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, path) {
    // @TODO: Merge with EventEdit.jsx
    if (path[0] == 'author' && path[2] == 'name') {
      const search = value.author[path[1]].name;
      const element = $('.form-group-author-' + path[1] + '-name').siblings('ul.event-author-edit-results');

      // Search for profiles and save to ul.event-author-edit-result
      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.author[path[1]].id = '';
        this.setState({event: clearValue});

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
                this.setState({event: newValue});

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
        $('ul.event-author-edit-results').html('');
      }
    }
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

  render() {
    const { event } = this.props;
    const formOptions = defaultFormOptions();

    return (
      <form className="event-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={eventSchema}
          value={this.state.event}
          options={formOptions}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-event-save"
        >Save</button>
      </form>
    );
  }
}

EventEdit.propTypes = {
  event: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

EventEdit.contextTypes = {
  router: React.PropTypes.object,
};
