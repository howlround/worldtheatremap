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

    this.state = this.props.event;

    this.throttledUpdate = _.throttle(newEvent => {
      if (newEvent) {
        update.call({
          eventId: this.props.event._id,
          newEvent,
        }, displayError);
      }
    }, 300);

    this.initGoogleMap = this.initGoogleMap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initGoogleMap();
  }

  componentDidUpdate() {
    this.initGoogleMap();
  }

  initGoogleMap() {
    // @TODO: Find a way to unify with ProfileEdit.jsx
    if (GoogleMaps.loaded()) {
      if ($('.form-group-lat.find-pin-processed').length == 0) {
        // $('.form-group-lat').hide();
        // $('.form-group-lon').hide();
        let initMapLocation = [ 0, 0 ];
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(showPosition);
        // }
        // function showPosition(position) {
        //   initMapLocation = [ position.coords.latitude, position.coords.longitude ];
        // }

        $('<div></div>').addClass('form-group profile-geographic-location-edit').insertBefore('.form-group-lat');
        $('<div></div>').addClass('find-pin-map').prependTo('.profile-geographic-location-edit').width('100%').height('300px');
        $('<input></input>').addClass('find-pin').attr({'type': 'text'}).prependTo('.profile-geographic-location-edit').geocomplete({
          map: ".find-pin-map",
          details: "form ",
          detailsAttribute: "data-geo",
          markerOptions: {
            draggable: true
          },
          mapOptions: {
            zoom: 2
          },
          location: initMapLocation
        });
        $('<label></label>').text('Set Map Pin (optional)').prependTo('.profile-geographic-location-edit');

        $('.find-pin').bind("geocode:dragged", (event, latLng) => {
          let updatedEvent = _.extend({}, this.state);
          const newLat = latLng.lat();
          const newLon = latLng.lng();
          updatedEvent.lat = newLat.toString();
          updatedEvent.lon = newLon.toString();
          this.setState(updatedEvent);
        });

        $('.find-pin').bind("geocode:result", (event, result) => {
          let updatedEvent = _.extend({}, this.state);
          const newLat = result.geometry.location.lat();
          const newLon = result.geometry.location.lng();
          updatedEvent.lat = newLat.toString();
          updatedEvent.lon = newLon.toString();
          this.setState(updatedEvent);
        });

        $('.find-pin').trigger("geocode");

        // Don't process again
        $('.form-group-lat').addClass('find-pin-processed');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formValues = this.refs.form.getValue();
    let newEvent = this.state;

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
    this.setState(value);
  }

  render() {
    const formOptions = defaultFormOptions();
    return (
      <form className="event-edit-form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off" >
        <Form
          ref="form"
          type={eventSchema}
          options={formOptions}
          value={this.state}
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
