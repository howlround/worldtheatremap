import React from 'react';
import ReactDOM from 'react-dom';

// Utilities
import classnames from 'classnames';
import t from 'tcomb-form';
import { _ } from 'meteor/underscore';
import { clone, findKey, indexOf } from 'lodash';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import { get } from 'lodash';

// API
import { insert } from '../../api/events/methods.js';
import { eventSchema, defaultFormOptions } from '../../api/events/forms.js';
import { allCountriesFactory } from '../../api/countries/countries.js';

// Containers
import RelatedShowTextboxContainer from '../../ui/containers/RelatedShowTextboxContainer.jsx';

const Form = t.form.Form;

class EventAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.throttledAdd = _.throttle(newEvent => {
      if (newEvent) {
        const newID = insert.call({
          newEvent,
        }, displayError);

        return newID;
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: {
        name: nextProps.showObject.name,
        _id: nextProps.showObject._id,
        author: nextProps.showObject.author,
      }
    });
  }

  initGoogleMap() {
    const { locale, messages } = this.props.intl;
    const savedMessages = clone(messages);
    // @TODO: Find a way to unify with ProfileAdd.jsx, ProfileEdit.jsx, EventAdd.jsx, and EventEdit.jsx
    if (GoogleMaps.loaded()) {
      const { formatMessage } = this.props.intl;
      if ($('.form-group-lat.find-pin-processed').length == 0) {
        let initMapLocation = [0, 0];
        let initMapZoom = 2;

        const messages = defineMessages({
          setMapPinLabel: {
            'id': 'forms.setMapPinLabel',
            'defaultMessage': 'Set Map Pin',
            'description': 'Label for the Set Map Pin field'
          },
          requiredLabel: {
            'id': 'forms.requiredLabel',
            'defaultMessage': '(required)',
            'description': 'Addition to label indicating a field is required'
          },
          setMapPinPlaceholder: {
            'id': 'forms.setMapPinPlaceholder',
            'defaultMessage': 'Enter a location',
            'description': 'Placeholder for the Set Map Pin field'
          },
        });

        const label = formatMessage(messages.setMapPinLabel);

        const required = formatMessage(messages.requiredLabel);

        const placeholder = formatMessage(messages.setMapPinPlaceholder);

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

          // Google sends back the country in the locale, use the react intl messages to translate
          // so select can handle it (and will retranslate back)
          if (locale && locale !== 'en') {
            if (updatedDoc.country) {
              const enCountry = findKey(savedMessages, (value) => (value === updatedDoc.country));
              updatedDoc.country = enCountry.replace('country.', '');
            }
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

      const newID = this.throttledAdd(newEvent);

      // Redirect
      this.context.router.push(`/${locale}/events/${newID}`);
    }
  }

  onChange(value, path) {
    const { displayNewShowForm } = this.props;

    if (get(value, 'show.selectNewShow')) {
      this.setState(value.show.selectNewShow);
      displayNewShowForm({
        display: true,
        newShow: value.show.selectNewShow,
      });
    } else {
      this.setState(value);
    }
  }

  render() {
    const { displayNewShowForm } = this.props;
    const { locale } = this.props.intl;
    const formOptions = defaultFormOptions();

    formOptions.fields.country.factory = allCountriesFactory(locale);

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

EventAdd.propTypes = {
  intl: intlShape.isRequired,
  displayNewShowForm: React.PropTypes.func,
  showObject: React.PropTypes.object,
};

EventAdd.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(EventAdd);
