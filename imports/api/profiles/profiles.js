// Meteor
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

// Forms
import React from 'react';
import t from 'tcomb-form';
import ReactSelect from 'react-select';

// Collections
import { Plays } from '../plays/plays.js';
import { Participants } from '../participants/participants.js';
import { RelatedRecords } from '../relatedRecords/relatedRecords.js';

class ProfilesCollection extends Mongo.Collection {
  insert(profile, callback) {
    const ourProfile = profile;
    // Do any preprocessing here
    // @TODO: Strip out null values and empty objects?

    return super.insert(ourProfile, callback);
  }
  remove(selector, callback) {
    Todos.remove({ profileId: selector });
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

const Interests = t.enums({
  "Accessibility": "Accessibility",
  "Adaptation": "Adaptation",
  "African-American": "African-American",
  "African-Diaspora": "African-Diaspora",
  "Asian American": "Asian American",
  "Asian-American": "Asian-American",
  "Asian-Diaspora": "Asian-Diaspora",
  "Black Theatre": "Black Theatre",
  "Burlesque": "Burlesque",
  "Circus": "Circus",
  "Classical": "Classical",
  "Climate Change": "Climate Change",
  "Contemporary": "Contemporary",
  "Creative Placemaking": "Creative Placemaking",
  "Criticism": "Criticism",
  "Cross-cultural Exchange": "Cross-cultural Exchange",
  "Dance": "Dance",
  "Deaf": "Deaf",
  "Design": "Design",
  "Devised": "Devised",
  "Directing": "Directing",
  "Disabilities": "Disabilities",
  "Disability": "Disability",
  "Diversity and Inclusion": "Diversity and Inclusion",
  "Documentary Theatre": "Documentary Theatre",
  "Eco Theatre": "Eco Theatre",
  "Ensemble": "Ensemble",
  "Experimental": "Experimental",
  "Gay/Lesbian": "Gay/Lesbian",
  "Geek Theatre": "Geek Theatre",
  "Gender Politics": "Gender Politics",
  "Hip Hop Theatre": "Hip Hop Theatre",
  "Immersive Theatre": "Immersive Theatre",
  "Improvisation": "Improvisation",
  "Indigenous": "Indigenous",
  "International": "International",
  "Jewish Theatre": "Jewish Theatre",
  "Latina/o Theatre Commons": "Latina/o Theatre Commons",
  "Latino-American": "Latino-American",
  "Literary Management": "Literary Management",
  "Multicultural": "Multicultural",
  "Multidisciplinary": "Multidisciplinary",
  "Music": "Music",
  "Musical Theatre": "Musical Theatre",
  "Musicals": "Musicals",
  "New Work": "New Work",
  "Object Theatre/Puppetry": "Object Theatre/Puppetry",
  "Opera": "Opera",
  "Performance Art": "Performance Art",
  "Philanthropy/Funding": "Philanthropy/Funding",
  "physical theatre": "physical theatre",
  "Playwright Residencies": "Playwright Residencies",
  "Playwriting": "Playwriting",
  "Poetry": "Poetry",
  "Political/Social": "Political/Social",
  "Process": "Process",
  "Producing": "Producing",
  "Puppetry": "Puppetry",
  "Queer Theatre": "Queer Theatre",
  "Race": "Race",
  "Religion/Spirituality": "Religion/Spirituality",
  "Rural Theatre": "Rural Theatre",
  "Senior Theatre": "Senior Theatre",
  "Shakespeare": "Shakespeare",
  "Site-specific": "Site-specific",
  "Social Justice": "Social Justice",
  "Social Media": "Social Media",
  "Sound Design": "Sound Design",
  "Sports": "Sports",
  "Stage Combat": "Stage Combat",
  "Stage Management": "Stage Management",
  "Student/Youth": "Student/Youth",
  "Technology": "Technology",
  "Theatre Education/Training": "Theatre Education/Training",
  "Theatre for Young Audiences": "Theatre for Young Audiences",
  "Theatre History": "Theatre History",
  "Touring": "Touring",
  "Transgender": "Transgender",
  "Translations/Adaptations": "Translations/Adaptations",
  "Video Games": "Video Games",
  "Women": "Women",
  "Young Audiences": "Young Audiences",
});

const OrgTypes = t.enums({
  "Development / Residency Organization": "Development / Residency Organization",
  "Festival / Presenting": "Festival / Presenting",
  "Cultural / Sociocultural Service": "Cultural / Sociocultural Service",
  "Producer": "Producer",
  "Network / Association / Union": "Network / Association / Union",
  "School / University / Training Organization": "School / University / Training Organization",
  "Funder / Supporting / Grant-giving Institution": "Funder / Supporting / Grant-giving Institution",
  "Resource Centre / Researcher": "Resource Centre / Researcher",
  "Performing Company": "Performing Company",
  "Venue": "Venue",
  "Other": "Other",
});

const Roles = [
  { value: "Administrator", label: "Administrator" },
  { value: "Show Producer", label: "Show Producer" },
  { value: "Agent / Manager", label: "Agent / Manager" },
  { value: "Funder", label: "Funder" },
  { value: "Journalist / Critic", label: "Journalist / Critic" },
  { value: "Production Staff", label: "Production Staff" },
  { value: "Technical Staff", label: "Technical Staff" },
  { value: "Designer", label: "Designer" },
  { value: "Performer", label: "Performer" },
  { value: "Stage Director", label: "Stage Director" },
  { value: "Playwright", label: "Playwright" },
  { value: "Translator", label: "Translator" },
  { value: "Dramaturg", label: "Dramaturg" },
  { value: "Educator / Scholar", label: "Educator / Scholar" },
  { value: "Student", label: "Student" },
  { value: "Music Composer", label: "Music Composer" },
  { value: "Curator", label: "Curator" }
];

const rolesTags = t.form.Form.templates.select.clone({
  renderSelect: (locals) => {
    function onChange(options) {
      const values = (options || []).map(({value}) => value)
      locals.onChange(values)
    }
    return <ReactSelect multi options={Roles} value={locals.value} onChange={onChange} className="profile-roles-edit" />
  }
});

class ReactSelectFactory extends t.form.Component {
  getTemplate() {
    return rolesTags;
  }
}

ReactSelectFactory.transformer = t.form.List.transformer

export const profileSchema = t.struct({
  name: t.String,
  about: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  postalCode: t.maybe(t.String),
  agent: t.maybe(t.String),
  lat: t.maybe(t.String),
  lon: t.maybe(t.String),
  phone: t.maybe(t.String),
  email: t.maybe(t.String),
  website: t.maybe(t.String),
  social: t.maybe(t.String),
  foundingYear: t.maybe(t.String),
  interests: t.maybe(t.list(Interests)),
  orgTypes: t.maybe(t.list(OrgTypes)),
  selfDefinedRoles: t.maybe(t.list(t.String)),
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
        attrs: {
          className: 'profile-country-edit',
        },
      },
      postalCode: {
        attrs: {
          className: 'profile-postal-code-edit',
        },
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
        factory: t.form.Select,
        attrs: {
          className: 'profile-interests-edit',
        },
      },
      orgTypes: {
        factory: t.form.Select,
        attrs: {
          className: 'profile-organization-types-edit',
        },
      },
      selfDefinedRoles: {
        factory: ReactSelectFactory,
        attrs: {
          className: 'profile-roles-edit',
        },
      },
    },
  };
}

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
  image: 1,
  locality: 1,
  administrativeArea: 1,
  country: 1,
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
  getPlays() {
    return Plays.find({ "author.id": this._id });
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
    let profileIds = new Array
    const relatedProfiles = RelatedRecords.find({"profiles": this._id}).map(relatedRecord => {
      for (var i = relatedRecord.profiles.length - 1; i >= 0; i--) {
        if (relatedRecord.profiles[i] == this._id) {
          continue;
        }
        else {
          profileIds.push(relatedRecord.profiles[i]);
        }
      }
    });

    // Subscribe to this group of profiles
    const connectedProfilesSub = Meteor.subscribe('profiles.byId', profileIds);

    // Return array of profile objects instead of just the ids
    return Profiles.find({ '_id': { $in: profileIds } }, {
      fields: Profiles.publicFields,
    }).fetch();
  }
});
