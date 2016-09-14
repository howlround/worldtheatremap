import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
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

        $('<div></div>').addClass('form-group form-group-depth-1 profile-geographic-location-edit').insertBefore('.form-group-lat');
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
        $('<label></label>').text('Set Map Pin (required)').prependTo('.profile-geographic-location-edit');

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

          _.each(result.address_components, (comp) => {
            updatedEvent[comp.types[0]] = comp.long_name;
          });

          const newLat = result.geometry.location.lat();
          const newLon = result.geometry.location.lng();
          updatedEvent.lat = newLat.toString();
          updatedEvent.lon = newLon.toString();

          if (updatedEvent.street_number && updatedEvent.route) {
            updatedEvent.streetAddress = `${updatedEvent.street_number} ${updatedEvent.route}`;

            delete updatedEvent.street_number;
            delete updatedEvent.route;
          } else if (updatedEvent.route) {
            updatedEvent.streetAddress = updatedEvent.route;

            delete updatedEvent.route;
          }

          if (updatedEvent.administrative_area_level_1) {
            updatedEvent.administrativeArea = updatedEvent.administrative_area_level_1;

            delete updatedEvent.administrative_area_level_1;
          }

          if (updatedEvent.postal_code) {
            updatedEvent.postalCode = updatedEvent.postal_code;

            delete updatedEvent.postal_code;
          }

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
            <FormattedMessage
              id='buttons.save'
              description='Generic save button'
              defaultMessage='Save'
            />
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
