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

class GendersCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Genders = new GendersCollection('Genders');

// Deny all client-side updates since we will be using methods to manage this collection
Genders.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Genders.publicFields = {
  value: 1,
  label: 1,
};

export const gendersSelectFactory = (locale) => {
  // gendersSelectFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allGenders = Genders.find({}, { sort }).fetch();

  // gendersSelectFactory template
  const allGendersTags = t.form.Form.templates.select.clone({
    renderLabel: (locals) => {
      const className = {
        'control-label': true,
        disabled: locals.disabled,
      };
      return (
        <label
          title="For Individual profiles only"
          htmlFor={locals.attrs.id}
          className={classnames(className)}
        >
          {locals.label}
        </label>
      );
    },

    renderSelect: (locals) => {
      // @TODO: If we don't have custom values this isn't necessary
      // const reformattedValues = _.map(locals.value, value => ({ value, label: value }));
      // // _.union allows repeat arrays but ReactSelect/Creatable handles it properly anyway
      // const includeCustomValues = _.union(reformattedValues, Genders);
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
          options={allGenders}
          value={locals.value}
          onChange={onChange}
          className="profile-gender-edit"
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

  allGendersTags.renderVertical = (locals) => ([
    allGendersTags.renderLabel(locals),
    allGendersTags.renderHelp(locals),
    allGendersTags.renderError(locals),
    allGendersTags.renderSelect(locals),
  ]);

  class GendersReactSelectFactory extends t.form.Component {
    getTemplate() {
      return allGendersTags;
    }
  }

  GendersReactSelectFactory.transformer = t.form.List.transformer;

  return GendersReactSelectFactory;
};

export const gendersCheckboxFactory = (locale) => {
  // gendersCheckboxFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allGenders = Genders.find({}, { sort }).fetch();

  // gendersCheckboxFactory template
  const gendersCheckboxes = t.form.Form.templates.select.clone({
    renderLabel: (locals) => {
      const className = {
        'control-label': true,
        disabled: locals.disabled,
      };
      return (
        <label
          title="For Individual profiles only"
          htmlFor={locals.attrs.id}
          className={classnames(className)}
        >
          {locals.label}
        </label>
      );
    },

    renderSelect: (locals) => (
      <Checkboxes
        options={allGenders}
        values={locals.value}
        name="gender"
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

  gendersCheckboxes.renderVertical = (locals) => ([
    gendersCheckboxes.renderLabel(locals),
    gendersCheckboxes.renderHelp(locals),
    gendersCheckboxes.renderError(locals),
    gendersCheckboxes.renderSelect(locals),
  ]);

  // gendersCheckboxFactory factory function
  class GendersCheckboxesFactory extends t.form.Component {
    getTemplate() {
      return gendersCheckboxes;
    }
  }

  GendersCheckboxesFactory.transformer = t.form.List.transformer;

  return GendersCheckboxesFactory;
};
