import React from 'react';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';
import { update } from '../../api/profiles/methods.js';
import { translateFormSchema, defaultFormOptions } from '../../api/profiles/profiles.js';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.profile;

    this.throttledUpdate = _.throttle(newProfile => {
      if (newProfile) {
        update.call({
          profileId: this.props.profile._id,
          newProfile,
        }, displayError);

        // @TODO:Update this profile name in all plays and events
        // http://stackoverflow.com/questions/10522347/mongodb-update-objects-in-a-documents-array-nested-updating
      }
    }, 300);

    // this.updateProfile = this.updateProfile.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onBlur = this.onBlur.bind(this);
    this.initGoogleMap = this.initGoogleMap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initGoogleMap();
  }

  componentWillReceiveProps() {
    this.setState(this.props.profile);
  }

  componentDidUpdate() {
    this.initGoogleMap();
  }

  onChange(value) {
    this.setState(value);
  }

  initGoogleMap() {
    // @TODO: Find a way to unify with ProfileAdd.jsx
    if (GoogleMaps.loaded()) {
      if ($('.form-group-lat.find-pin-processed').length === 0) {
        let initMapLocation = [0, 0];
        let initMapZoom = 2;
        if (this.state.lat && this.state.lon) {
          initMapLocation = [this.state.lat, this.state.lon];
          initMapZoom = 8;
        }

        $('<div></div>')
          .addClass('form-group profile-geographic-location-edit')
          .insertBefore('.form-group-lat');
        $('<div></div>')
          .addClass('find-pin-map')
          .prependTo('.profile-geographic-location-edit')
          .width('100%')
          .height('300px');
        $('<input></input>')
          .addClass('find-pin')
          .attr({ type: 'text' })
          .prependTo('.profile-geographic-location-edit')
          .geocomplete({
            map: '.find-pin-map',
            details: 'form ',
            detailsAttribute: 'data-geo',
            markerOptions: {
              draggable: true,
            },
            mapOptions: {
              zoom: initMapZoom,
            },
            location: initMapLocation,
          });
        $('<label></label>')
          .text('Set Map Pin (optional)')
          .prependTo('.profile-geographic-location-edit');

        $('.find-pin').bind('geocode:dragged', (event, latLng) => {
          const updatedProfile = _.extend({}, this.state);
          const newLat = latLng.lat();
          const newLon = latLng.lng();
          updatedProfile.lat = newLat.toString();
          updatedProfile.lon = newLon.toString();
          this.setState(updatedProfile);
        });

        $('.find-pin').bind('geocode:result', (event, result) => {
          const updatedProfile = _.extend({}, this.state);
          const newLat = result.geometry.location.lat();
          const newLon = result.geometry.location.lng();
          updatedProfile.lat = newLat.toString();
          updatedProfile.lon = newLon.toString();
          this.setState(updatedProfile);
        });

        $('.find-pin').trigger('geocode');

        // Don't process again
        $('.form-group-lat').addClass('find-pin-processed');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const newProfile = this.refs.form.getValue();
    if (newProfile) {
      this.throttledUpdate(newProfile);

      const { router } = this.context;
      router.push(`/profiles/${this.props.profile._id}`);
    }
  }

  render() {
    const formOptions = defaultFormOptions();

    return (
      <form className="profile-edit-form" onSubmit={this.handleSubmit} >
        <Form
          ref="form"
          type={translateFormSchema}
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

ProfileEdit.propTypes = {
  profile: React.PropTypes.object,
  googpleMapsReady: React.PropTypes.bool,
};

ProfileEdit.contextTypes = {
  router: React.PropTypes.object,
};
