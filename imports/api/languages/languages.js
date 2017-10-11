// Utilities
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';
import { FormattedMessage } from 'react-intl';
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

  const existingLanguages = Languages.find({
    usedInShows: true,
  }, { sort }).fetch();

  const existingLanguagesTags = t.form.Form.templates.select.clone({
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
          options={existingLanguages}
          value={locals.value}
          onChange={onChange}
          className="language-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  class ReactSelectExistingLanguagesFactory extends t.form.Component {
    getTemplate() {
      return existingLanguagesTags;
    }
  }

  ReactSelectExistingLanguagesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingLanguagesFactory;
};

export const allLanguagesFactory = (locale) => {
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allLanguages = Languages.find({}, { sort }).fetch();

  const allLanguagesTags = t.form.Form.templates.select.clone({
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
          options={allLanguages}
          value={locals.value}
          onChange={onChange}
          className="language-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  class ReactSelectAllLanguagesFactory extends t.form.Component {
    getTemplate() {
      return allLanguagesTags;
    }
  }

  ReactSelectAllLanguagesFactory.transformer = t.form.List.transformer;

  return ReactSelectAllLanguagesFactory;
};
