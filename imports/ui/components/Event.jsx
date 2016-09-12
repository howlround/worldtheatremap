import React from 'react';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { displayError } from '../helpers/errors.js';
import { select, queue, json } from 'd3';
import topojson from 'topojson';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import t from 'tcomb-form';

import Authors from '../components/Authors.jsx';

import { insert } from '../../api/participants/methods.js';
import { participantFormSchema, defaultFormOptions } from '../../api/participants/participants.js';
import { insert as insertProfile } from '../../api/profiles/methods.js';
import { Profiles } from '../../api/profiles/profiles.js';

const Form = t.form.Form;

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      participant: {
        profile: {}
      }
    };

    this.throttledAdd = _.throttle(newParticipant => {
      if (newParticipant) {
        // Create Participant record
        const event = this.props.event;
        const newID = insert.call({
          newParticipant,
          event,
        }, displayError);

        // Update Profile record with role info
        // @TODO: Make sure it doesn't overwrite bits that aren't set here on update
        // @TODO: Use a new method that only operates on the showsByRole array
        // updateRoles.call({
        //   profileId: newParticipant.profile.id,
        //   role: newParticipant.role,
        // }, displayError);

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

    // this.createNewParticipant = this.createNewParticipant.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderParticipantAdd = this.renderParticipantAdd.bind(this);
    this.renderParticipantEdit = this.renderParticipantEdit.bind(this);
    this.initializeD3Globe = this.initializeD3Globe.bind(this);
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.event.lat && prevProps.event.lon && this.props.event.lat && this.props.event.lon && (prevProps.event.lat !== this.props.event.lat || prevProps.event.lon !== this.props.event.lon)) {
      this.initializeD3Globe();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newParticipant = this.refs.form.getValue();
    if (newParticipant) {
      const newID = this.throttledAdd(newParticipant);

      if (newID) {
        this.setState({
          participant: {
            profile: {}
          }
        });
      }
    }
  }

  onChange(value, path) {
    this.setState({ participant: value });
  }

  renderParticipantAdd() {
    const formOptions = defaultFormOptions();
    const { participant } = this.state;

    return (
      <form className="participant-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <h3>
          <FormattedMessage
            id='event.participantFormTitle'
            description='Heading above participant form on events'
            defaultMessage='Add a New Participant'
          />
        </h3>
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
        >
          <FormattedMessage
            id='buttons.save'
            description='Generic save button'
            defaultMessage='Save'
          />
        </button>
      </form>
    );
  }

  renderParticipantEdit() {

  }

  initializeD3Globe() {
    const { event } = this.props;
    /* d3 setup */
    // Original example: https://bl.ocks.org/mbostock/4183330
    if (event.lat && event.lon) {
      const containerWidth = 200;
      const conatinerHeight = 200;
      const diameter = 196;

      const projection = geoOrthographic()
        .translate([diameter / 2 + 2, diameter / 2 + 2])
        .scale(diameter / 2)
        .clipAngle(90)
        .precision(0.6);

      const graticule = geoGraticule();

      $('#canvas').remove();
      const canvas = select("#globe").append("canvas").attr('id', 'canvas')
        .attr("width", containerWidth)
        .attr("height", conatinerHeight);

      let c = canvas.node().getContext("2d");

      let path = geoPath()
        .projection(projection)
        .context(c);

      const eventLocation = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            event.lon,
            event.lat
          ]
        }
      };

      queue()
        .defer(json, "/world-110m.json")
        .await(globeReady);

      function globeReady(error, world) {
        if (error) {
          return;
        }

        const globe = {type: "Sphere"};
        const grid = graticule();
        const land = topojson.feature(world, world.objects.land);
        var borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });

        // Set rotation
        const p = geoCentroid(eventLocation);
        const r = geoInterpolate(projection.rotate(), [-p[0]-15, -p[1]+30]);

        projection.rotate(r(1)).clipAngle(90);
        c.clearRect(0, 0, containerWidth, conatinerHeight);

        // Globe background
        c.fillStyle = "#fff8f5";
        c.beginPath();
        path(globe);
        c.fill();

        // Background Continents
        projection.clipAngle(180);
        c.fillStyle = "#c8ece9";
        c.strokeStyle = "#c8ece9";
        c.lineWidth = .5;
        c.beginPath();
        path(land);
        c.stroke();
        c.fill();

        // Background Grid
        projection.clipAngle(180);
        // c.strokeStyle = "#deffff";
        c.strokeStyle = "#68d3c84";
        c.lineWidth = .25;
        c.beginPath();
        path(grid);
        c.stroke();

        // Foreground Grid
        projection.clipAngle(90);
        // c.strokeStyle = "#ffffff";
        c.strokeStyle = "#68d3c8";
        c.lineWidth = 0.75;
        c.beginPath();
        path(grid);
        c.stroke();

        // Continents
        projection.clipAngle(90);
        c.fillStyle = "#50b2aa";
        c.beginPath();
        path(land);
        c.fill();

        // Foreground borders
        c.strokeStyle = "#50b2aa";
        c.lineWidth = .5;
        c.beginPath();
        path(borders);
        c.stroke();

        // Dot
        c.fillStyle = "#ef4606";
        c.beginPath();
        path(eventLocation);
        c.fill();

        // Globe outline
        c.strokeStyle = "#20A09";
        c.lineWidth = 2;
        c.beginPath();
        path(globe);
        c.stroke();
      }
    }
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
        <FormattedMessage
          id="ui.edit"
          description='Generic edit link'
          defaultMessage='Edit'
        />
      </Link>
    : '';

    let participants;
    let participantsTitle = '0 Participants'
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
      });

      participantsTitle = participantsByEvent.length == 1 ? participantsByEvent.length + ' Participant' : participantsByEvent.length + ' Participants';
    }

    const locationLine = [event.locality, event.administrativeArea, event.country].filter(function (val) {return val;}).join(', ');

    const articleClasses = classNames('event', 'full', {
      'with-location': event.lat && event.lon,
    });

    return (
      <article className={articleClasses}>
        <section>
          { (event.lat && event.lon) ?
            <div className="event-globe">
              <div id="globe"></div>
            </div> : ''
          }
          <div className="event-main-info">
            <h1 className="event-name page-title">
              <Link
                to={`/shows/${ event.show.id }`}
                title={event.show.name}
              >
                {event.show.name}
              </Link>
            </h1>
            <div className="event-authorship">
              <FormattedMessage
                id="show.authors"
                description='By line for authors of a show'
                defaultMessage={`by {authors}`}
                values={{ authors: <Authors authors={event.show.author} /> }}
              />
            </div>
            <div className="event-details">
              <h3 className="event-type">
                {event.eventType}
              </h3>
              { typeof locationLine != 'undefined' ?
                <div className="event-location">{ locationLine }</div> : '' }
              { event.dateRange ?
                <div className="event-date-range date">
                  { event.dateRange }
                </div> : '' }
            </div>
          </div>
          {editLink}
        </section>
        {event.about ?
          <section className="event-about">
            <h2>
              <FormattedMessage
                id='event.aboutSectionHeader'
                description='Header above about text on events'
                defaultMessage='About'
              />
            </h2>
            {/*<div dangerouslySetInnerHTML={{__html: event.about}} />*/}
            {event.about}
            {editLink}
          </section> : ''
        }
        { user || participants ?
          <section className="event-participants">
            <h2>{participantsTitle}</h2>
            <ul className="event-participant-list">
              { participants }
            </ul>
            { user ? this.renderParticipantAdd() : '' }
          </section> : ''
        }
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
