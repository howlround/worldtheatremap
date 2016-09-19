// Meteor
import { TAPi18n } from 'meteor/tap:i18n';
import { Factory } from 'meteor/factory';

// Utilities
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';

// API
import { AllCountriesFactory } from '../../api/countries/countries.js';
import { factory as interestsFactory } from '../../api/interests/interests.js';

class ProfilesCollection extends TAPi18n.Collection {
  // insert(profile, callback) {
  //   const ourProfile = profile;
  //   return super.insert(ourProfile, callback);
  // }

  // update(profileId, profile, callback) {
  //   const ourProfile = profile.$set;
  //   return super.update(profileId, {
  //     $set: ourProfile,
  //   });
  // }

  // remove(selector, callback) {
  //   return super.remove(selector, callback);
  // }
}

export const Profiles = new ProfilesCollection('Profiles');

// Deny all client-side updates since we will be using methods to manage this collection
Profiles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// React Select integration: https://github.com/gcanti/tcomb-form/issues/249
// Profile type options
const ProfileType = [
  {value: "Individual", label: "Individual"},
  {value: "Organization", label: "Organization"},
];
// Profile type template
const ProfileTypeTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      const values = (options || []).map(({value}) => value)
      locals.onChange(values)
    }
    return (
      <ReactSelect
        multi
        autoBlur
        disabled={locals.disabled}
        options={ProfileType}
        value={locals.value}
        onChange={onChange}
        className="profile-type-edit"
      />
    );
  }
});
// Profile type Factory
class ReactSelectProfileTypeFactory extends t.form.Component {
  getTemplate() {
    return ProfileTypeTags;
  }
}
// Profile type transformer
ReactSelectProfileTypeFactory.transformer = t.form.List.transformer;

// Ethnicity/Race options
const EthnicityRace = [
  {
    value: 'Asian American',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Asian American"
      description="Ethnicity/Race options: Asian American"
      defaultMessage="Asian American"
    />,
  },
  {
    value: 'Black or African American',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Black or African American"
      description="Ethnicity/Race options: Black or African American"
      defaultMessage="Black or African American"
    />,
  },
  {
    value: 'Hispanic or Latino origin',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Hispanic or Latino origin"
      description="Ethnicity/Race options: Hispanic or Latino origin"
      defaultMessage="Hispanic or Latino origin"
    />,
  },
  {
    value: 'Middle Eastern American',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Middle Eastern American"
      description="Ethnicity/Race options: Middle Eastern American"
      defaultMessage="Middle Eastern American"
    />,
  },
  {
    value: 'Native American or Alaska Native',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Native American or Alaska Native"
      description="Ethnicity/Race options: Native American or Alaska Native"
      defaultMessage="Native American or Alaska Native"
    />,
  },
  {
    value: 'Native Hawaiians or Other Pacific Islander',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Native Hawaiians or Other Pacific Islander"
      description="Ethnicity/Race options: Native Hawaiians or Other Pacific Islander"
      defaultMessage="Native Hawaiians or Other Pacific Islander"
    />,
  },
  {
    value: 'White American, European American',
    label: <FormattedMessage
      id="ethnicityRaceOptions.White American, European American"
      description="Ethnicity/Race options: White American, European American"
      defaultMessage="White American, European American"
    />,
  },
  {
    value: 'Other',
    label: <FormattedMessage
      id="ethnicityRaceOptions.Other"
      description="Ethnicity/Race options: Other"
      defaultMessage="Other"
    />,
  },
];
// Ethnicity/Race template
const EthnicityRaceTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      const values = (options || []).map(({value}) => value)
      locals.onChange(values)
    }
    return (
      <ReactSelect
        multi
        autoBlur
        disabled={locals.disabled}
        options={EthnicityRace}
        value={locals.value}
        onChange={onChange}
        className="profile-ethnicity-race-edit"
      />
    );
  }
});
// Ethnicity/Race Factory
class ReactSelectEthnicityRaceFactory extends t.form.Component {
  getTemplate() {
    return EthnicityRaceTags;
  }
}
// Ethnicity/Race transformer
ReactSelectEthnicityRaceFactory.transformer = t.form.List.transformer;

// orgTypes options
const OrgTypes = [
  {
    value: 'Development / Residency Organization',
    label: <FormattedMessage
      id="orgType.Development / Residency Organization"
      description="Org Types: Development / Residency Organization"
      defaultMessage="Development / Residency Organization"
    />,
  },
  {
    value: 'Festival',
    label: <FormattedMessage
      id="orgType.Festival"
      description="Org Types: Festival"
      defaultMessage="Festival"
    />,
  },
  {
    value: 'Cultural / Sociocultural Service',
    label: <FormattedMessage
      id="orgType.Cultural / Sociocultural Service"
      description="Org Types: Cultural / Sociocultural Service"
      defaultMessage="Cultural / Sociocultural Service"
    />,
  },
  {
    value: 'Producer/ Presenter',
    label: <FormattedMessage
      id="orgType.Producer/ Presenter"
      description="Org Types: Producer/ Presenter"
      defaultMessage="Producer/ Presenter"
    />,
  },
  {
    value: 'Network / Association / Union',
    label: <FormattedMessage
      id="orgType.Network / Association / Union"
      description="Org Types: Network / Association / Union"
      defaultMessage="Network / Association / Union"
    />,
  },
  {
    value: 'School / University / Training Organization',
    label: <FormattedMessage
      id="orgType.School / University / Training Organization"
      description="Org Types: School / University / Training Organization"
      defaultMessage="School / University / Training Organization"
    />,
  },
  {
    value: 'Funder / Supporting Institution',
    label: <FormattedMessage
      id="orgType.Funder / Supporting Institution"
      description="Org Types: Funder / Supporting Institution"
      defaultMessage="Funder / Supporting Institution"
    />,
  },
  {
    value: 'Performing Company / Ensemble',
    label: <FormattedMessage
      id="orgType.Performing Company / Ensemble"
      description="Org Types: Performing Company / Ensemble"
      defaultMessage="Performing Company / Ensemble"
    />,
  },
  {
    value: 'Venue',
    label: <FormattedMessage
      id="orgType.Venue"
      description="Org Types: Venue"
      defaultMessage="Venue"
    />,
  },
  {
    value: 'Other',
    label: <FormattedMessage
      id="orgType.Other"
      description="Org Types: Other"
      defaultMessage="Other"
    />,
  },
  {
    value: 'Resource Centre',
    label: <FormattedMessage
      id="orgType.Resource Centre"
      description="Org Types: Resource Centre"
      defaultMessage="Resource Centre"
    />,
  },
];

// orgTypes template
const orgTypesTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      const values = (options || []).map(({value}) => value)
      locals.onChange(values)
    }
    return (
      <ReactSelect
        multi
        autoBlur
        disabled={locals.disabled}
        options={OrgTypes}
        value={locals.value}
        onChange={onChange}
        className="profile-organization-types-edit"
      />
    );
  }
});

// orgTypes factory function
class ReactSelectOrgTypesFactory extends t.form.Component {
  getTemplate() {
    return orgTypesTags;
  }
}

// orgTypes transformer
ReactSelectOrgTypesFactory.transformer = t.form.List.transformer;

// selfDefinedRoles options
const Roles = [
  {
    value: 'Administrator',
    label: <FormattedMessage
      id="role.Administrator"
      description="Roles options: Administrator"
      defaultMessage="Administrator"
    />,
  },
  {
    value: 'Producer',
    label: <FormattedMessage
      id="role.Producer"
      description="Roles options: Producer"
      defaultMessage="Producer"
    />,
  },
  {
    value: 'Agent / Manager',
    label: <FormattedMessage
      id="role.Agent / Manager"
      description="Roles options: Agent / Manager"
      defaultMessage="Agent / Manager"
    />,
  },
  {
    value: 'Funder',
    label: <FormattedMessage
      id="role.Funder"
      description="Roles options: Funder"
      defaultMessage="Funder"
    />,
  },
  {
    value: 'Journalist / Critic',
    label: <FormattedMessage
      id="role.Journalist / Critic"
      description="Roles options: Journalist / Critic"
      defaultMessage="Journalist / Critic"
    />,
  },
  {
    value: 'Production/Technical Staff',
    label: <FormattedMessage
      id="role.Production/Technical Staff"
      description="Roles options: Production/Technical Staff"
      defaultMessage="Production/Technical Staff"
    />,
  },
  {
    value: 'Stage Director',
    label: <FormattedMessage
      id="role.Stage Director"
      description="Roles options: Stage Director"
      defaultMessage="Stage Director"
    />,
  },
  {
    value: 'Playwright',
    label: <FormattedMessage
      id="role.Playwright"
      description="Roles options: Playwright"
      defaultMessage="Playwright"
    />,
  },
  {
    value: 'Translator',
    label: <FormattedMessage
      id="role.Translator"
      description="Roles options: Translator"
      defaultMessage="Translator"
    />,
  },
  {
    value: 'Dramaturg',
    label: <FormattedMessage
      id="role.Dramaturg"
      description="Roles options: Dramaturg"
      defaultMessage="Dramaturg"
    />,
  },
  {
    value: 'Educator / Scholar',
    label: <FormattedMessage
      id="role.Educator / Scholar"
      description="Roles options: Educator / Scholar"
      defaultMessage="Educator / Scholar"
    />,
  },
  {
    value: 'Student',
    label: <FormattedMessage
      id="role.Student"
      description="Roles options: Student"
      defaultMessage="Student"
    />,
  },
  {
    value: 'Composer',
    label: <FormattedMessage
      id="role.Composer"
      description="Roles options: Composer"
      defaultMessage="Composer"
    />,
  },
  {
    value: 'Curator / Programmer',
    label: <FormattedMessage
      id="role.Curator / Programmer"
      description="Roles options: Curator / Programmer"
      defaultMessage="Curator / Programmer"
    />,
  },
  {
    value: 'Choreographer',
    label: <FormattedMessage
      id="role.Choreographer"
      description="Roles options: Choreographer"
      defaultMessage="Choreographer"
    />,
  },
  {
    value: 'Designer',
    label: <FormattedMessage
      id="role.Designer"
      description="Roles options: Designer"
      defaultMessage="Designer"
    />,
  },
  {
    value: 'Lighting Designer',
    label: <FormattedMessage
      id="role.Lighting Designer"
      description="Roles options: Lighting Designer"
      defaultMessage="Lighting Designer"
    />,
  },
  {
    value: 'Sound Designer',
    label: <FormattedMessage
      id="role.Sound Designer"
      description="Roles options: Sound Designer"
      defaultMessage="Sound Designer"
    />,
  },
  {
    value: 'Costume Designer',
    label: <FormattedMessage
      id="role.Costume Designer"
      description="Roles options: Costume Designer"
      defaultMessage="Costume Designer"
    />,
  },
  {
    value: 'Set Designer',
    label: <FormattedMessage
      id="role.Set Designer"
      description="Roles options: Set Designer"
      defaultMessage="Set Designer"
    />,
  },
  {
    value: 'Projection Design',
    label: <FormattedMessage
      id="role.Projection Design"
      description="Roles options: Projection Design"
      defaultMessage="Projection Design"
    />,
  },
  {
    value: 'Performer',
    label: <FormattedMessage
      id="role.Performer"
      description="Roles options: Performer"
      defaultMessage="Performer"
    />,
  },
  {
    value: 'Actor',
    label: <FormattedMessage
      id="role.Actor"
      description="Roles options: Actor"
      defaultMessage="Actor"
    />,
  },
  {
    value: 'Musician',
    label: <FormattedMessage
      id="role.Musician"
      description="Roles options: Musician"
      defaultMessage="Musician"
    />,
  },
  {
    value: 'Dancer',
    label: <FormattedMessage
      id="role.Dancer"
      description="Roles options: Dancer"
      defaultMessage="Dancer"
    />,
  },
  {
    value: 'Other',
    label: <FormattedMessage
      id="role.Other"
      description="Roles options: Other"
      defaultMessage="Other"
    />,
  },
  {
    value: 'Singer',
    label: <FormattedMessage
      id="role.Singer"
      description="Roles options: Singer"
      defaultMessage="Singer"
    />,
  },
];

// selfDefinedRoles template
const rolesTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      const values = (options || []).map(({ value }) => value)
      locals.onChange(values)
    }
    return (
      <ReactSelect
        multi
        autoBlur
        disabled={locals.disabled}
        options={Roles}
        value={locals.value}
        onChange={onChange}
        className="profile-roles-edit"
      />
    );
  }
});

// selfDefinedRoles factory function
class ReactSelectRolesFactory extends t.form.Component {
  getTemplate() {
    return rolesTags;
  }
}

// selfDefinedRoles transformer
ReactSelectRolesFactory.transformer = t.form.List.transformer;

// Gender options
const Genders = [
  {
    value: 'Female',
    label: <FormattedMessage
      id="gender.Female"
      description="Gender options: Female"
      defaultMessage="Female"
    />,
  },
  {
    value: 'Male',
    label: <FormattedMessage
      id="gender.Male"
      description="Gender options: Male"
      defaultMessage="Male"
    />,
  },
  {
    value: 'Transgender',
    label: <FormattedMessage
      id="gender.Transgender"
      description="Gender options: Transgender"
      defaultMessage="Transgender"
    />,
  },
  {
    value: 'Another Identity',
    label: <FormattedMessage
      id="gender.Another Identity"
      description="Gender options: Another Identity"
      defaultMessage="Another Identity"
    />,
  },
];

// Gender template
const gendersTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    // @TODO: If we don't have custom values this isn't necessary
    // const reformattedValues = _.map(locals.value, value => ({ value, label: value }));
    // // _.union allows repeat arrays but ReactSelect/Creatable handles it properly anyway
    // const includeCustomValues = _.union(reformattedValues, Genders);
    function onChange(options) {
      const values = (options || []).map(({ value }) => value);
      locals.onChange(values);
    }
    return (
      <ReactSelect
        multi
        autoBlur
        disabled={locals.disabled}
        options={Genders}
        value={locals.value}
        onChange={onChange}
        className="profile-gender-edit"
      />
    );
  },
});

// Gender factory function
class ReactSelectGendersFactory extends t.form.Component {
  getTemplate() {
    return gendersTags;
  }
}

// Gender transformer
ReactSelectGendersFactory.transformer = t.form.List.transformer;

export const profileSchema = t.struct({
  profileType: t.maybe(t.list(t.String)), // Required
  name: t.String, // Required
  gender: t.maybe(t.list(t.String)),
  foundingYear: t.maybe(t.String),
  ethnicityRace: t.maybe(t.list(t.String)),
  orgTypes: t.maybe(t.list(t.String)),
  selfDefinedRoles: t.maybe(t.list(t.String)),
  interests: t.maybe(t.list(t.String)),
  about: t.maybe(t.String),
  email: t.maybe(t.String),
  phone: t.maybe(t.String),
  website: t.maybe(t.String),
  agent: t.maybe(t.String),
  social: t.maybe(t.String),
  lat: t.maybe(t.String),
  lon: t.maybe(t.String),
  streetAddress: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  postalCode: t.maybe(t.String),
});

export const profileFiltersSchema = t.struct({
  name: t.maybe(t.String),
  selfDefinedRoles: t.maybe(t.list(t.String)),
  interests: t.maybe(t.list(t.String)),
  orgTypes: t.maybe(t.list(t.String)),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  postalCode: t.maybe(t.String),
  gender: t.maybe(t.String),
});

export const translateFormSchema = t.struct({
  name: t.String, // Required,
  about: t.String,
});

export const defaultFormOptions = () => ({
  fields: {
    name: {
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
            id="forms.profileNameLabel"
            description="Label for a Profile name form field"
            defaultMessage="Profile name"
          />,
        }}
      />,
      attrs: {
        className: 'profile-name-edit',
      },
      error: 'Name is required',
    },
    about: {
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
            id="forms.profileAboutLabel"
            description="Label for a Profile About form field"
            defaultMessage="About"
          />,
        }}
      />,
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'profile-about-edit',
      },
    },
    profileType: {
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
            id="forms.profileTypeLabel"
            description="Label for a Profile Type form field"
            defaultMessage="What kind of profile is this?"
          />,
        }}
      />,
      factory: ReactSelectProfileTypeFactory,
      help: 'Is this profile representing an individual or an organization? Can be both if applicable.',
    },
    ethnicityRace: {
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
            id="forms.profileEthnicityRaceLabel"
            description="Label for a Ethnicity/Race form field"
            defaultMessage="Ethnicity/Race"
          />,
        }}
      />,
      factory: ReactSelectEthnicityRaceFactory,
      help: <FormattedMessage
        id="forms.ethnicityRaceHelpText"
        description="Help text for Ethnicity/Race map field"
        defaultMessage="If you are filling out a profile for another person we encourage you not to guess. If you are USA-based, we encourage you to fill answer out these questions for research purposes. (Select all that apply. Refer to https://en.wikipedia.org/wiki/Race_and_ethnicity_in_the_United_States for definitions)"
      />,
    },
    streetAddress: {
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
            id="forms.streetLabel"
            description="Label for a Street Address form field"
            defaultMessage="Street address"
          />,
        }}
      />,
      attrs: {
        className: 'profile-street-address-edit',
      },
    },
    locality: {
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
            id="forms.localityLabel"
            description="Label for a Locality / City form field"
            defaultMessage="City"
          />,
        }}
      />,
      attrs: {
        className: 'profile-locality-edit',
      },
    },
    administrativeArea: {
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
            id="forms.administrativeAreaLabel"
            description="Label for Administrative Area form field"
            defaultMessage="Province, Region, or State"
          />,
        }}
      />,
      attrs: {
        className: 'profile-administrative-area-edit',
      },
    },
    country: {
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
            id="forms.countryLabel"
            description="Label for a Country form field"
            defaultMessage="Country"
          />,
        }}
      />,
      // Imported factories need to be called as functions
      factory: AllCountriesFactory(),
    },
    postalCode: {
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
            id="forms.postalCodeLabel"
            description="Label for a Postal code form field"
            defaultMessage="Postal Code"
          />,
        }}
      />,
      attrs: {
        className: 'profile-postal-code-edit',
      },
    },
    lat: {
      auto: 'none',
      attrs: {
        className: 'visually-hidden',
      },
      help: <FormattedMessage
        id="forms.setMapPinHelpText"
        description="Help text for location picker map field"
        defaultMessage="Double check your location for accuracy, and adjust text as needed."
      />,
    },
    lon: {
      auto: 'none',
      attrs: {
        className: 'visually-hidden',
      },
    },
    agent: {
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
            id="profile.agentLabel"
            description="Label for an Agent form field"
            defaultMessage="Agent/Manager or Contact Person"
          />,
        }}
      />,
      attrs: {
        className: 'profile-agent-edit',
      },
      help: <FormattedMessage
        id="forms.agentHelpText"
        description="Help text for agent field"
        defaultMessage="Name and email"
      />,
    },
    phone: {
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
            id="profile.phoneLabel"
            description="Label for a Profile Phone form field"
            defaultMessage="Phone"
          />,
        }}
      />,
      attrs: {
        className: 'profile-phone-edit',
      },
      help: <FormattedMessage
        id="forms.phoneHelpText"
        description="Help text for phone number field"
        defaultMessage="Format: {plus}[country code] [your number]"
        values={{ plus: "+" }}
      />,
    },
    email: {
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
            id="profile.emailLabel"
            description="Label for a Profile Email form field"
            defaultMessage="Email"
          />,
        }}
      />,
      attrs: {
        className: 'profile-email-edit',
      },
    },
    website: {
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
            id="profile.websiteLabel"
            description="Label for a Profile website form field"
            defaultMessage="Website"
          />,
        }}
      />,
      attrs: {
        className: 'profile-website-edit',
      },
    },
    social: {
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
            id="profile.socialLabel"
            description="Label for a Social form field"
            defaultMessage="Social"
          />,
        }}
      />,
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'profile-social-edit',
      },
      help: <FormattedMessage
        id="forms.profileSocialHelpText"
        description="Help text for an optional Social form field"
        defaultMessage="Add a label and a link. Put each link on a new line. For example: Facebook: https://www.facebook.com/myprofile"
      />,
    },
    foundingYear: {
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
            id="forms.foundingYearLabel"
            description="Label for Founding year form field"
            defaultMessage="Founding year"
          />,
        }}
      />,
      attrs: {
        className: 'profile-founding-year-edit',
      },
      help: 'If this profile is referencing an organization, what year was it founded?'
    },
    interests: {
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
            id="forms.interestsLabel"
            description="Label for Interests form field"
            defaultMessage="Interests"
          />,
        }}
      />,
      factory: interestsFactory(),
    },
    orgTypes: {
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
            id="forms.orgTypesLabel"
            description="Label for an Organization Type form field"
            defaultMessage="What kind of organization is this?"
          />,
        }}
      />,
      factory: ReactSelectOrgTypesFactory,
    },
    selfDefinedRoles: {
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
            id="forms.rolesLabel"
            description="Label for the Roles form field"
            defaultMessage="What does this person do in the theatre?"
          />,
        }}
      />,
      factory: ReactSelectRolesFactory,
    },
    gender: {
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
            id="forms.genderLabel"
            description="Label for the Gender form field"
            defaultMessage="Gender"
          />,
        }}
      />,
      factory: ReactSelectGendersFactory,
    },
  },
});

export const filtersFormOptions = () => ({
  fields: {
    // Name is the text search field
    name: {
      auto: 'none',
      attrs: {
        className: 'profile-search-text',
        autoComplete: 'off',
        placeholder: 'Search for profiles by name',
      }
    },
    profileType: {
      factory: ReactSelectProfileTypeFactory,
      label: <FormattedMessage
        id="forms.profileTypeLabel"
        description="Label for a Profile Type form field"
        defaultMessage="What kind of profile is this?"
      />,
      help: 'Is this profile representing an individual or an organization? Can be both if applicable.'
    },
    locality: {
      // The Factory function is applied later to allow reactive options
      label: <FormattedMessage
        id="forms.localityLabel"
        description="Label for a Locality / City form field"
        defaultMessage="City"
      />,
      attrs: {
        className: 'profile-locality-select-edit',
      },
    },
    administrativeArea: {
      // The Factory function is applied later to allow reactive options
      label: <FormattedMessage
        id="forms.administrativeAreaLabel"
        description="Label for Administrative Area form field"
        defaultMessage="Province, Region, or State"
      />,
      attrs: {
        className: 'profile-locality-select-edit',
      },
    },
    country: {
      // The Factory function is applied later to allow reactive options
      label: <FormattedMessage
        id="forms.countryLabel"
        description="Label for a Country form field"
        defaultMessage="Country"
      />,
      attrs: {
        className: 'profile-country-select-edit',
      },
    },
    postalCode: {
      label: <FormattedMessage
        id="forms.postalCodeLabel"
        description="Label for a Postal code form field"
        defaultMessage="Postal Code"
      />,
      attrs: {
        className: 'profile-postal-code-edit',
      },
    },
    interests: {
      label: <FormattedMessage
        id="forms.interestsLabel"
        description="Label for Interests form field"
        defaultMessage="Interests"
      />,
      factory: interestsFactory(),
    },
    orgTypes: {
      label: <FormattedMessage
        id="forms.orgTypesLabel"
        description="Label for an Organization Type form field"
        defaultMessage="What kind of organization is this?"
      />,
      factory: ReactSelectOrgTypesFactory,
    },
    selfDefinedRoles: {
      label: <FormattedMessage
        id="forms.rolesLabel"
        description="Label for the Roles form field"
        defaultMessage="What does this person do in the theatre?"
      />,
      factory: ReactSelectRolesFactory,
    },
    gender: {
      label: <FormattedMessage
        id="forms.genderLabel"
        description="Label for the Gender form field"
        defaultMessage="Gender"
      />,
      factory: ReactSelectGendersFactory,
    },
  },
});


export const translateSourceFormOptions = () => ({
  disabled: true,
  fields: {
    name: {
      label: 'Profile name (required)',
      attrs: {
        className: 'profile-name-edit',
      },
      error: 'Name is required',
    },
    about: {
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'profile-about-edit',
      },
    },
    profileType: {
      factory: ReactSelectProfileTypeFactory,
      disabled: true,
      help: 'Is this profile representing an individual or an organization? Can be both if applicable. '
    },
    streetAddress: {
      attrs: {
        className: 'profile-street-address-edit',
      },
    },
    locality: {
      label: 'City (optional)',
      attrs: {
        className: 'profile-locality-edit',
      },
    },
    administrativeArea: {
      label: 'Province, Region, or State (optional)',
      attrs: {
        className: 'profile-administrative-area-edit',
      },
    },
    country: {
      // Imported factories need to be called as functions
      factory: AllCountriesFactory(),
      disabled: true,
    },
    postalCode: {
      attrs: {
        className: 'profile-postal-code-edit',
      },
    },
    lat: {
      attrs: {
      }
    },
    lon: {
      attrs: {
      }
    },
    agent: {
      attrs: {
        className: 'profile-agent-edit',
      },
    },
    phone: {
      attrs: {
        className: 'profile-phone-edit',
      },
    },
    email: {
      attrs: {
        className: 'profile-email-edit',
      },
    },
    website: {
      attrs: {
        className: 'profile-website-edit',
      },
    },
    social: {
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'profile-social-edit',
      },
      help: 'Add a label and a link. Put each link on a new line. For example: Facebook: https://www.facebook.com/myprofile',
    },
    foundingYear: {
      attrs: {
        className: 'profile-founding-year-edit',
      },
      help: 'If this profile is referencing an organization, what year was it founded?'
    },
    interests: {
      factory: interestsFactory(),
      disabled: true,
    },
    orgTypes: {
      factory: ReactSelectOrgTypesFactory,
      disabled: true,
    },
    selfDefinedRoles: {
      factory: ReactSelectRolesFactory,
      disabled: true,
    },
    gender: {
      factory: ReactSelectGendersFactory,
      disabled: true,
    },
  },
});

// This represents the keys from Profiles objects that should be published
// to the client. If we add secret properties to Profile objects, don't profile
// them here to keep them private to the server.
Profiles.publicFields = {
  name: 1,
  about: 1,
  profileType: 1,
  ethnicityRace: 1,
  image: 1,
  streetAddress: 1,
  locality: 1,
  administrativeArea: 1,
  country: 1,
  postalCode: 1,
  lat: 1,
  lon: 1,
  imageWide: 1,
  agent: 1,
  phone: 1,
  email: 1,
  website: 1,
  social: 1,
  foundingYear: 1,
  interests: 1,
  orgTypes: 1,
  selfDefinedRoles: 1,
  gender: 1,
};

Factory.define('profile', Profiles, {});
