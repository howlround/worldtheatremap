// Utilities
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';
import { FormattedMessage } from 'react-intl';
import { Mongo } from 'meteor/mongo';
import { TAPi18n } from 'meteor/tap:i18n';

class LanguagesCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Languages = new LanguagesCollection('Languages');

// Deny all client-side updates since we will be using methods to manage this collection
Languages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Languages.publicFields = {
  value: 1,
  label: 1,
  usedInShows: 1,
};

export const existingLanguagesFactory = (locale) => {
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  // Langauge options
  const existingLanguages = Languages.find({}, { sort }).fetch();

  // Langauge template
  const existingLanguagesTags = t.form.Form.templates.select.clone({
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
          options={existingLanguages}
          value={locals.value}
          onChange={onChange}
          className="language-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // Langauge factory function
  class ReactSelectExistingLanguagesFactory extends t.form.Component {
    getTemplate() {
      return existingLanguagesTags;
    }
  }

  // Langauge transformer
  ReactSelectExistingLanguagesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingLanguagesFactory;
};

export const allLanguagesFactory = (locale, multiValue = false) => {
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  // Langauge options
  const allLanguages = Languages.find({}, { sort }).fetch();

  // allLanguages template
  const allLanguagesTags = t.form.Form.templates.select.clone({
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
          options={allLanguages}
          value={locals.value}
          onChange={onChange}
          className="language-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // allLanguages factory function
  class ReactSelectallLanguagesFactory extends t.form.Component {
    getTemplate() {
      return allLanguagesTags;
    }
  }

  return ReactSelectallLanguagesFactory;
};
