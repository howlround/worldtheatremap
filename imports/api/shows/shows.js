// Meteor
import { TAPi18n } from 'meteor/tap:i18n';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';

// Utilities
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

// API
import { interestsCheckboxFactory, interestsSelectFactory } from '../../api/interests/interests.js';
// import { allCountriesFactory } from '../../api/countries/countries.js';
import { AllLanguagesFactory, existingLanguagesFactory } from '../../api/languages/languages.js';

// Containers
import RelatedProfileTextboxContainer from '../../ui/containers/RelatedProfileTextboxContainer.jsx';

class ShowsCollection extends TAPi18n.Collection {
  // insert(show, callback) {
  //   const ourShow = show;

  //   return super.insert(ourShow, callback);
  // }
  // remove(selector, callback) {
  //   return super.remove(selector, callback);
  // }
}

export const Shows = new ShowsCollection('Shows');

// Deny all client-side updates since we will be using methods to manage this collection
Shows.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// Reorder field elements
const genericFieldTemplate = t.form.Form.templates.textbox.clone({
  renderVertical: (locals) => {
    return [
      genericFieldTemplate.renderLabel(locals),
      genericFieldTemplate.renderHelp(locals),
      genericFieldTemplate.renderError(locals),
      genericFieldTemplate.renderTextbox(locals),
    ]
  },
});

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

/* Author component override */
// Author
const relatedProfileTextboxTemplate = t.form.Form.templates.textbox.clone({
  renderVertical: (locals) => {
    return [
      relatedProfileTextboxTemplate.renderLabel(locals),
      relatedProfileTextboxTemplate.renderHelp(locals),
      relatedProfileTextboxTemplate.renderError(locals),
      relatedProfileTextboxTemplate.renderTextbox(locals),
    ]
  },

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

// Author: factory
class RelatedProfileFactory extends t.form.Textbox {
  getTemplate() {
    return relatedProfileTextboxTemplate;
  }
}

export const showAuthorSchema = t.struct({
  name: t.String,
  _id: t.String,
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in showAuthor?
const atLeastOne = arr => arr.length > 0;
export const showSchema = t.struct({
  name: t.String,
  author: t.refinement(t.list(showAuthorSchema), atLeastOne),
  about: t.maybe(t.String),
  interests: t.maybe(t.list(t.String)),
  country: t.maybe(t.list(t.String)),
  languages: t.maybe(t.list(t.String)),
});

export const showFiltersSchema = t.struct({
  // Show fields
  name: t.maybe(t.String),
  interests: t.maybe(t.list(t.String)),
  country: t.maybe(t.list(t.String)),
  languages: t.maybe(t.list(t.String)),
  // Event fields
  eventType: t.maybe(t.String),
});

// @TODO: Replace with RelatedProfile
const authorLayout = (author) => (
  <div className="author-fields-group autocomplete-group">
    {author.inputs.name}
    {author.inputs._id}
    <ul className="autocomplete-results"></ul>
  </div>
);

export const defaultFormOptions = () => ({
  error: <FormattedMessage
    id="forms.pageError"
    description="Generic page-level message for a form error"
    defaultMessage="Please fill in all required fields."
  />,
  fields: {
    name: {
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
            defaultMessage="Name"
          />,
        }}
      />,
      attrs: {
        className: 'show-name-edit',
      },
      error: 'Name is required',
    },
    author: {
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
            id="forms.primaryAuthorLabel"
            description="Label for a Primary author form field"
            defaultMessage="By… (Add the primary creator(s) name. Add all that apply.)"
          />,
        }}
      />,
      error: <FormattedMessage
        id="forms.showAuthorError"
        description="Error for show author field"
        defaultMessage="At least one author is required"
      />,
      item: {
        attrs: {
          className: 'show-author-name-edit',
        },
        factory: RelatedProfileFactory,
        // template: authorLayout,
        fields: {
          name: {
            attrs: {
              className: 'show-author-name-edit',
              autoComplete: 'off',
            },
          },
          _id: {
            attrs: {
              className: 'show-author-id-edit',
            },
          },
        },
      },
    },
    about: {
      template: genericFieldTemplate,
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
            id="forms.profileAboutLabel"
            description="Label for a Profile About form field"
            defaultMessage="About"
          />,
        }}
      />,
      help: <FormattedMessage
        id="forms.markdownHelpText"
        description="Help text markdown fields"
        defaultMessage="To make italic text wrap words or phrases in asterisks. For example: *this will be italic*. Typing URLs will automatically become links if you include the http://."
      />,
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'show-about-edit',
      },
    },
    interests: {
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
            id="forms.showInterestsLabel"
            description="Label for Interests form field"
            defaultMessage="Describe this show. Select all that apply."
          />,
        }}
      />,
      factory: interestsCheckboxFactory(),
    },
    country: {
      // factory: allCountriesFactory(true),
      label: <FormattedMessage
        id="forms.countryOfOriginLabel"
        description="Field label for country of origin label on shows"
        defaultMessage="Country of origin"
      />,
    },
    languages: {
      factory: AllLanguagesFactory(true),
      label: <FormattedMessage
        id="forms.languagesLabel"
        description="Field label for Languages label on shows"
        defaultMessage="Languages"
      />,
    },
  },
});

export const filtersFormOptions = () => ({
  fields: {
    name: {
      auto: 'none',
      attrs: {
        className: 'show-search-text',
        autoComplete: 'off',
        placeholder: 'Search for shows by name',
      },
    },
    interests: {
      label: <FormattedMessage
        id="forms.showInterestsLabel"
        description="Label for Interests form field"
        defaultMessage="Describe this show. Select all that apply."
      />,
      factory: interestsSelectFactory(),
    },
    country: {
      // factory: allCountriesFactory(true),
      label: <FormattedMessage
        id="forms.countryOfOriginLabel"
        description="Field label for country of origin label on shows"
        defaultMessage="Country of origin"
      />,
    },
    languages: {
      factory: existingLanguagesFactory(),
      label: <FormattedMessage
        id="forms.languagesLabel"
        description="Field label for Languages label on shows"
        defaultMessage="Languages"
      />,
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
  },
});

// This represents the keys from Shows objects that should be published
// to the client. If we add secret properties to Show objects, don't show
// them here to keep them private to the server.
Shows.publicFields = {
  name: 1,
  nameSearch: 1,
  author: 1,
  about: 1,
  interests: 1,
  source: 1,
  country: 1,
  languages: 1,
  requestRemoval: 1,
};

Shows.searchFields = {
  name: 1,
  nameSearch: 1,
  author: 1,
  interests: 1,
  country: 1,
  languages: 1,
};

Shows.autocompleteFields = {
  name: 1,
  author: 1,
};
