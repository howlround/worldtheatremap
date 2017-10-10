// Meteor
import { TAPi18n } from 'meteor/tap:i18n';

// Utilities
import classnames from 'classnames';
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';
import { FormattedMessage } from 'react-intl';

// Components
import Checkboxes from '../../ui/components/Checkboxes.jsx';

class OrgTypesCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const OrgTypes = new OrgTypesCollection('OrgTypes');

// Deny all client-side updates since we will be using methods to manage this collection
OrgTypes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

OrgTypes.publicFields = {
  value: 1,
  label: 1,
};

export const orgTypesSelectFactory = (locale) => {
  // orgTypesSelectFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allOrgTypes = OrgTypes.find({}, { sort }).fetch();

  // orgTypesSelectFactory template
  const allOrgTypesTags = t.form.Form.templates.select.clone({
    renderLabel: (locals) => {
      const className = {
        'control-label': true,
        disabled: locals.disabled,
      };
      return (
        <label
          title="For Organizational profiles only"
          htmlFor={locals.attrs.id}
          className={classnames(className)}
        >
          {locals.label}
        </label>
      );
    },

    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }

      const placeholder = (
        <FormattedMessage
          id="forms.selectPlaceholder"
          description="Select widget placeholder"
          defaultMessage="Select..."
        />
      );

      return (
        <ReactSelect
          multi
          autoBlur
          disabled={locals.disabled}
          options={allOrgTypes}
          value={locals.value}
          onChange={onChange}
          className="profile-organization-types-edit"
          placeholder={placeholder}
        />
      );
    },

    renderHelp: (locals) => {
      const className = {
        'help-block': true,
        disabled: locals.disabled,
      };

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

  allOrgTypesTags.renderVertical = (locals) => ([
    allOrgTypesTags.renderLabel(locals),
    allOrgTypesTags.renderHelp(locals),
    allOrgTypesTags.renderError(locals),
    allOrgTypesTags.renderSelect(locals),
  ]);

  class OrgTypesReactSelectFactory extends t.form.Component {
    getTemplate() {
      return allOrgTypesTags;
    }
  }

  OrgTypesReactSelectFactory.transformer = t.form.List.transformer;

  return OrgTypesReactSelectFactory;
};

export const orgTypesCheckboxFactory = (locale) => {
  // orgTypesCheckboxFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allOrgTypes = OrgTypes.find({}, { sort }).fetch();

  // orgTypesCheckboxFactory template
  const orgTypesCheckboxes = t.form.Form.templates.select.clone({
    renderLabel: (locals) => {
      const className = {
        'control-label': true,
        disabled: locals.disabled,
      };
      return (
        <label
          title="For Organizational profiles only"
          htmlFor={locals.attrs.id}
          className={classnames(className)}
        >
          {locals.label}
        </label>
      );
    },

    renderSelect: (locals) => (
      <Checkboxes
        options={allOrgTypes}
        values={locals.value}
        name="organization-types"
        onChange={locals.onChange}
        disabled={locals.disabled}
      />
    ),

    renderHelp: (locals) => {
      const className = {
        'help-block': true,
        disabled: locals.disabled,
      };

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

  orgTypesCheckboxes.renderVertical = (locals) => ([
    orgTypesCheckboxes.renderLabel(locals),
    orgTypesCheckboxes.renderHelp(locals),
    orgTypesCheckboxes.renderError(locals),
    orgTypesCheckboxes.renderSelect(locals),
  ]);

  // orgTypesCheckboxFactory factory function
  class OrgTypesCheckboxesFactory extends t.form.Component {
    getTemplate() {
      return orgTypesCheckboxes;
    }
  }

  OrgTypesCheckboxesFactory.transformer = t.form.List.transformer;

  return OrgTypesCheckboxesFactory;
};
