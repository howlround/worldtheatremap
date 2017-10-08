// Meteor
import { TAPi18n } from 'meteor/tap:i18n';

// Utilities
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';
import Checkboxes from '../../ui/components/Checkboxes.jsx';

class InterestsCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Interests = new InterestsCollection('Interests');

// Deny all client-side updates since we will be using methods to manage this collection
Interests.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Interests.publicFields = {
  value: 1,
  label: 1,
};

export const interestsSelectFactory = (locale, multiValue = false) => {
  // interestsSelectFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allInterests = Interests.find({}, { sort }).fetch();

  // interestsSelectFactory template
  const allInterestsTags = t.form.Form.templates.select.clone({
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

      const placeholder = (<FormattedMessage
        id="forms.selectPlaceholder"
        description="Select widget placeholder"
        defaultMessage="Select..."
      />);

      return (
        <ReactSelect
          multi
          autoBlur
          options={allInterests}
          value={locals.value}
          onChange={onChange}
          className="interests-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // interestsSelectFactory factory function
  class ReactSelectInterestsFactory extends t.form.Component {
    getTemplate() {
      return allInterestsTags;
    }
  }

  ReactSelectInterestsFactory.transformer = t.form.List.transformer;

  return ReactSelectInterestsFactory;
};

export const interestsCheckboxFactory = (locale) => {
  // interestsCheckboxFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allInterests = Interests.find({}, { sort }).fetch();

  // interestsCheckboxFactory template
  const interestsCheckboxes = t.form.Form.templates.select.clone({
    renderSelect: (locals) => (
      <Checkboxes
        options={allInterests}
        values={locals.value}
        name="interests"
        onChange={locals.onChange}
      />
    ),
  });

  // interestsCheckboxFactory factory function
  class CheckboxesInterestsFactory extends t.form.Component {
    getTemplate() {
      return interestsCheckboxes;
    }
  }

  CheckboxesInterestsFactory.transformer = t.form.List.transformer;

  return CheckboxesInterestsFactory;
};
