import React from 'react';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';
import { insert } from '../../api/participants/methods.js';
import { displayError } from '../helpers/errors.js';
import { participantFormSchema, defaultFormOptions } from '../../api/participants/participants.js';
import { Profiles } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      participant: {
        profile: [
          {}
        ]
      }
    };

    this.throttledAdd = _.throttle(newParticipant => {
      if (newParticipant) {
        const eventId = this.props.event._id;
        const newID = insert.call({
          newParticipant,
          eventId,
        }, displayError);

        return newID;
      }
    }, 300);

    // this.createNewParticipant = this.createNewParticipant.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderParticipantAdd = this.renderParticipantAdd.bind(this);
    this.renderParticipantEdit = this.renderParticipantEdit.bind(this);
  }

  // createNewParticipant() {
  //   const newId = insert.call((err) => {
  //     if (err) {
  //       // eslint-disable no-alert
  //       alert('Could not create participant.');
  //     }
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();
    const newParticipant = this.refs.form.getValue();
    if (newParticipant) {
      const newID = this.throttledAdd(newParticipant);

      if (newID) {
        this.setState({
          participant: {
            profile: [
              {}
            ]
          }
        });
      }
    }
  }

  onChange(value, path) {
    // @TODO: Merge with PlayEdit.jsx
    if (path[0] == 'profile' && path[1] == 'name') {
      const search = value.profile.name;
      const resultsElement = $('.form-group-profile-name').siblings('ul.autocomplete-results');

      if (search.length > 0) {
        // Clear any existing stored values
        const clearValue = value;
        clearValue.profile.id = '';
        this.setState({participant: clearValue});

        const regex = new RegExp('.*' + search + '.*', 'i');
        const results = Profiles.find({name: { $regex: regex }}, {limit: 5}).fetch();

        // Clear fields
        resultsElement.html('');

        if (results.length > 0) {
          results.map(profile => {
            resultsElement.append('<li><b>' + profile.name + '</b> (' + profile._id + ')</li>').find('li:last-child').click(() => {
                const newValue = value;
                newValue.profile.name = profile.name;
                newValue.profile.id = profile._id;
                this.setState({participant: newValue});

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

  renderParticipantAdd() {
    const formOptions = defaultFormOptions();
    const { participant } = this.state;

    return (
      <form className="participant-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={participantFormSchema}
          value={participant}
          options={formOptions}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-participant-save"
        >Save</button>
      </form>
    );
  }

  renderParticipantEdit() {

  }

  render() {
    const { event, user, participantsByEvent } = this.props;

    const editLink = user ?
      <Link
        to={`/events/${ event._id }/edit`}
        key={event._id}
        title={event.name}
        className="edit-link"
        activeClassName="active"
        onChange={this.onChange}
      >
        Edit
      </Link>
    : '';

    // @TODO: Abstract this to a function or component to reduce duplication in EventTeaser.jsx
    // const authors = event.author.map((author, index, array) => {
    //   let seperator = ', ';
    //   if (index == array.length - 1) {
    //     seperator = '';
    //   }
    //   else if (index == array.length - 2) {
    //     seperator = ' and ';
    //   }
    //   return <span key={author.id}><Link to={`/profiles/${ author.id }`} className="event-author">{author.name}</Link>{seperator}</span>
    // });
    const authors = '';

    let participants;
    if (participantsByEvent.length > 0) {
      participants = participantsByEvent.map(participant => {
        return <li key={participant._id} className="event-participant-list-item">
          <h3 className="event-participant-name">
            <Link
              to={`/profiles/${ participant.profile.id }`}
              title={participant.profile.name}
            >
              {participant.profile.name}
            </Link>
          </h3>
          <div className="event-participant-role">{participant.role}</div>
        </li>
      })
    }

    return (
      <article className="event full">
        <section className="event-main-info">
          <h1 className="event-name page-title">
            Event for <Link
              to={`/plays/${ event.play[0].id }`}
              title={event.play[0].name}
            >
              {event.play[0].name}
            </Link>
          </h1>
          <div className="event-authorship">
            by {authors}
          </div>
          {editLink}
        </section>
        {event.about ?
          <section className="event-about">
            <h2>About</h2>
            {/*<div dangerouslySetInnerHTML={{__html: event.about}} />*/}
            {event.about}
            {editLink}
          </section> : ''
        }
        <section>
          <h2>12 Artists</h2>
          { user ? this.renderParticipantAdd() : '' }
          {/* Link to add a new event participant */}
          <ul className="event-participant-list">
            { participants }
          </ul>
        </section>
      </article>
    );
  }
}

Event.propTypes = {
  event: React.PropTypes.object,
  user: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
  participantsByEvent: React.PropTypes.array,
};

Event.contextTypes = {
  router: React.PropTypes.object,
};
