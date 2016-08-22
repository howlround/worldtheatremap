import React from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/profiles/methods.js';
import { profileSchema, defaultFormOptions } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ProfileAdd extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    if (GoogleMaps.loaded()) {
      if ($('.form-group-lat.find-pin-processed').length == 0) {
        // $('.form-group-lat').hide();
        // $('.form-group-lon').hide();
        let initMapLocation = [0, 0];
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        function showPosition(position) {
          initMapLocation = [ position.coords.latitude, position.coords.longitude ];
        }

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
          let updatedProfile = _.extend({}, this.state);
          const newLat = latLng.lat();
          const newLon = latLng.lng();
          updatedProfile.lat = newLat.toString();
          updatedProfile.lon = newLon.toString();
          this.setState(updatedProfile);
        });

        $('.find-pin').bind("geocode:result", (event, result) => {
          let updatedProfile = _.extend({}, this.state);
          const newLat = result.geometry.location.lat();
          const newLon = result.geometry.location.lng();
          updatedProfile.lat = newLat.toString();
          updatedProfile.lon = newLon.toString();
          this.setState(updatedProfile);
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
    const formOptions = defaultFormOptions();

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
};

ProfileAdd.contextTypes = {
  router: React.PropTypes.object,
};
