// Meteor
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';

class CountriesCollection extends Mongo.Collection {
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

export const factory = () => {
  // Country options
  const ExistingCountries = Countries.find().fetch();

  // Country template
  const existingCountriesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }
      return (
        <ReactSelect
          multi
          autoBlur
          options={ExistingCountries}
          value={locals.value}
          onChange={onChange}
          className="country-select-edit"
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
