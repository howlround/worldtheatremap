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

class RolesCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Roles = new RolesCollection('SelfDefinedRoles');

// Deny all client-side updates since we will be using methods to manage this collection
Roles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Roles.publicFields = {
  value: 1,
  label: 1,
};

export const rolesSelectFactory = (locale, multiValue = false) => {
  // rolesSelectFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allRoles = Roles.find({}, { sort }).fetch();

  // rolesSelectFactory template
  const allRolesTags = t.form.Form.templates.select.clone({
    renderLabel: (locals) => {
      const className = {
        'control-label': true,
        'disabled': locals.disabled,
      }
      return (
        <label
          title='For Individual profiles only'
          htmlFor={locals.attrs.id}
          className={classnames(className)}
        >
          {locals.label}
        </label>
      );
    },

    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value)
        locals.onChange(values)
      }

      const placeholder = <FormattedMessage
        id="forms.selectPlaceholder"
        description="Select widget placeholder"
        defaultMessage="Select..."
      />;

      return (
        <ReactSelect
          multi
          autoBlur
          disabled={locals.disabled}
          options={allRoles}
          value={locals.value}
          onChange={onChange}
          className="profile-roles-edit"
          placeholder={placeholder}
        />
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

  allRolesTags.renderVertical = (locals) => {
    return [
      allRolesTags.renderLabel(locals),
      allRolesTags.renderHelp(locals),
      allRolesTags.renderError(locals),
      allRolesTags.renderSelect(locals),
    ]
  };

  // rolesSelectFactory factory function
  class ReactSelectRolesFactory extends t.form.Component {
    getTemplate() {
      return allRolesTags;
    }
  }

  ReactSelectRolesFactory.transformer = t.form.List.transformer;

  return ReactSelectRolesFactory;
};

export const rolesCheckboxFactory = (locale) => {
  // rolesCheckboxFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allRoles = Roles.find({}, { sort }).fetch();

  // rolesCheckboxFactory template
  const rolesCheckboxes = t.form.Form.templates.select.clone({
    renderLabel: (locals) => {
      const className = {
        'control-label': true,
        'disabled': locals.disabled,
      }
      return (
        <label
          title='For Individual profiles only'
          htmlFor={locals.attrs.id}
          className={classnames(className)}
        >
          {locals.label}
        </label>
      );
    },

    renderSelect: (locals) => {
      return (
        <Checkboxes
          options={allRoles}
          values={locals.value}
          name="roles"
          onChange={locals.onChange}
          disabled={locals.disabled}
        />
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

  rolesCheckboxes.renderVertical = (locals) => {
    return [
      rolesCheckboxes.renderLabel(locals),
      rolesCheckboxes.renderHelp(locals),
      rolesCheckboxes.renderError(locals),
      rolesCheckboxes.renderSelect(locals),
    ]
  };

  // rolesCheckboxFactory factory function
  class CheckboxesRolesFactory extends t.form.Component {
    getTemplate() {
      return rolesCheckboxes;
    }
  }

  CheckboxesRolesFactory.transformer = t.form.List.transformer;

  return CheckboxesRolesFactory;
};
