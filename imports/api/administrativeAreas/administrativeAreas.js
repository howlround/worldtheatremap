// Meteor
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';

class AdministrativeAreasCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const AdministrativeAreas = new AdministrativeAreasCollection('AdministrativeAreas');

// Deny all client-side updates since we will be using methods to manage this collection
AdministrativeAreas.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

AdministrativeAreas.publicFields = {
  value: 1,
  label: 1,
};

export const factory = () => {
  // Administrative Area options
  const ExistingAdministrativeAreas = AdministrativeAreas.find().fetch();

  // Administrative Area template
  const existingAdministrativeAreasTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }
      return (
        <ReactSelect
          multi
          autoBlur
          options={ExistingAdministrativeAreas}
          value={locals.value}
          onChange={onChange}
          className="administrative-area-select-edit"
        />
      );
    },
  });

  // Administrative Area factory function
  class ReactSelectExistingAdministrativeAreasFactory extends t.form.Component {
    getTemplate() {
      return existingAdministrativeAreasTags;
    }
  }

  // Administrative Area transformer
  ReactSelectExistingAdministrativeAreasFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingAdministrativeAreasFactory;
};
