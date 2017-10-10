// Meteor
import { TAPi18n } from 'meteor/tap:i18n';

// Utilities
import React from 'react';
import ReactSelect from 'react-select';
import t from 'tcomb-form';
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';

class EventTypesCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const EventTypes = new EventTypesCollection('EventTypes');

// Deny all client-side updates since we will be using methods to manage this collection
EventTypes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

EventTypes.publicFields = {
  value: 1,
  label: 1,
};

export const eventTypesSelectFactory = (locale) => {
  // eventTypesSelectFactory options
  const sortKey = (!locale || locale === 'en') ? 'label' : `i18n.${locale}.label`;
  const sort = {};
  sort[sortKey] = 1;

  const allEventTypes = EventTypes.find({}, { sort }).fetch();

  // eventTypesSelectFactory template
  const allEventTypesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        if (options) {
          locals.onChange(options.value);
        } else {
          locals.onChange(null);
        }
      }

      const value = _.isEmpty(locals.value) ? '' : locals.value;

      const placeholder = (
        <FormattedMessage
          id="forms.selectPlaceholder"
          description="Select widget placeholder"
          defaultMessage="Select..."
        />
      );

      return (
        <ReactSelect
          autoBlur
          options={allEventTypes}
          value={value}
          onChange={onChange}
          className="event-type-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  class EventTypesReactSelectFactory extends t.form.Component {
    getTemplate() {
      return allEventTypesTags;
    }
  }

  EventTypesReactSelectFactory.transformer = t.form.List.transformer;

  return EventTypesReactSelectFactory;
};
