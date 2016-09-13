// Meteor
import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';

// Utilities
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';
import moment from 'moment';
import DatePicker from 'react-datepicker';

// API
import { AllCountriesFactory } from '../../api/countries/countries.js';

// Components
import RelatedShowTextbox from '../../ui/components/RelatedShowTextbox.jsx';

// Methods
import { upsert } from '../localities/methods.js';
import { upsert as upsertAdministrativeArea } from '../administrativeAreas/methods.js';
import { upsert as upsertCountry } from '../countries/methods.js';

class EventsCollection extends Mongo.Collection {
  insert(event, callback) {
    const ourEvent = event;
    if (ourEvent.startDate && ourEvent.endDate) {
      // Set all the dates to 8pm
      ourEvent.startDate = startMoment.hours(20).toDate();
      ourEvent.endDate = endMoment.hours(20).toDate();
    }

    if (!_.isEmpty(ourEvent.locality)) {
      upsert.call({ locality: ourEvent.locality });
    }
    if (!_.isEmpty(ourEvent.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: ourEvent.administrativeArea });
    }
    if (!_.isEmpty(ourEvent.country)) {
      upsertCountry.call({ country: ourEvent.country });
    }

    // @TODO: Save author information to event
    //        Or maybe check to make sure the correct author is passed in?
    return super.insert(ourEvent, callback);
  }
  update(eventId, event) {
    const ourEvent = event.$set;
    if (ourEvent.startDate && ourEvent.endDate) {
      // Set the dates to 8pm
      ourEvent.startDate = startMoment.hours(20).toDate();
      ourEvent.endDate = endMoment.hours(20).toDate();
    }

    if (!_.isEmpty(ourEvent.locality)) {
      upsert.call({ locality: ourEvent.locality });
    }
    if (!_.isEmpty(ourEvent.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: ourEvent.administrativeArea });
    }
    if (!_.isEmpty(ourEvent.country)) {
      upsertCountry.call({ country: ourEvent.country });
    }

    // @TODO: Save author information to event
    //        Or maybe check to make sure the correct author is passed in?
    return super.update(eventId, {
      $set: ourEvent,
    });
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Events = new EventsCollection('Events');

// Deny all client-side updates since we will be using methods to manage this collection
Events.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// export const relatedProfileSchema = t.struct({
//   name: t.String,
//   id: t.String,
// });


// Event type options
const EventType = [
  {
    value: 'Work-in-Progress',
    label: <FormattedMessage
      id="eventType.Work-in-Progress"
      description="Intersts options: Work-in-Progress"
      defaultMessage="Work-in-Progress"
    />,
  },
  {
    value: 'Reading',
    label: <FormattedMessage
      id="eventType.Reading"
      description="Intersts options: Reading"
      defaultMessage="Reading"
    />,
  },
  {
    value: 'Workshop',
    label: <FormattedMessage
      id="eventType.Workshop"
      description="Intersts options: Workshop"
      defaultMessage="Workshop"
    />,
  },
  {
    value: 'Performance',
    label: <FormattedMessage
      id="eventType.Performance"
      description="Intersts options: Performance"
      defaultMessage="Performance"
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
    return (
      <ReactSelect
        autoBlur
        options={EventType}
        value={locals.value}
        onChange={onChange}
        className="event-type-edit"
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
function renderDate(locals) {
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
      selected={selected}
      onChange={onChange}
      isClearable
    />
  );
}

const dateTemplate = t.form.Form.templates.date.clone({ renderDate });

class DatePickerFactory extends t.form.Component {
  getTemplate() {
    return dateTemplate;
  }
}

t.Date.getTcombFormFactory = () => DatePickerFactory;

/* Related Show component override */
function renderTextbox(locals) {
  const onChange = (evt) => locals.onChange(evt);
  return (
    <div className="form-group">
      <RelatedShowTextbox
        parentValue={locals.value}
        updateParent={onChange}
        attrs={locals.attrs}
      />
    </div>
  );
}

const relatedShowTextboxTemplate = t.form.Form.templates.textbox.clone({ renderTextbox });

// here we are: the factory
class RelatedShowFactory extends t.form.Textbox {
  getTemplate() {
    return relatedShowTextboxTemplate;
  }
}

// const atLeastOne = arr => arr.length > 0;
export const relatedShowSchema = t.struct({
  name: t.String,
  id: t.String,
  // author: t.refinement(t.list(relatedProfileSchema), atLeastOne),
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?
export const eventSchema = t.struct({
  show: relatedShowSchema,
  eventType: t.String,
  startDate: t.Date,
  endDate: t.Date,
  streetAddress: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.String,
  postalCode: t.maybe(t.String),
  lat: t.String,
  lon: t.String,
  about: t.maybe(t.String),
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
  fields: {
    show: {
      factory: RelatedShowFactory,
      error: 'Show is required',
      label: 'Show name (required)',
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
        id: {
          attrs: {
            className: 'event-show-id-edit',
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
      error: 'Start date is required',
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
      error: 'End date is required',
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
      factory: AllCountriesFactory(),
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
            id="forms.countryLabel"
            description="Label for a Country form field"
            defaultMessage="Country"
          />,
        }}
      />,
      attrs: {
        className: 'event-country-edit',
      },
      error: 'Country is required',
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
        'data-geo': 'lat',
        className: 'event-lon-edit visually-hidden',
      },
      error: 'You must select a location for this event',
    },
    lon: {
      auto: 'none',
      attrs: {
        'data-geo': 'lng',
        className: 'event-lat-edit visually-hidden',
      },
    },
    about: {
      type: 'textarea',
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
        rows: '10',
        className: 'event-about-edit',
      },
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
      error: 'Event type is required',
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

// This represents the keys from Events objects that should be published
// to the client. If we add secret properties to Event objects, don't event
// them here to keep them private to the server.
Events.publicFields = {
  show: 1,
  startDate: 1,
  endDate: 1,
  streetAddress: 1,
  locality: 1,
  administrativeArea: 1,
  country: 1,
  lat: 1,
  lon: 1,
  about: 1,
  eventType: 1,
};

Factory.define('event', Events, {});

// Events.helpers({
//   // A event is considered to be private if it has a userId set
//   isPrivate() {
//     return !!this.userId;
//   },
//   isLastPublicEvent() {
//     const publicEventCount = Events.find({ userId: { $exists: false } }).count();
//     return !this.isPrivate() && publicEventCount === 1;
//   },
//   editableBy(userId) {
//     if (!this.userId) {
//       return true;
//     }

//     return this.userId === userId;
//   },
//   todos() {
//     return Todos.find({ eventId: this._id }, { sort: { createdAt: -1 } });
//   },
// });
