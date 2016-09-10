// Meteor
import { TAPi18n } from 'meteor/tap:i18n';
import { Factory } from 'meteor/factory';
import { _ } from 'meteor/underscore';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';

// API
import { AllCountriesFactory } from '../../api/countries/countries.js';
import { factory as interestsFactory } from '../../api/interests/interests.js';

// Methods
import { upsert as upsertLocality } from '../localities/methods.js';
import { upsert as upsertAdministrativeArea } from '../administrativeAreas/methods.js';
import { upsert as upsertCountry } from '../countries/methods.js';

class ProfilesCollection extends TAPi18n.Collection {
  insert(profile, callback) {
    const ourProfile = profile;
    // Do any preprocessing here
    // @TODO: Strip out null values and empty objects?

    if (!_.isEmpty(ourProfile.locality)) {
      upsertLocality.call({ locality: ourProfile.locality });
    }
    if (!_.isEmpty(ourProfile.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: ourProfile.administrativeArea });
    }
    if (!_.isEmpty(ourProfile.country)) {
      upsertCountry.call({ country: ourProfile.country });
    }
    return super.insert(ourProfile, callback);
  }

  update(profileId, profile, callback) {
    const ourProfile = profile.$set;

    if (!_.isEmpty(ourProfile.locality)) {
      upsertLocality.call({ locality: ourProfile.locality });
    }
    if (!_.isEmpty(ourProfile.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: ourProfile.administrativeArea });
    }
    if (!_.isEmpty(ourProfile.country)) {
      upsertCountry.call({ country: ourProfile.country });
    }

    return super.update(profileId, {
      $set: ourProfile,
    });
  }

  remove(selector, callback) {
    return super.remove(selector, callback);
  }
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

// orgTypes options
const OrgTypes = [
  { value: 'Development / Residency Organization', label: 'Development / Residency Organization' },
  { value: 'Festival / Presenting', label: 'Festival / Presenting' },
  { value: 'Cultural / Sociocultural Service', label: 'Cultural / Sociocultural Service' },
  { value: 'Producer', label: 'Producer' },
  { value: 'Network / Association / Union', label: 'Network / Association / Union' },
  { value: 'School / University / Training Organization', label: 'School / University / Training Organization' },
  { value: 'Funder / Supporting / Grant-giving Institution', label: 'Funder / Supporting / Grant-giving Institution' },
  { value: 'Resource Centre / Researcher', label: 'Resource Centre / Researcher' },
  { value: 'Performing Company', label: 'Performing Company' },
  { value: 'Venue', label: 'Venue' },
  { value: 'Other', label: 'Other' },
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
  { value: 'Administrator', label: 'Administrator' },
  { value: 'Show Producer', label: 'Show Producer' },
  { value: 'Agent / Manager', label: 'Agent / Manager' },
  { value: 'Funder', label: 'Funder' },
  { value: 'Journalist / Critic', label: 'Journalist / Critic' },
  { value: 'Production Staff', label: 'Production Staff' },
  { value: 'Technical Staff', label: 'Technical Staff' },
  { value: 'Designer', label: 'Designer' },
  { value: 'Performer', label: 'Performer' },
  { value: 'Stage Director', label: 'Stage Director' },
  { value: 'Playwright', label: 'Playwright' },
  { value: 'Translator', label: 'Translator' },
  { value: 'Dramaturg', label: 'Dramaturg' },
  { value: 'Educator / Scholar', label: 'Educator / Scholar' },
  { value: 'Student', label: 'Student' },
  { value: 'Music Composer', label: 'Music Composer' },
  { value: 'Curator', label: 'Curator' },
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
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Transgender', label: 'Transgender' },
  { value: 'Another Identity', label: 'Another Identity' },
];

// Gender template
const gendersTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    // @TODO: If we don't have custom values this isn't necessary
    const reformattedValues = _.map(locals.value, value => { return { value: value, label: value } });
    // _.union allows repeat arrays but ReactSelect/Creatable handles it properly anyway
    const includeCustomValues = _.union(reformattedValues, Genders);
    function onChange(options) {
      const values = (options || []).map(({value}) => value)
      locals.onChange(values)
    }
    return (
      <ReactSelect
        multi
        autoBlur
        disabled={locals.disabled}
        options={ includeCustomValues }
        value={ locals.value }
        onChange={ onChange }
        className="profile-gender-edit"
      />
    );
  }
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
  name: t.String, // Required
  about: t.maybe(t.String),
  profileType: t.maybe(t.list(t.String)), // Required
  streetAddress: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  postalCode: t.maybe(t.String),
  lat: t.maybe(t.String),
  lon: t.maybe(t.String),
  agent: t.maybe(t.String),
  phone: t.maybe(t.String),
  email: t.maybe(t.String),
  website: t.maybe(t.String),
  social: t.maybe(t.String),
  foundingYear: t.maybe(t.String),
  interests: t.maybe(t.list(t.String)),
  orgTypes: t.maybe(t.list(t.String)),
  selfDefinedRoles: t.maybe(t.list(t.String)),
  gender: t.maybe(t.list(t.String)),
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
  name: t.String, // Required
  about: t.maybe(t.String),
  agent: t.maybe(t.String),
});

export const defaultFormOptions = () => ({
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
      help: 'Is this profile representing an individual or an organization? Can be both if applicable. '
    },
    streetAddress: {
      attrs: {
        className: 'profile-street-address-edit',
        // 'data-geo': 'street_address',
      },
    },
    locality: {
      label: 'City (optional)',
      attrs: {
        className: 'profile-locality-edit',
        // 'data-geo': 'locality',
      },
    },
    administrativeArea: {
      label: 'Province, Region, or State (optional)',
      attrs: {
        className: 'profile-administrative-area-edit',
        // 'data-geo': 'administrative_area_level_1',
      },
    },
    country: {
      // Imported factories need to be called as functions
      factory: AllCountriesFactory(),
      // factory: ReactSelectAllCountriesFactory,
    },
    postalCode: {
      attrs: {
        className: 'profile-postal-code-edit',
        // 'data-geo': 'postal_code',
      },
    },
    lat: {
      attrs: {
        'data-geo': 'lat',
      }
    },
    lon: {
      attrs: {
        'data-geo': 'lng',
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
    },
    orgTypes: {
      factory: ReactSelectOrgTypesFactory,
    },
    selfDefinedRoles: {
      factory: ReactSelectRolesFactory,
    },
    gender: {
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
      label: 'Profile type',
      help: 'Is this profile representing an individual or an organization? Can be both if applicable.'
    },
    locality: {
      // The Factory function is applied later to allow reactive options
      label: 'City',
      attrs: {
        className: 'profile-locality-select-edit',
      },
    },
    administrativeArea: {
      // The Factory function is applied later to allow reactive options
      label: 'Province, Region, or State',
      attrs: {
        className: 'profile-locality-select-edit',
      },
    },
    country: {
      // The Factory function is applied later to allow reactive options
      label: 'Country',
      attrs: {
        className: 'profile-country-select-edit',
      },
    },
    postalCode: {
      attrs: {
        className: 'profile-postal-code-edit',
      },
    },
    interests: {
      label: 'Interests',
      factory: interestsFactory(),
    },
    orgTypes: {
      label: 'Organization Types',
      factory: ReactSelectOrgTypesFactory,
    },
    selfDefinedRoles: {
      label: 'Roles',
      factory: ReactSelectRolesFactory,
    },
    gender: {
      label: 'Gender',
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
        // 'data-geo': 'street_address',
      },
    },
    locality: {
      label: 'City (optional)',
      attrs: {
        className: 'profile-locality-edit',
        // 'data-geo': 'locality',
      },
    },
    administrativeArea: {
      label: 'Province, Region, or State (optional)',
      attrs: {
        className: 'profile-administrative-area-edit',
        // 'data-geo': 'administrative_area_level_1',
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
        // 'data-geo': 'postal_code',
      },
    },
    lat: {
      attrs: {
        'data-geo': 'lat',
      }
    },
    lon: {
      attrs: {
        'data-geo': 'lng',
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
