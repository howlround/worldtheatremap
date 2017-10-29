import i18nES from 'tcomb-form/lib/i18n/es';
import React from 'react';
import t from 'tcomb-form';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { clone, findKey } from 'lodash';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { displayError } from '../helpers/errors.js';
import { GoogleMaps } from 'meteor/dburles:google-maps';

import { update } from '../../api/profiles/methods.js';
import {
  profileFormSchema,
  defaultFormOptions,
} from '../../api/profiles/profiles.js';
import { allCountriesFactory } from '../../api/countries/countries.js';
import { interestsCheckboxFactory } from '../../api/interests/interests.js';

const Form = t.form.Form;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props.intl;

    this.state = this.props.profile;

    this.throttledUpdate = _.throttle(newProfile => {
      if (newProfile) {
        update.call({
          profileId: this.props.profile._id,
          newProfile,
          source: locale,
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

    const { gender, genderOther } = this.state;

    // Any time Another identity is not checked AND it is not null, set it to null
    if (genderOther !== null && !_.contains(gender, 'Another Identity')) {
      this.setState({
        genderOther: null,
      });
    }

    // Any time Another identity is checked but there is nothing in the other field,
    // get it to [ null ] to display an empty field
    if (
      _.isEmpty(genderOther) &&
      genderOther !== [null] &&
      _.contains(gender, 'Another Identity')
    ) {
      this.setState({
        genderOther: [null],
      });
    }
  }

  onChange(value) {
    this.setState(value);
  }

  initGoogleMap() {
    const { locale, messages } = this.props.intl;
    const savedMessages = clone(messages);
    // @TODO: Find a way to unify with ProfileAdd.jsx,
    //        ProfileEdit.jsx, EventAdd.jsx, and EventEdit.jsx
    if (GoogleMaps.loaded()) {
      const { formatMessage } = this.props.intl;
      if ($('.form-group-lat.find-pin-processed').length === 0) {
        let initMapLocation = [0, 0];
        let initMapZoom = 2;
        if (this.state.lat && this.state.lon) {
          initMapLocation = [this.state.lat, this.state.lon];
          initMapZoom = 8;
        }

        // Used different name because of conflict with props.intl messages
        const newMessages = defineMessages({
          setMapPinLabel: {
            id: 'forms.setMapPinLabel',
            defaultMessage: 'Set Map Pin',
            description: 'Label for the Set Map Pin field',
          },
          requiredLabel: {
            id: 'forms.requiredLabel',
            defaultMessage: '(required)',
            description: 'Addition to label indicating a field is required',
          },
          setMapPinPlaceholder: {
            id: 'forms.setMapPinPlaceholder',
            defaultMessage: 'Enter a location',
            description: 'Placeholder for the Set Map Pin field',
          },
        });

        const label = formatMessage(newMessages.setMapPinLabel);

        const required = formatMessage(newMessages.requiredLabel);

        const placeholder = formatMessage(newMessages.setMapPinPlaceholder);

        $('<div></div>')
          .addClass('form-group form-group-depth-1 geographic-location-edit')
          .insertBefore('.form-group-lat');
        $('<div></div>')
          .addClass('find-pin-map')
          .prependTo('.geographic-location-edit')
          .width('100%')
          .height('300px');
        $('<input></input>')
          .addClass('find-pin')
          .attr({ type: 'text', placeholder })
          .prependTo('.geographic-location-edit')
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

        $('.form-group-lat .help-block').prependTo('.geographic-location-edit');
        $('<label></label>')
          .html(`${label} <span class="field-label-modifier required">${required}</span>`)
          .prependTo('.geographic-location-edit');

        $('.find-pin').bind('geocode:dragged', (event, latLng) => {
          const updatedDoc = _.extend({}, this.state);
          const newLat = latLng.lat();
          const newLon = latLng.lng();
          updatedDoc.lat = newLat.toString();
          updatedDoc.lon = newLon.toString();
          this.setState(updatedDoc);
        });

        $('.find-pin').bind('geocode:result', (event, result) => {
          const updatedDoc = _.extend({}, this.state);

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

        $('.find-pin').trigger('geocode');

        // Don't process again
        $('.form-group-lat').addClass('find-pin-processed');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { locale } = this.props.intl;

    const newProfile = this.refs.form.getValue();
    if (newProfile) {
      this.throttledUpdate(newProfile);

      const { router } = this.context;
      router.push(`/${locale}/profiles/${this.props.profile._id}`);
    }
  }

  render() {
    const { locale } = this.props.intl;
    const { profileType, gender } = this.state;
    let formOptions = defaultFormOptions();

    if (!_.contains(gender, 'Another Identity')) {
      formOptions.fields.genderOther.disabled = true;
    }

    if (!_.contains(profileType, 'Individual')) {
      formOptions.fields.gender.disabled = true;
      formOptions.fields.genderOther.disabled = true;
      formOptions.fields.ethnicityRace.disabled = true;
      formOptions.fields.selfDefinedRoles.disabled = true;
    }

    if (!_.contains(profileType, 'Organization')) {
      formOptions.fields.foundingYear.disabled = true;
      formOptions.fields.orgTypes.disabled = true;
    }

    if (!_.contains(profileType, 'Festival')) {
      formOptions.fields.startDate.disabled = true;
      formOptions.fields.endDate.disabled = true;
    }

    formOptions.fields.country.factory = allCountriesFactory(locale);
    formOptions.fields.interests.factory = interestsCheckboxFactory(locale);

    switch (locale) {
      case 'es':
        Form.i18n = i18nES;
        break;
      default:
        // No need to override Form
    }

    return (
      <form className="profile-edit-form" onSubmit={this.handleSubmit} >
        <Form
          ref="form"
          type={profileFormSchema}
          options={formOptions}
          onChange={this.onChange}
          value={this.state}
        />

        <button
          type="submit"
          className="edit-profile-save"
        >
          <FormattedMessage
            id="buttons.save"
            description="Generic save button"
            defaultMessage="Save"
          />
        </button>
      </form>
    );
  }
}

ProfileEdit.propTypes = {
  profile: React.PropTypes.object,
  googleMapsReady: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ProfileEdit.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ProfileEdit);
