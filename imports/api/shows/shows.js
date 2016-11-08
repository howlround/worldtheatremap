// Meteor
import { TAPi18n } from 'meteor/tap:i18n';

// Forms
import React from 'react';
import t from 'tcomb-form';

// Utilities
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

// API
import { interestsCheckboxFactory, interestsSelectFactory } from '../../api/interests/interests.js';

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


/* Author component override */
// Author
const relatedProfileTextboxTemplate = t.form.Form.templates.textbox.clone({
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
});

export const showFiltersSchema = t.struct({
  name: t.maybe(t.String),
  interests: t.maybe(t.list(t.String)),
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
      error: 'At least one author is required',
      item: {
        attrs: {
          className: 'show-author-name-edit',
        },
        factory: RelatedProfileFactory,
        // template: authorLayout,
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
                  id="forms.primaryAuthorLabel"
                  description="Label for a Primary author form field"
                  defaultMessage="By… (Add the primary creator(s) name. Add all that apply.)"
                />,
              }}
            />,
            error: 'Primary authorship is required',
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
            id="forms.interestsLabel"
            description="Label for Interests form field"
            defaultMessage="Interests"
          />,
        }}
      />,
      factory: interestsCheckboxFactory(),
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
        id="forms.interestsLabel"
        description="Label for Interests form field"
        defaultMessage="Interests"
      />,
      factory: interestsSelectFactory(),
    },
  },
});

// This represents the keys from Shows objects that should be published
// to the client. If we add secret properties to Show objects, don't show
// them here to keep them private to the server.
Shows.publicFields = {
  name: 1,
  author: 1,
  about: 1,
  interests: 1,
  source: 1,
};

Shows.searchFields = {
  name: 1,
  author: 1,
  interests: 1,
};

Shows.autocompleteFields = {
  name: 1,
  author: 1,
};
