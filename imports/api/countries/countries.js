// Utilities
import { TAPi18n } from 'meteor/tap:i18n';
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

class CountriesCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Countries = new CountriesCollection('Countries');

// Deny all client-side updates since we will be using methods to manage this collection
Countries.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Countries.publicFields = {
  value: 1,
  label: 1,
};

export const existingCountriesFactory = (locale) => {
  // Country options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {}
  sort[sortKey] = 1;

  const ExistingCountries = Countries.find({}, { sort }).fetch();

  // Country template
  const existingCountriesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
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
          options={ExistingCountries}
          value={locals.value}
          onChange={onChange}
          className="country-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // Country factory function
  class ReactSelectExistingCountriesFactory extends t.form.Component {
    getTemplate() {
      return existingCountriesTags;
    }
  }

  // Country transformer
  ReactSelectExistingCountriesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingCountriesFactory;
};

export const AllCountriesFactory = (locale, multiValue = false) => {
  // allCountries options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {}
  sort[sortKey] = 1;

  const AllCountries = Countries.find({}, { sort }).fetch();

  // allCountries template
  const allCountriesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        if (multiValue === true) {
          const values = (options || []).map(({ value }) => value);
          locals.onChange(values);
        } else {
          if (options) {
            locals.onChange(options.value);
          } else {
            locals.onChange(null);
          }
        }
      }

      const placeholder = <FormattedMessage
        id="forms.selectPlaceholder"
        description="Select widget placeholder"
        defaultMessage="Select..."
      />;

      return (
        <ReactSelect
          multi={multiValue}
          autoBlur
          options={AllCountries}
          value={locals.value}
          onChange={onChange}
          className="country-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // allCountries factory function
  class ReactSelectAllCountriesFactory extends t.form.Component {
    getTemplate() {
      return allCountriesTags;
    }
  }

  return ReactSelectAllCountriesFactory;
};
