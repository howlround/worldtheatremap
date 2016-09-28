import React from 'react';
import ReactDOM from 'react-dom';

import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { displayError } from '../helpers/errors.js';

import { insert } from '../../api/profiles/methods.js';
import { profileSchema, defaultFormOptions } from '../../api/profiles/profiles.js';

const Form = t.form.Form;

class ProfileAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.throttledAdd = _.throttle(newProfile => {
      if (newProfile) {
        const newID = insert.call({
          newProfile,
        }, displayError);

        return newID;
      }
    }, 300);

    // this.updateProfile = this.updateProfile.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
      if ($('.form-group-lat.find-pin-processed').length == 0) {
        let initMapLocation = [0, 0];
        let initMapZoom = 2;

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

  onChange(value) {
    this.setState(value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newProfile = this.refs.form.getValue();
    if (newProfile) {
      const newID = this.throttledAdd(newProfile);

      // Redirect
      this.context.router.push(`/profiles/${ newID }`);
    }
  }

  render() {
    const { profileType } = this.state;
    let formOptions = defaultFormOptions();
    if (!_.contains(profileType, 'Individual')) {
      formOptions.fields.gender.disabled = true;
      formOptions.fields.ethnicityRace.disabled = true;
      formOptions.fields.selfDefinedRoles.disabled = true;
    }

    if (!_.contains(profileType, 'Organization')) {
      formOptions.fields.foundingYear.disabled = true;
      formOptions.fields.orgTypes.disabled = true;
    }

    return (
      <form className="profile-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <Form
          ref="form"
          type={profileSchema}
          options={formOptions}
          onChange={this.onChange}
          value={this.state}
        />

        <button
          type="submit"
          className="edit-profile-save"
        >Save</button>
      </form>
    );
  }
}

ProfileAdd.propTypes = {
  googpleMapsReady: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ProfileAdd.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ProfileAdd);
