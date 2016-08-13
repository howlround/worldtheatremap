import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import t from 'tcomb-form';
import { Plays } from '../plays/plays.js';
import { Participants } from '../participants/participants.js';
import { RelatedRecords } from '../relatedRecords/relatedRecords.js';

class ProfilesCollection extends Mongo.Collection {
  insert(profile, callback) {
    const ourProfile = profile;
    if (!ourProfile.name) {
      let nextLetter = 'A';
      ourProfile.name = `Profile ${nextLetter}`;

      while (!!this.findOne({ name: ourProfile.name })) {
        // not going to be too smart here, can go past Z
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        ourProfile.name = `Profile ${nextLetter}`;
      }
    }

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

export const profileSchema = t.struct({
  name: t.String,
  about: t.maybe(t.String),
  image: t.maybe(t.String),
  agent: t.maybe(t.String),
  phone: t.maybe(t.String),
  email: t.maybe(t.String),
  website: t.maybe(t.String),
  facebook: t.maybe(t.String),
  twitter: t.maybe(t.String),
  instagram: t.maybe(t.String),
  googlePlus: t.maybe(t.String),
  foundingYear: t.maybe(t.String),
  interests: t.maybe(t.list(Interests)),
  orgTypes: t.maybe(t.list(OrgTypes)),
});

export const defaultFormOptions = () => {
  return {
    fields: {
      name: {
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
      image: {
        attrs: {
          className: 'profile-image-path-edit',
        },
        error: 'something went wrong',
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
      facebook: {
        attrs: {
          className: 'profile-facebook-edit',
        },
      },
      twitter: {
        attrs: {
          className: 'profile-twitter-edit',
        },
      },
      instagram: {
        attrs: {
          className: 'profile-instagram-edit',
        },
      },
      googlePlus: {
        attrs: {
          className: 'profile-google-plus-edit',
        },
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
  agent: 1,
  phone: 1,
  email: 1,
  website: 1,
  facebook: 1,
  twitter: 1,
  instagram: 1,
  googlePlus: 1,
  foundingYear: 1,
  interests: 1,
  orgTypes: 1,
  roles: 1,
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
