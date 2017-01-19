import React from 'react';
import ReactDOM from 'react-dom';

import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { displayError } from '../helpers/errors.js';

import { insert, update } from '../../api/events/methods.js';
import { eventSchema, defaultFormOptions } from '../../api/events/forms.js';
import { Shows } from '../../api/shows/shows.js';
import { AllCountriesFactory } from '../../api/countries/countries.js';

const Form = t.form.Form;

class EventEdit extends React.Component {
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
    // @TODO: Find a way to unify with ProfileAdd.jsx, ProfileEdit.jsx, EventAdd.jsx, and EventEdit.jsx
    if (GoogleMaps.loaded()) {
      const { formatMessage } = this.props.intl;
      if ($('.form-group-lat.find-pin-processed').length === 0) {
        let initMapLocation = [0, 0];
        let initMapZoom = 2;
        if (this.state.lat && this.state.lon) {
          initMapLocation = [this.state.lat, this.state.lon];
          initMapZoom = 8;
        }

        const label = formatMessage({
          'id': 'forms.setMapPinLabel',
          'defaultMessage': 'Set Map Pin',
          'description': 'Label for the Set Map Pin field'
        });

        const required = formatMessage({
          'id': 'forms.requiredLabel',
          'defaultMessage': '(required)',
          'description': 'Addition to label indicating a field is required'
        });

        const placeholder = formatMessage({
          'id': 'forms.setMapPinPlaceholder',
          'defaultMessage': 'Enter a location',
          'description': 'Placeholder for the Set Map Pin field'
        });

        $('<div></div>').addClass('form-group form-group-depth-1 geographic-location-edit').insertBefore('.form-group-lat');
        $('<div></div>').addClass('find-pin-map').prependTo('.geographic-location-edit').width('100%').height('300px');
        $('<input></input>').addClass('find-pin').attr({'type': 'text', placeholder}).prependTo('.geographic-location-edit').geocomplete({
          map: ".find-pin-map",
          details: "form ",
          detailsAttribute: "data-geo",
          markerOptions: {
            draggable: true
          },
          mapOptions: {
            zoom: initMapZoom
          },
          location: initMapLocation
        });

        $('.form-group-lat .help-block').prependTo('.geographic-location-edit');
        $('<label></label>').html(label + ' <span class="field-label-modifier required">' + required + '</span>').prependTo('.geographic-location-edit');

        $('.find-pin').bind("geocode:dragged", (event, latLng) => {
          let updatedDoc = _.extend({}, this.state);
          const newLat = latLng.lat();
          const newLon = latLng.lng();
          updatedDoc.lat = newLat.toString();
          updatedDoc.lon = newLon.toString();
          this.setState(updatedDoc);
        });

        $('.find-pin').bind("geocode:result", (event, result) => {
          let updatedDoc = _.extend({}, this.state);

          _.each(result.address_components, (comp) => {
            updatedDoc[comp.types[0]] = comp.long_name;
          });

          const newLat = result.geometry.location.lat();
          const newLon = result.geometry.location.lng();
          updatedDoc.lat = newLat.toString();
          updatedDoc.lon = newLon.toString();

          if (updatedDoc.street_number && updatedDoc.route) {
            updatedDoc.streetAddress = `${updatedDoc.street_number} ${updatedDoc.route}`;

            delete updatedDoc.street_number;
            delete updatedDoc.route;
          } else if (updatedDoc.route) {
            updatedDoc.streetAddress = updatedDoc.route;

            delete updatedDoc.route;
          }

          if (updatedDoc.administrative_area_level_1) {
            updatedDoc.administrativeArea = updatedDoc.administrative_area_level_1;

            delete updatedDoc.administrative_area_level_1;
          }

          if (updatedDoc.postal_code) {
            updatedDoc.postalCode = updatedDoc.postal_code;

            delete updatedDoc.postal_code;
          }

          this.setState(updatedDoc);
        });

        $('.find-pin').trigger("geocode");

        // Don't process again
        $('.form-group-lat').addClass('find-pin-processed');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { locale } = this.props.intl;

    const formValues = this.refs.form.getValue();
    let newEvent = this.state;

    if (newEvent && formValues) {
      newEvent.about = formValues.about;
      newEvent.eventType = formValues.eventType;

      this.throttledUpdate(newEvent);

      // Only change editing state if validation passed
      this.props.onEditingChange(this.props.event._id, false);
      const { router } = this.context;
      router.push(`/${locale}/events/${ this.props.event._id }`);
    }
  }

  onChange(value, path) {
    this.setState(value);
  }

  render() {
    const { locale } = this.props.intl;
    const formOptions = defaultFormOptions();

    formOptions.fields.show.disabled = true;
    formOptions.fields.country.factory = AllCountriesFactory(locale);

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
  intl: intlShape.isRequired,
};

EventEdit.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventEdit);
