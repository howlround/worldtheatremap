// Utilities
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';

// API
// import { AllCountriesFactory } from '../../api/countries/countries.js';

// Containers
import RelatedShowTextboxContainer from '../../ui/containers/RelatedShowTextboxContainer.jsx';
import RelatedProfileTextboxContainer from '../../ui/containers/RelatedProfileTextboxContainer.jsx';

// Event type options
const EventType = [
  {
    value: 'Performance',
    label: <FormattedMessage
      id="eventType.Performance"
      description="Event types: Performance"
      defaultMessage="Performance"
    />,
  },
  {
    value: 'Reading',
    label: <FormattedMessage
      id="eventType.Reading"
      description="Event types: Reading"
      defaultMessage="Reading"
    />,
  },
  {
    value: 'Workshop',
    label: <FormattedMessage
      id="eventType.Workshop"
      description="Event types: Workshop"
      defaultMessage="Workshop"
    />,
  },
];
// Event type template (single select)
const EventTypeTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      if (options) {
        locals.onChange(options.value);
      } else {
        locals.onChange(null);
      }
    }

    const placeholder = <FormattedMessage
      id="forms.selectPlaceholder"
      description="Select widget placeholder"
      defaultMessage="Select..."
    />;

    return (
      <ReactSelect
        autoBlur
        options={EventType}
        value={locals.value}
        onChange={onChange}
        className="event-type-edit"
        placeholder={placeholder}
      />
    );
  },
});
// Event type Factory
class ReactSelectEventTypeFactory extends t.form.Component {
  getTemplate() {
    return EventTypeTags;
  }
}

/* Date component override */
const dateTemplate = t.form.Form.templates.date.clone({
  renderVertical: (locals) => {
    return [
      dateTemplate.renderLabel(locals),
      dateTemplate.renderHelp(locals),
      dateTemplate.renderError(locals),
      dateTemplate.renderDate(locals),
    ]
  },

  renderDate(locals) {
    const onChange = (dateMoment) => {
      if (_.isNull(dateMoment)) {
        locals.onChange(null);
      } else {
        locals.onChange(dateMoment.toDate());
      }
    };

    const selected = locals.value ? moment(locals.value) : null;

    return (
      <DatePicker
        disabled={locals.disabled}
        selected={selected}
        onChange={onChange}
        isClearable
      />
    );
  },

  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title="Select profile type"
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

  renderHelp: (locals) => {
    const className = {
      'help-block': true,
      'disabled': locals.disabled,
    }

    return (
      <span
        id={`${locals.attrs.id}-tip`}
        className={classnames(className)}
      >
        {locals.help}
      </span>
    );
  }
});

class DatePickerFactory extends t.form.Component {
  getTemplate() {
    return dateTemplate;
  }
}

t.Date.getTcombFormFactory = () => DatePickerFactory;

/* Related Show component override */
const relatedShowTextboxTemplate = t.form.Form.templates.textbox.clone({
  renderTextbox: (locals) => {
    const onChange = (evt) => {
      locals.onChange(evt);
    };
    return (
      <div className="form-group">
        <RelatedShowTextboxContainer
          disabled={locals.disabled}
          parentValue={locals.value}
          updateParent={onChange}
          attrs={locals.attrs}
        />
      </div>
    );
  },

  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },
});

// here we are: the factory
class RelatedShowFactory extends t.form.Textbox {
  getTemplate() {
    return relatedShowTextboxTemplate;
  }
}

/* Related Organization component override */
// Related orgs
const relatedOrgsTextboxTemplate = t.form.Form.templates.textbox.clone({
  renderTextbox: (locals) => {
    // @TODO: Investigate locals.path for multiple. Also something like locals.onChange({0: evt})
    const onChange = (evt) => locals.onChange(evt);
    const parentValue = (locals.value !== '') ? locals.value : {};

    return (
      <div className="form-group">
        <RelatedProfileTextboxContainer
          disabled={locals.disabled}
          parentValue={parentValue}
          updateParent={onChange}
          attrs={locals.attrs}
        />
      </div>
    );
  },

  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

  renderHelp: (locals) => {
    const className = {
      'help-block': true,
      'disabled': locals.disabled,
    }

    return (
      <span
        id={`${locals.attrs.id}-tip`}
        className={classnames(className)}
      >
        {locals.help}
      </span>
    );
  },
});

// Related orgs: factory
class RelatedOrgsFactory extends t.form.Textbox {
  getTemplate() {
    return relatedOrgsTextboxTemplate;
  }
}

// Related orgs
// const atLeastOne = arr => arr.length > 0;
export const relatedDocumentSchema = t.struct({
  name: t.String,
  _id: t.String,
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?
export const eventSchema = t.struct({
  show: relatedDocumentSchema,
  organizations: t.maybe(relatedDocumentSchema),
  eventType: t.String,
  about: t.maybe(t.String),
  startDate: t.Date,
  endDate: t.Date,
  lat: t.String,
  lon: t.String,
  country: t.String,
  locality: t.maybe(t.String), // City
  streetAddress: t.maybe(t.String),
  administrativeArea: t.maybe(t.String), // Province, Region, State
  postalCode: t.maybe(t.String),
});

export const eventFiltersSchema = t.struct({
  eventType: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  endDate: t.maybe(t.Date),
  startDate: t.maybe(t.Date),
});

export const defaultFormOptions = () => ({
  error: <FormattedMessage
    id="forms.pageError"
    description="Generic page-level message for a form error"
    defaultMessage="Please fill in all required fields."
  />,
  fields: {
    show: {
      factory: RelatedShowFactory,
      error: <FormattedMessage
        id="forms.showNameError"
        description="Error for a Show name form field"
        defaultMessage="Show name is required"
      />,
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.showNameLabel"
            description="Label for a Show name form field"
            defaultMessage="Show name"
          />,
        }}
      />,
      attrs: {
        className: 'event-show-edit',
        autoComplete: 'off',
      },
      fields: {
        name: {
          error: 'Show name is required',
          attrs: {
            className: 'event-show-name-edit',
            autoComplete: 'off',
            placeholder: 'Show name',
          },
        },
        _id: {
          attrs: {
            className: 'event-show-id-edit',
          },
        },
      },
    },
    organizations: {
      factory: RelatedOrgsFactory,
      // template: renderRelatedOrgsTextbox,
      error: 'Local Organization Name is required',
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.eventLocalOrgsHelpText"
            description="Help text for Local organizations form field on events forms"
            defaultMessage="List the Producing, Presenting, Festival, or Development Organization"
          />,
        }}
      />,
      attrs: {
        className: 'event-organization-edit',
        autoComplete: 'off',
      },
      fields: {
        name: {
          error: <FormattedMessage
            id="forms.eventLocalOrgsError"
            description="Error message for Local organizations form field on events forms"
            defaultMessage="Local Organization Name is required"
          />,
          attrs: {
            className: 'event-organization-name-edit',
            autoComplete: 'off',
          },
        },
        _id: {
          attrs: {
            className: 'event-organization-id-edit',
          },
        },
      },
    },
    startDate: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.startDateLabel"
            description="Label for a Start date form field"
            defaultMessage="Start date"
          />,
        }}
      />,
      error: <FormattedMessage
        id="forms.eventStartDateError"
        description="Error message for start date form field on events forms"
        defaultMessage="Start date is required"
      />,
      attrs: {
        className: 'event-start-date-edit',
      },
    },
    endDate: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.endDateLabel"
            description="Label for a End date form field"
            defaultMessage="End date"
          />,
        }}
      />,
      error: <FormattedMessage
        id="forms.eventEndDateError"
        description="Error message for End date form field on events forms"
        defaultMessage="End date is required"
      />,
      attrs: {
        className: 'event-end-date-edit',
      },
    },
    eventType: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.eventTypeLabel"
            description="Label for a Event type form field"
            defaultMessage="Event type"
          />,
        }}
      />,
      factory: ReactSelectEventTypeFactory,
      error: 'Event type is required',
      attrs: {
        className: 'event-type-edit',
      },
    },
    streetAddress: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier optional"><FormattedMessage
            id="forms.optionalLabel"
            description="Addition to label indicating a field is optional"
            defaultMessage="(optional)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.streetLabel"
            description="Label for a Street Address form field"
            defaultMessage="Street address"
          />,
        }}
      />,
      attrs: {
        className: 'event-street-address-edit',
      },
    },
    locality: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier optional"><FormattedMessage
            id="forms.optionalLabel"
            description="Addition to label indicating a field is optional"
            defaultMessage="(optional)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.localityLabel"
            description="Label for a Locality / City form field"
            defaultMessage="City"
          />,
        }}
      />,
      attrs: {
        className: 'event-locality-edit',
      },
    },
    administrativeArea: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier optional"><FormattedMessage
            id="forms.optionalLabel"
            description="Addition to label indicating a field is optional"
            defaultMessage="(optional)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.administrativeAreaLabel"
            description="Label for Administrative Area form field"
            defaultMessage="Province, Region, or State"
          />,
        }}
      />,
      attrs: {
        className: 'event-administrative-area-edit',
      },
    },
    country: {
      // factory: AllCountriesFactory(),
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.countryLabel"
            description="Label for a Country form field"
            defaultMessage="Country"
          />,
        }}
      />,
      attrs: {
        className: 'event-country-edit',
      },
      error: <FormattedMessage
        id="forms.eventCountryError"
        description="Error message for country form field on events forms"
        defaultMessage="Country is required"
      />,
    },
    postalCode: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier optional"><FormattedMessage
            id="forms.optionalLabel"
            description="Addition to label indicating a field is optional"
            defaultMessage="(optional)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.postalCodeLabel"
            description="Label for a Postal code form field"
            defaultMessage="Postal Code"
          />,
        }}
      />,
      attrs: {
        className: 'event-postal-code-edit',
      },
    },
    lat: {
      auto: 'none',
      attrs: {
        className: 'event-lon-edit visually-hidden',
      },
      help: <FormattedMessage
        id="forms.setPinHelpText"
        description="Help text for set pin field"
        defaultMessage="We use the google places database to help us find locations. If the location you are searching for is not in the database don't worry! You can place the pin where you want and manually enter the address in the fields below."
      />,
      error: <FormattedMessage
        id="forms.eventLocationError"
        description="Error message for location select form field on events forms"
        defaultMessage="You must select a location for this event"
      />,
    },
    lon: {
      auto: 'none',
      attrs: {
        className: 'event-lat-edit visually-hidden',
      },
    },
    about: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier optional"><FormattedMessage
            id="forms.optionalLabel"
            description="Addition to label indicating a field is optional"
            defaultMessage="(optional)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.eventAboutLabel"
            description="Label for a Event About form field"
            defaultMessage="About"
          />,
        }}
      />,
      attrs: {
        className: 'event-about-edit',
      },
      help: <FormattedMessage
        id="forms.eventAboutHelpText"
        description="Help text for the event about field"
        defaultMessage="Enter a link to more information about this event. Include the http://"
      />,
    },
  },
});

export const filtersFormOptions = () => ({
  fields: {
    startDate: {
      label: <FormattedMessage
        id="forms.startDateLabel"
        description="Label for a Start date form field"
        defaultMessage="Start date"
      />,
      attrs: {
        className: 'event-start-date-edit',
      },
    },
    endDate: {
      label: <FormattedMessage
        id="forms.endDateLabel"
        description="Label for a End date form field"
        defaultMessage="End date"
      />,
      attrs: {
        className: 'event-end-date-edit',
      },
    },
    eventType: {
      factory: ReactSelectEventTypeFactory,
      label: <FormattedMessage
        id="forms.eventTypeLabel"
        description="Label for a Event type form field"
        defaultMessage="Event type"
      />,
      error: <FormattedMessage
        id="forms.eventTypeError"
        description="Error message for Event type select form field on events forms"
        defaultMessage="Event type is required"
      />,
      attrs: {
        className: 'event-type-edit',
      },
    },
    locality: {
      label: <FormattedMessage
        id="forms.localityLabel"
        description="Label for a Locality / City form field"
        defaultMessage="City"
      />,
      attrs: {
        className: 'event-locality-edit',
      },
    },
    administrativeArea: {
      label: <FormattedMessage
        id="forms.administrativeAreaLabel"
        description="Label for Administrative Area form field"
        defaultMessage="Province, Region, or State"
      />,
      attrs: {
        className: 'event-administrative-area-edit',
      },
    },
    country: {
      label: <FormattedMessage
        id="forms.countryLabel"
        description="Label for a Country form field"
        defaultMessage="Country"
      />,
      attrs: {
        className: 'event-country-edit',
      },
    },
  },
});
