// Utilities
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';

// API
import { AllCountriesFactory } from '../../api/countries/countries.js';

const profile = t.struct({
  first: t.String, // Required
  last: t.String, // Required
  country: t.maybe(t.list(t.String)),
  referrer: t.maybe(t.list(t.String)),
  referrerOther: t.maybe(t.String),
});

export const userSchema = t.struct({
  email: t.String, // Required
  password: t.String, // Required
  confirm: t.String, // Required
  profile,
});

export const defaultFormOptions = () => ({
  fields: {
    email: {
      type: 'email',
      label: <FormattedMessage
        id="auth.emailLabel"
        description="Label for email field"
        defaultMessage="Your Email"
      />,
      attrs: {},
      error: <FormattedMessage
        id='auth.errorsEmail'
        description='Field validation error when user does not enter an email on an auth form'
        defaultMessage='Email required'
      />,
    },
    password: {
      type: 'password',
      label: <FormattedMessage
        id="auth.passwordLabel"
        description="Label for password field"
        defaultMessage="Password"
      />,
      attrs: {},
      error: <FormattedMessage
        id='auth.errorsPassword'
        description='Field validation error when user does not enter a password on an auth form'
        defaultMessage='Password required'
      />,
    },
    confirm: {
      type: 'password',
      label: <FormattedMessage
        id="auth.passwordConfirmLabel"
        description="Label confirm password field"
        defaultMessage="Confirm Password"
      />,
      attrs: {},
      error: <FormattedMessage
        id='auth.errorsConfirm'
        description='Field validation error when user does not enter a confirmation password on the join form'
        defaultMessage='Please confirm your password'
      />
    },
  }
});
