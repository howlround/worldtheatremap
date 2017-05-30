// Utilities
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

// Forms
import React from 'react';
import t from 'tcomb-form';

// API
// import { allCountriesFactory } from '../../api/countries/countries.js';
import { disabledFieldTemplate } from '../../api/profiles/profiles.js';

// Components
import Checkboxes from '../../ui/components/Checkboxes.jsx';

const profile = t.struct({
  first: t.String, // Required
  last: t.String, // Required
  country: t.list(t.String),
  referrer: t.maybe(t.list(t.String)),
  referrerOther: t.maybe(t.String),
});

export const userSchema = t.struct({
  email: t.String, // Required
  password: t.String, // Required
  confirm: t.String, // Required
  profile,
});

// referrer options
const Referrer = [
  {
    value: 'From the HowlRound.com website',
    label: <FormattedMessage
      id="referrer.From the HowlRound.com website"
      description="Referrer: From the HowlRound.com website"
      defaultMessage="From the HowlRound.com website"
    />,
  },
  {
    value: 'Word of mouth',
    label: <FormattedMessage
      id="referrer.Word of mouth"
      description="Referrer: Word of mouth"
      defaultMessage="Word of mouth"
    />,
  },
  {
    value: 'Social media',
    label: <FormattedMessage
      id="referrer.Social media"
      description="Referrer: Social media"
      defaultMessage="Social media"
    />,
  },
  {
    value: 'Google or other web search ',
    label: <FormattedMessage
      id="referrer.Google or other web search "
      description="Referrer: Google or other web search "
      defaultMessage="Google or other web search "
    />,
  },
  {
    value: 'Other',
    label: <FormattedMessage
      id="referrer.Other"
      description="Referrer: Other"
      defaultMessage="Other:"
    />,
  },
];

// referrer template
const referrerCheckboxes = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

  renderSelect: (locals) => {
    return (
      <Checkboxes
        options={Referrer}
        values={locals.value}
        name="referrer-options"
        onChange={locals.onChange}
        disabled={locals.disabled}
      />
    );
  },

  renderHelp: (locals) => {
    const className = {
      'help-block': true,
      'disabled': locals.disabled,
    }

    return (
      <span
        id={`${locals.attrs.id}-tip`}
        className={classnames(className)}
      >
        {locals.help}
      </span>
    );
  },
});

// referrer factory function
class ReferrerCheckboxesFactory extends t.form.Component {
  getTemplate() {
    return referrerCheckboxes;
  }
}

// referrer transformer
ReferrerCheckboxesFactory.transformer = t.form.List.transformer;

export const defaultFormOptions = () => ({
  fields: {
    email: {
      type: 'email',
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
            id="auth.emailLabel"
            description="Label for email field"
            defaultMessage="Your Email"
          />,
        }}
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
            id="auth.passwordLabel"
            description="Label for password field"
            defaultMessage="Password"
          />,
        }}
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
            id="auth.passwordConfirmLabel"
            description="Label confirm password field"
            defaultMessage="Confirm Password"
          />,
        }}
      />,
      attrs: {},
      error: <FormattedMessage
        id="auth.errorsConfirm"
        description="Field validation error when user does not enter a confirmation password on the join form"
        defaultMessage="Please confirm your password"
      />,
    },
    profile: {
      fields: {
        first: {
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
                id="auth.firstLabel"
                description="Field label for first name field on the join form"
                defaultMessage="First Name"
              />,
            }}
          />,
          error: <FormattedMessage
            id="auth.firstError"
            description="Field validation error when user does not enter a first name value on the join form"
            defaultMessage="First Name is required"
          />,
        },
        last: {
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
                id="auth.lastLabel"
                description="Field label for last name field on the join form"
                defaultMessage="Last Name"
              />,
            }}
          />,
          error: <FormattedMessage
            id="auth.lastError"
            description="Field validation error when user does not enter a last name value on the join form"
            defaultMessage="Last Name is required"
          />,
        },
        country: {
          // hasError: true,
          // factory: allCountriesFactory(true),
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
                id="forms.countryLabel"
                description="Field label for country name field on the join form"
                defaultMessage="Country"
              />,
            }}
          />,
          error: <FormattedMessage
            id="auth.countryError"
            description="Field validation error when user does not enter a country value on the join form"
            defaultMessage="Country is required"
          />,
          help: <FormattedMessage
            id="auth.countryHelp"
            description="Help text for country field on the join form"
            defaultMessage="You may choose more than one."
          />,
        },
        referrer: {
          factory: ReferrerCheckboxesFactory,
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
                id="auth.referrerLabel"
                description="Field label for referrer field on the join form"
                defaultMessage="How did you hear about the World Theatre Map?"
              />,
            }}
          />,
        },
        referrerOther: {
          template: disabledFieldTemplate,
          auto: 'none',
        }
      }
    }
  }
});
