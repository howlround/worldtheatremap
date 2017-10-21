// Utilities
import { TAPi18n } from 'meteor/tap:i18n';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

class ContentCollection extends TAPi18n.Collection {
  // insert(content, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Content = new ContentCollection('Content');

// Deny all client-side updates since we will be using methods to manage this collection
Content.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Content.publicFields = {
  title: 1,
  body: 1,
};

export const contentSchema = t.struct({
  title: t.String,
  body: t.maybe(t.String),
});

export const defaultFormOptions = () => ({
  error: <FormattedMessage
    id="forms.pageError"
    description="Generic page-level message for a form error"
    defaultMessage="Please fill in all required fields."
  />,
  fields: {
    title: {
      disabled: true,
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
            id="forms.requiredLabel"
            description="Addition to label indicating a field is required"
            defaultMessage="(required)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.contentTitleLabel"
            description="Label for a Content title form field"
            defaultMessage="Title"
          />,
        }}
      />,
      attrs: {
        className: 'content-name-edit',
        autoComplete: 'off',
      },
      error: <FormattedMessage
        id="forms.contentNameError"
        description="Error for Content title form field"
        defaultMessage="Title is required"
      />,
    },
    body: {
      label: <FormattedMessage
        id="forms.labelRequiredOrOptional"
        description="Label for a form field with required or optional specified"
        defaultMessage="{labelText} {optionalOrRequired}"
        values={{
          optionalOrRequired: <span className="field-label-modifier optional"><FormattedMessage
            id="forms.optionalLabel"
            description="Addition to label indicating a field is optional"
            defaultMessage="(optional)"
          /></span>,
          labelText: <FormattedMessage
            id="forms.contentBodyLabel"
            description="Label for Content Body form field"
            defaultMessage="Body"
          />,
        }}
      />,
      help: <FormattedMessage
        id="forms.markdownHelpText"
        description="Help text markdown fields"
        defaultMessage="To make italic text wrap words or phrases in asterisks. For example: *this will be italic*. Typing URLs will automatically become links if you include the http://."
      />,
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'content-body-edit',
      },
    },
  },
});
