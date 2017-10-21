// Meteor
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

class EthnicitiesCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Ethnicities = new EthnicitiesCollection('Ethnicities');

// Deny all client-side updates since we will be using methods to manage this collection
Ethnicities.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Ethnicities.publicFields = {
  value: 1,
  label: 1,
};

export const factory = () => {
  // ethnicity options
  const ExistingEthnicities = Ethnicities.find({}, { sort: { label: 1 } }).fetch();

  // ethnicity template
  const existingEthnicitiesTags = t.form.Form.templates.select.clone({
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
          options={ExistingEthnicities}
          value={locals.value}
          onChange={onChange}
          className="ethnicity-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // ethnicity factory function
  class ReactSelectExistingEthnicitiesFactory extends t.form.Component {
    getTemplate() {
      return existingEthnicitiesTags;
    }
  }

  // ethnicity transformer
  ReactSelectExistingEthnicitiesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingEthnicitiesFactory;
};
