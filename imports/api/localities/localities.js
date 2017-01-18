// Meteor
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

class LocalitiesCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Localities = new LocalitiesCollection('Localities');

// Deny all client-side updates since we will be using methods to manage this collection
Localities.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Localities.publicFields = {
  value: 1,
  label: 1,
};

export const factory = () => {
  // locality options
  const ExistingLocalities = Localities.find({}, { sort: { label: 1 } }).fetch();

  // locality template
  const existingLocalitiesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({value}) => value)
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
          options={ExistingLocalities}
          value={locals.value}
          onChange={onChange}
          className="locality-select-edit"
          placeholder={placeholder}
        />
      );
    }
  });

  // locality factory function
  class ReactSelectExistingLocalitiesFactory extends t.form.Component {
    getTemplate() {
      return existingLocalitiesTags;
    }
  }

  // locality transformer
  ReactSelectExistingLocalitiesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingLocalitiesFactory;
}
