// Meteor
import { TAPi18n } from 'meteor/tap:i18n';
import { Factory } from 'meteor/factory';

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
import { interestsSelectFactory, interestsCheckboxFactory } from '../../api/interests/interests.js';

// Components
import Checkboxes from '../../ui/components/Checkboxes.jsx';

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
  {
    value: 'Individual',
    label: <FormattedMessage
      id="profileType.Individual"
      description="Profile Type: Individual"
      defaultMessage="Individual"
    />,
  },
  {
    value: 'Organization',
    label: <FormattedMessage
      id="profileType.Organization"
      description="Profile Type: Organization"
      defaultMessage="Organization"
    />,
  },
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

ProfileTypeTags.renderVertical = (locals) => {
  return [
    ProfileTypeTags.renderLabel(locals),
    ProfileTypeTags.renderHelp(locals),
    ProfileTypeTags.renderError(locals),
    ProfileTypeTags.renderSelect(locals),
  ]
};

// Profile type Factory
class ReactSelectProfileTypeFactory extends t.form.Component {
  getTemplate() {
    return ProfileTypeTags;
  }
}
// Profile type transformer
ReactSelectProfileTypeFactory.transformer = t.form.List.transformer;

// orgTypes options
const OrgTypes = [
  {
    value: 'Cultural / Sociocultural Service',
    label: <FormattedMessage
      id="orgType.Cultural / Sociocultural Service"
      description="Org Types: Cultural / Sociocultural Service"
      defaultMessage="Cultural / Sociocultural Service"
    />,
  },
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
    value: 'Funder / Supporting Institution',
    label: <FormattedMessage
      id="orgType.Funder / Supporting Institution"
      description="Org Types: Funder / Supporting Institution"
      defaultMessage="Funder / Supporting Institution"
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
    value: 'Performing Company / Ensemble',
    label: <FormattedMessage
      id="orgType.Performing Company / Ensemble"
      description="Org Types: Performing Company / Ensemble"
      defaultMessage="Performing Company / Ensemble"
    />,
  },
  {
    value: 'Producer / Presenter',
    label: <FormattedMessage
      id="orgType.Producer / Presenter"
      description="Org Types: Producer / Presenter"
      defaultMessage="Producer / Presenter"
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
  {
    value: 'School / University / Training Organization',
    label: <FormattedMessage
      id="orgType.School / University / Training Organization"
      description="Org Types: School / University / Training Organization"
      defaultMessage="School / University / Training Organization"
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
];

// orgTypes template
const orgTypesCheckboxes = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title='For Organizational profiles only'
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
        options={OrgTypes}
        values={locals.value}
        name="organization-types"
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

orgTypesCheckboxes.renderVertical = (locals) => {
  return [
    orgTypesCheckboxes.renderLabel(locals),
    orgTypesCheckboxes.renderHelp(locals),
    orgTypesCheckboxes.renderError(locals),
    orgTypesCheckboxes.renderSelect(locals),
  ]
};

// orgTypes template
const orgTypesTags = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title='For Organizational profiles only'
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

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

orgTypesTags.renderVertical = (locals) => {
  return [
    orgTypesTags.renderLabel(locals),
    orgTypesTags.renderHelp(locals),
    orgTypesTags.renderError(locals),
    orgTypesTags.renderSelect(locals),
  ]
};

// orgTypes factory function
class OrgTypesCheckboxesFactory extends t.form.Component {
  getTemplate() {
    return orgTypesCheckboxes;
  }
}


// orgTypes factory function
class OrgTypesReactSelectFactory extends t.form.Component {
  getTemplate() {
    return orgTypesTags;
  }
}

// orgTypes transformer
OrgTypesCheckboxesFactory.transformer = t.form.List.transformer;
OrgTypesReactSelectFactory.transformer = t.form.List.transformer;

// selfDefinedRoles options
const Roles = [
  {
    value: 'Administrator, Manager, Producer',
    label: <FormattedMessage
      id="role.Administrator, Manager, Producer"
      description="Roles options: Administrator, Manager, Producer"
      defaultMessage="Administrator, Manager, Producer"
    />,
  },
  {
    value: 'Agent, Representative',
    label: <FormattedMessage
      id="role.Agent, Representative"
      description="Roles options: Agent, Representative"
      defaultMessage="Agent, Representative"
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
    value: 'Curator / Programmer',
    label: <FormattedMessage
      id="role.Curator / Programmer"
      description="Roles options: Curator / Programmer"
      defaultMessage="Curator / Programmer"
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
    value: 'Designer',
    label: <FormattedMessage
      id="role.Designer"
      description="Roles options: Designer"
      defaultMessage="Designer"
    />,
  },
  {
    value: 'Designer: Costume',
    label: <FormattedMessage
      id="role.Designer: Costume"
      description="Roles options: Designer: Costume"
      defaultMessage="Designer: Costume"
    />,
  },
  {
    value: 'Designer: Lighting',
    label: <FormattedMessage
      id="role.Designer: Lighting"
      description="Roles options: Designer: Lighting"
      defaultMessage="Designer: Lighting"
    />,
  },
  {
    value: 'Designer: Projection',
    label: <FormattedMessage
      id="role.Designer: Projection"
      description="Roles options: Designer: Projection"
      defaultMessage="Designer: Projection"
    />,
  },
  {
    value: 'Designer: Props',
    label: <FormattedMessage
      id="role.Designer: Props"
      description="Roles options: Designer: Props"
      defaultMessage="Designer: Props"
    />,
  },
  {
    value: 'Designer: Puppets',
    label: <FormattedMessage
      id="role.Designer: Puppets"
      description="Roles options: Designer: Puppets"
      defaultMessage="Designer: Puppets"
    />,
  },
  {
    value: 'Designer: Scenic',
    label: <FormattedMessage
      id="role.Designer: Scenic"
      description="Roles options: Designer: Scenic"
      defaultMessage="Designer: Scenic"
    />,
  },
  {
    value: 'Designer: Sound',
    label: <FormattedMessage
      id="role.Designer: Sound"
      description="Roles options: Designer: Sound"
      defaultMessage="Designer: Sound"
    />,
  },
  {
    value: 'Director',
    label: <FormattedMessage
      id="role.Director"
      description="Roles options: Director"
      defaultMessage="Director"
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
    value: 'Music Composer',
    label: <FormattedMessage
      id="role.Music Composer"
      description="Roles options: Music Composer"
      defaultMessage="Music Composer"
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
    value: 'Performer',
    label: <FormattedMessage
      id="role.Performer"
      description="Roles options: Performer"
      defaultMessage="Performer"
    />,
  },
  {
    value: 'Performer: Dancer',
    label: <FormattedMessage
      id="role.Performer: Dancer"
      description="Roles options: Performer: Dancer"
      defaultMessage="Performer: Dancer"
    />,
  },
  {
    value: 'Performer: Musician',
    label: <FormattedMessage
      id="role.Performer: Musician"
      description="Roles options: Performer: Musician"
      defaultMessage="Performer: Musician"
    />,
  },
  {
    value: 'Performer: Singer',
    label: <FormattedMessage
      id="role.Performer: Singer"
      description="Roles options: Performer: Singer"
      defaultMessage="Performer: Singer"
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
    value: 'Production/Technical Staff',
    label: <FormattedMessage
      id="role.Production/Technical Staff"
      description="Roles options: Production/Technical Staff"
      defaultMessage="Production/Technical Staff"
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
  {
    value: 'Student',
    label: <FormattedMessage
      id="role.Student"
      description="Roles options: Student"
      defaultMessage="Student"
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
];

// selfDefinedRoles template
const rolesCheckboxes = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title='For Individual profiles only'
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
        options={Roles}
        values={locals.value}
        name="roles"
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

rolesCheckboxes.renderVertical = (locals) => {
  return [
    rolesCheckboxes.renderLabel(locals),
    rolesCheckboxes.renderHelp(locals),
    rolesCheckboxes.renderError(locals),
    rolesCheckboxes.renderSelect(locals),
  ]
};

// selfDefinedRoles template
const rolesTags = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title='For Individual profiles only'
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

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

rolesTags.renderVertical = (locals) => {
  return [
    rolesTags.renderLabel(locals),
    rolesTags.renderHelp(locals),
    rolesTags.renderError(locals),
    rolesTags.renderSelect(locals),
  ]
};

// selfDefinedRoles factory function
class RolesCheckboxesFactory extends t.form.Component {
  getTemplate() {
    return rolesCheckboxes;
  }
}

// selfDefinedRoles factory function
class RolesReactSelectFactory extends t.form.Component {
  getTemplate() {
    return rolesTags;
  }
}

// selfDefinedRoles transformer
RolesCheckboxesFactory.transformer = t.form.List.transformer;
RolesReactSelectFactory.transformer = t.form.List.transformer;

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
const gendersCheckboxes = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title='For Individual profiles only'
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
        options={Genders}
        values={locals.value}
        name="gender"
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

gendersCheckboxes.renderVertical = (locals) => {
  return [
    gendersCheckboxes.renderLabel(locals),
    gendersCheckboxes.renderHelp(locals),
    gendersCheckboxes.renderError(locals),
    gendersCheckboxes.renderSelect(locals),
  ]
};

// Gender template
const gendersTags = t.form.Form.templates.select.clone({
  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title='For Individual profiles only'
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

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

gendersTags.renderVertical = (locals) => {
  return [
    gendersTags.renderLabel(locals),
    gendersTags.renderHelp(locals),
    gendersTags.renderError(locals),
    gendersTags.renderSelect(locals),
  ]
};

// Gender factory function
class GendersCheckboxesFactory extends t.form.Component {
  getTemplate() {
    return gendersCheckboxes;
  }
}


// Gender factory function
class GendersReactSelectFactory extends t.form.Component {
  getTemplate() {
    return gendersTags;
  }
}

// Gender transformer
GendersCheckboxesFactory.transformer = t.form.List.transformer;
GendersReactSelectFactory.transformer = t.form.List.transformer;

// Get field labels to change based on disabled value
const genericFieldTemplate = t.form.Form.templates.textbox.clone({
  renderVertical: (locals) => {
    return [
      genericFieldTemplate.renderLabel(locals),
      genericFieldTemplate.renderHelp(locals),
      genericFieldTemplate.renderError(locals),
      genericFieldTemplate.renderTextbox(locals),
    ]
  },
});


// Get field labels to change based on disabled value
export const disabledFieldTemplate = t.form.Form.templates.textbox.clone({
  renderVertical: (locals) => {
    return [
      disabledFieldTemplate.renderLabel(locals),
      disabledFieldTemplate.renderHelp(locals),
      disabledFieldTemplate.renderError(locals),
      disabledFieldTemplate.renderTextbox(locals),
    ]
  },

  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }
    return (
      <label
        title="Select profile type"
        htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
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
  }
});

// Get field labels to change based on disabled value
const disabledListTemplate = t.form.Form.templates.list.clone({
  renderFieldset: (children, locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }

    const title = (locals.disabled) ? 'Select profile type' : '';

    const legend = (<label
      title={title}
      // htmlFor={locals.attrs.id}
      className={classnames(className)}
    >
      {locals.label}
    </label>);

    const props = {
      className: classnames('form-group-depth-1', { 'disabled': locals.disabled }),
      disabled: locals.disabled
    }

    return React.createElement.apply(null, [
      'fieldset',
      props,
      legend
    ].concat(children))
  },

  renderLabel: (locals) => {
    const className = {
      'control-label': true,
      'disabled': locals.disabled,
    }

    return (
      <label
        title="Select profile type"
        // htmlFor={locals.attrs.id}
        className={classnames(className)}
      >
        {locals.label}
      </label>
    );
  },

  renderHelp: (locals) => {
    const className = {
      'help-block': true,
      'disabled': locals.disabled,
    }

    return (
      <span
        // id={`${locals.attrs.id}-tip`}
        className={classnames(className)}
      >
        {locals.help}
      </span>
    );
  }
});

export const profileSchema = t.struct({
  profileType: t.maybe(t.list(t.String)), // Required
  name: t.String, // Required
  gender: t.maybe(t.list(t.String)),
  genderOther: t.maybe(t.list(t.String)),
  ethnicityRace: t.maybe(t.list(t.String)),
  selfDefinedRoles: t.maybe(t.list(t.String)),
  foundingYear: t.maybe(t.String),
  orgTypes: t.maybe(t.list(t.String)),
  interests: t.maybe(t.list(t.String)),
  about: t.maybe(t.String),
  email: t.maybe(t.String),
  phone: t.maybe(t.String),
  website: t.maybe(t.String),
  agent: t.maybe(t.String),
  facebook: t.maybe(t.String),
  twitter: t.maybe(t.String),
  instagram: t.maybe(t.String),
  social: t.maybe(t.String),
  lat: t.maybe(t.String),
  lon: t.maybe(t.String),
  streetAddress: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  postalCode: t.maybe(t.String),
  howlroundPostSearchText: t.maybe(t.String),
});

export const profileFormSchema = t.struct({
  profileType: t.maybe(t.list(t.String)), // Required
  name: t.String, // Required
  gender: t.maybe(t.list(t.String)),
  genderOther: t.maybe(t.list(t.String)),
  ethnicityRace: t.maybe(t.list(t.String)),
  selfDefinedRoles: t.maybe(t.list(t.String)),
  foundingYear: t.maybe(t.String),
  orgTypes: t.maybe(t.list(t.String)),
  interests: t.maybe(t.list(t.String)),
  about: t.maybe(t.String),
  email: t.maybe(t.String),
  phone: t.maybe(t.String),
  website: t.maybe(t.String),
  agent: t.maybe(t.String),
  facebook: t.maybe(t.String),
  twitter: t.maybe(t.String),
  instagram: t.maybe(t.String),
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
  ethnicityRace: t.maybe(t.list(t.String)),
});

export const translateFormSchema = t.struct({
  name: t.String, // Required,
  about: t.String,
});

export const defaultFormOptions = () => ({
  error: <FormattedMessage
    id="forms.pageError"
    description="Generic page-level message for a form error"
    defaultMessage="Please fill in all required fields."
  />,
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
      error: <FormattedMessage
        id="forms.profileNameError"
        description="Error for a Profile name form field"
        defaultMessage="Name is required"
      />,
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
      help: <FormattedMessage
        id="forms.profileTypeHelpText"
        description="Help text for profile type field"
        defaultMessage="Is this profile representing an individual or an organization? Can be both if applicable."
      />,
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
            defaultMessage="If this is your profile, you may choose to display your ethnicity/race/cultural identity"
          />,
        }}
      />,
      template: disabledListTemplate,
      // factory: EthnicityRaceCheckboxesFactory,
      help: <FormattedMessage
        id="forms.DemographicHelpText"
        description="Help text for demographic form fields instructing the user not to guess"
        defaultMessage="We encourage you not to guess. If you are not sure, leave these blank."
      />,
      item: {
        attrs: {
          className: 'profile-ethnicity-edit',
        }
      },
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
        id="forms.setPinHelpText"
        description="Help text for set pin field"
        defaultMessage="We use the google places database to help us find locations. If the location you are searching for is not in the database don't worry! You can place the pin where you want and manually enter the address in the fields below."
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
            defaultMessage="Agent/Representative or Contact Person"
          />,
        }}
      />,
      template: genericFieldTemplate,
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
      template: genericFieldTemplate,
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
    facebook: {
      template: genericFieldTemplate,
      attrs: {
        className: 'profile-facebook-edit',
      },
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
            id="forms.facebookLabel"
            description="Label for the facebook form field"
            defaultMessage="Facebook"
          />,
        }}
      />,
      help: <FormattedMessage
        id="forms.facebookHelpText"
        description="Help text for Facebook field"
        defaultMessage="Please enter the URL for the Facebook profile for this person or organization."
      />,
    },
    twitter: {
      template: genericFieldTemplate,
      attrs: {
        className: 'profile-twitter-edit',
      },
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
            id="forms.twitterLabel"
            description="Label for the twitter form field"
            defaultMessage="Twitter"
          />,
        }}
      />,
      help: <FormattedMessage
        id="forms.twitterHelpText"
        description="Help text for Twitter field"
        defaultMessage="Please enter the Twitter handle related to this profile (do NOT include the @)."
      />,
    },
    instagram: {
      template: genericFieldTemplate,
      attrs: {
        className: 'profile-instagram-edit',
      },
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
            id="forms.instagramLabel"
            description="Label for the instagram form field"
            defaultMessage="Instagram"
          />,
        }}
      />,
      help: <FormattedMessage
        id="forms.instagramHelpText"
        description="Help text for Instagram field"
        defaultMessage="Please enter the Instagram account name related to this profile (do NOT include the @)."
      />,
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
      template: genericFieldTemplate,
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
      template: disabledFieldTemplate,
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
      help: <FormattedMessage
        id="forms.foundingYearHelpText"
        description="Help text for an optional Founding Year form field"
        defaultMessage="If this profile is referencing an organization, what year was it founded?"
      />,
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
      factory: interestsCheckboxFactory(),
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
      factory: OrgTypesCheckboxesFactory,
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
      factory: RolesCheckboxesFactory,
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
      help: <FormattedMessage
        id="forms.DemographicHelpText"
        description="Help text for demographic form fields instructing the user not to guess"
        defaultMessage="We encourage you not to guess. If you are not sure, leave these blank."
      />,
      factory: GendersCheckboxesFactory,
    },
    genderOther: {
      template: disabledListTemplate,
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
            id="forms.genderOtherLabel"
            description="Label for the Another Identify Gender form field"
            defaultMessage="Additional values to display in Gender section of profile"
          />,
        }}
      />,
      help: <FormattedMessage
        id="forms.genderOtherHelpText"
        description="Help text Another identity text field"
        defaultMessage="Please enter a value to display on the profile."
      />,
      error: <FormattedMessage
        id="forms.genderOtherError"
        description="Error for Gender Other form field"
        defaultMessage="What would you like displayed on the profile?"
      />,
    },
    howlroundPostSearchText: {
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
            id="forms.howlroundPostsLabel"
            description="Label for HowlRound Posts form field"
            defaultMessage="HowlRound Posts"
          />,
        }}
      />,
      template: genericFieldTemplate,
      attrs: {
        className: 'profile-howlround-posts-edit',
      },
      help: <FormattedMessage
        id="forms.HowlroundPostsHelpText"
        description="Help text for an optional HowlRound Posts form field"
        defaultMessage="Enter search terms here to display relevant HowlRound posts. http://howlround.com/search"
      />,
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
      factory: interestsSelectFactory(),
    },
    orgTypes: {
      label: <FormattedMessage
        id="forms.orgTypesLabel"
        description="Label for an Organization Type form field"
        defaultMessage="What kind of organization is this?"
      />,
      factory: OrgTypesReactSelectFactory,
    },
    selfDefinedRoles: {
      label: <FormattedMessage
        id="forms.rolesLabel"
        description="Label for the Roles form field"
        defaultMessage="What does this person do in the theatre?"
      />,
      factory: RolesReactSelectFactory,
    },
    ethnicityRace: {
      // The Factory function is applied later to allow reactive options
      label: <FormattedMessage
        id="forms.ethnicityRaceLabel"
        description="Label for the Ethnicity/Race form field"
        defaultMessage="How does this person identify their ethnicity/race/cultural identity?"
      />,
      // factory: RolesReactSelectFactory,
    },
    gender: {
      label: <FormattedMessage
        id="forms.genderLabel"
        description="Label for the Gender form field"
        defaultMessage="Gender"
      />,
      factory: GendersReactSelectFactory,
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
      error: <FormattedMessage
        id="forms.profileNameError"
        description="Error for a Profile name form field"
        defaultMessage="Name is required"
      />,
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
      help: <FormattedMessage
        id="forms.profileTypeHelpText"
        description="Help text for profile type field"
        defaultMessage="Is this profile representing an individual or an organization? Can be both if applicable."
      />,
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
      factory: interestsSelectFactory(),
      disabled: true,
    },
    orgTypes: {
      factory: OrgTypesReactSelectFactory,
      disabled: true,
    },
    selfDefinedRoles: {
      factory: RolesReactSelectFactory,
      disabled: true,
    },
    gender: {
      factory: GendersReactSelectFactory,
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
  facebook: 1,
  twitter: 1,
  instagram: 1,
  foundingYear: 1,
  interests: 1,
  orgTypes: 1,
  selfDefinedRoles: 1,
  gender: 1,
  genderOther: 1,
  source: 1,
  howlroundPostSearchText: 1,
  savedHowlroundPosts: 1,
  howlroundPostsUrl: 1,
};

Profiles.autocompleteFields = {
  name: 1,
  orgTypes: 1,
  locality: 1,
};

Factory.define('profile', Profiles, {});
