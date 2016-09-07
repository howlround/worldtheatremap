// Meteor
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import { _ } from 'meteor/underscore';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';

// Collections
import { Shows } from '../shows/shows.js';
import { Participants } from '../participants/participants.js';
import { RelatedRecords } from '../relatedRecords/relatedRecords.js';

// API
import { AllCountriesFactory } from '../../api/countries/countries.js';

// Methods
import { upsert as upsertLocality } from '../localities/methods.js';
import { upsert as upsertAdministrativeArea } from '../administrativeAreas/methods.js';
import { upsert as upsertCountry } from '../countries/methods.js';

class ProfilesCollection extends Mongo.Collection {
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

// interests options
const Interests = [
  { value: 'Accessibility', label: 'Accessibility' },
  { value: 'Adaptation', label: 'Adaptation' },
  { value: 'African-American', label: 'African-American' },
  { value: 'African-Diaspora', label: 'African-Diaspora' },
  { value: 'Asian American', label: 'Asian American' },
  { value: 'Asian-American', label: 'Asian-American' },
  { value: 'Asian-Diaspora', label: 'Asian-Diaspora' },
  { value: 'Black Theatre', label: 'Black Theatre' },
  { value: 'Burlesque', label: 'Burlesque' },
  { value: 'Circus', label: 'Circus' },
  { value: 'Classical', label: 'Classical' },
  { value: 'Climate Change', label: 'Climate Change' },
  { value: 'Contemporary', label: 'Contemporary' },
  { value: 'Creative Placemaking', label: 'Creative Placemaking' },
  { value: 'Criticism', label: 'Criticism' },
  { value: 'Cross-cultural Exchange', label: 'Cross-cultural Exchange' },
  { value: 'Dance', label: 'Dance' },
  { value: 'Deaf', label: 'Deaf' },
  { value: 'Design', label: 'Design' },
  { value: 'Devised', label: 'Devised' },
  { value: 'Directing', label: 'Directing' },
  { value: 'Disabilities', label: 'Disabilities' },
  { value: 'Disability', label: 'Disability' },
  { value: 'Diversity and Inclusion', label: 'Diversity and Inclusion' },
  { value: 'Documentary Theatre', label: 'Documentary Theatre' },
  { value: 'Eco Theatre', label: 'Eco Theatre' },
  { value: 'Ensemble', label: 'Ensemble' },
  { value: 'Experimental', label: 'Experimental' },
  { value: 'Gay/Lesbian', label: 'Gay/Lesbian' },
  { value: 'Geek Theatre', label: 'Geek Theatre' },
  { value: 'Gender Politics', label: 'Gender Politics' },
  { value: 'Hip Hop Theatre', label: 'Hip Hop Theatre' },
  { value: 'Immersive Theatre', label: 'Immersive Theatre' },
  { value: 'Improvisation', label: 'Improvisation' },
  { value: 'Indigenous', label: 'Indigenous' },
  { value: 'International', label: 'International' },
  { value: 'Jewish Theatre', label: 'Jewish Theatre' },
  { value: 'Latina/o Theatre Commons', label: 'Latina/o Theatre Commons' },
  { value: 'Latino-American', label: 'Latino-American' },
  { value: 'Literary Management', label: 'Literary Management' },
  { value: 'Multicultural', label: 'Multicultural' },
  { value: 'Multidisciplinary', label: 'Multidisciplinary' },
  { value: 'Music', label: 'Music' },
  { value: 'Musical Theatre', label: 'Musical Theatre' },
  { value: 'Musicals', label: 'Musicals' },
  { value: 'New Work', label: 'New Work' },
  { value: 'Object Theatre/Puppetry', label: 'Object Theatre/Puppetry' },
  { value: 'Opera', label: 'Opera' },
  { value: 'Performance Art', label: 'Performance Art' },
  { value: 'Philanthropy/Funding', label: 'Philanthropy/Funding' },
  { value: 'physical theatre', label: 'physical theatre' },
  { value: 'Playwright Residencies', label: 'Playwright Residencies' },
  { value: 'Playwriting', label: 'Playwriting' },
  { value: 'Poetry', label: 'Poetry' },
  { value: 'Political/Social', label: 'Political/Social' },
  { value: 'Process', label: 'Process' },
  { value: 'Producing', label: 'Producing' },
  { value: 'Puppetry', label: 'Puppetry' },
  { value: 'Queer Theatre', label: 'Queer Theatre' },
  { value: 'Race', label: 'Race' },
  { value: 'Religion/Spirituality', label: 'Religion/Spirituality' },
  { value: 'Rural Theatre', label: 'Rural Theatre' },
  { value: 'Senior Theatre', label: 'Senior Theatre' },
  { value: 'Shakespeare', label: 'Shakespeare' },
  { value: 'Site-specific', label: 'Site-specific' },
  { value: 'Social Justice', label: 'Social Justice' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Sound Design', label: 'Sound Design' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Stage Combat', label: 'Stage Combat' },
  { value: 'Stage Management', label: 'Stage Management' },
  { value: 'Student/Youth', label: 'Student/Youth' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Theatre Education/Training', label: 'Theatre Education/Training' },
  { value: 'Theatre for Young Audiences', label: 'Theatre for Young Audiences' },
  { value: 'Theatre History', label: 'Theatre History' },
  { value: 'Touring', label: 'Touring' },
  { value: 'Transgender', label: 'Transgender' },
  { value: 'Translations/Adaptations', label: 'Translations/Adaptations' },
  { value: 'Video Games', label: 'Video Games' },
  { value: 'Women', label: 'Women' },
  { value: 'Young Audiences', label: 'Young Audiences' },
];

// interests template
const interestsTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      const values = (options || []).map(({value}) => value)
      locals.onChange(values)
    }
    return <ReactSelect multi autoBlur options={Interests} value={locals.value} onChange={onChange} className="profile-interests-edit" />
  }
});

// interests factory function
class ReactSelectInterestsFactory extends t.form.Component {
  getTemplate() {
    return interestsTags;
  }
}

// interests transformer
ReactSelectInterestsFactory.transformer = t.form.List.transformer;

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
    return <ReactSelect multi autoBlur options={OrgTypes} value={locals.value} onChange={onChange} className="profile-organization-types-edit" />
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
  country: t.String,
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

export const defaultFormOptions = () => {
  return {
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
        factory: ReactSelectInterestsFactory,
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
  };
};

export const filtersFormOptions = () => {
  return {
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
        factory: ReactSelectInterestsFactory,
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
  };
};

// Profiles.schema = new SimpleSchema({
//   name: { type: String },
//   about: { type: String, optional: true },
//   roles: { type: Object, optional: true },
// });

// Profiles.attachSchema(Profiles.schema);

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

Profiles.helpers({
  // // A profile is considered to be private if it has a userId set
  // isPrivate() {
  //   return !!this.userId;
  // },
  // isLastPublicProfile() {
  //   const publicProfileCount = Profiles.find({ userId: { $exists: false } }).count();
  //   return !this.isPrivate() && publicProfileCount === 1;
  // },
  // editableBy(userId) {
  //   if (!this.userId) {
  //     return true;
  //   }

  //   return this.userId === userId;
  // },
  getShows() {
    // Subscribe to these shows using shows.byId (or something like that)
    return Shows.find({ "author.id": this._id });
  },

  getRoles() {
    // @TODO: This should be more specific (by user?)
    const participantsSubscribe = Meteor.subscribe('participants.public');
    let roles = new Array;
    const participantRecords = Participants.find({ "profile.id": this._id }, { fields: { "role": true } }).map(record => {
      if (!_.contains(roles, record.role)) {
        roles.push(record.role);
      }
    });
    return roles;
  },

  getConnections() {
    const connections = Meteor.subscribe('relatedRecords.byProfile', this._id);
    let profileIds = new Array;
    const relatedProfiles = RelatedRecords.find({ "profiles": this._id }).map(relatedRecord => {
      for (let i = relatedRecord.profiles.length - 1; i >= 0; i--) {
        if (relatedRecord.profiles[i] === this._id) {
          continue;
        } else {
          profileIds.push(relatedRecord.profiles[i]);
        }
      }
    });

    // Subscribe to this group of profiles
    const connectedProfilesSub = Meteor.subscribe('profiles.byId', profileIds);

    // Return array of profile objects instead of just the ids
    return Profiles.find({ _id: { $in: profileIds } }, {
      fields: Profiles.publicFields,
    }).fetch();
  },
});
