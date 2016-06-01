import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';

class ParticipantsCollection extends Mongo.Collection {
  insert(event, callback) {
    const ourParticipant = event;
    // if (!ourParticipant.name) {
    //   let nextLetter = 'A';
    //   ourParticipant.name = `Play ${nextLetter}`;

    //   while (!!this.findOne({ name: ourParticipant.name })) {
    //     // not going to be too smart here, can go past Z
    //     nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    //     ourParticipant.name = `Play ${nextLetter}`;
    //   }
    // }

    // @TODO: Save author information to event

    return super.insert(ourParticipant, callback);
  }
  remove(selector, callback) {
    Participants.remove({ eventId: selector });
    return super.remove(selector, callback);
  }
}

export const Participants = new ParticipantsCollection('Participants');

// Deny all client-side updates since we will be using methods to manage this collection
Participants.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const relatedProfileSchema = t.struct({
  name: t.String,
  id: t.String,
});

const Roles = t.enums({
  "Administrator": "Administrator",
  "Show Producer / Curator": "Show Producer / Curator",
  "Agent / Manager": "Agent / Manager",
  "Funder": "Funder",
  "Journalist / Critic": "Journalist / Critic",
  "Production Staff (Stage Managers, Crew, etc.)": "Production Staff (Stage Managers, Crew, etc.)",
  "Technical Staff (Lighting, Set, etc.)": "Technical Staff (Lighting, Set, etc.)",
  "Designers (Lights, Scenic, Props, Costumes, Video, Sound, etc.)": "Designers (Lights, Scenic, Props, Costumes, Video, Sound, etc.)",
  "Performer (Actors, Dancers, Musicians, etc)": "Performer (Actors, Dancers, Musicians, etc)",
  "Stage Director": "Stage Director",
  "Playwright": "Playwright",
  "Translator": "Translator",
  "Dramaturg": "Dramaturg",
  "Educator / Scholar": "Educator / Scholar",
  "Student": "Student",
  "Music Composer": "Music Composer",
});

const atLeastOne = arr => arr.length > 0

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?

export const participantSchema = t.struct({
  profile: relatedProfileSchema,
  role: Roles,
  eventId: t.String,
});

export const participantFormSchema = t.struct({
  profile: relatedProfileSchema,
  role: Roles,
});

const profileLayout = (profile) => {
  return (
    <div className="profile-fields-group">
      {profile.inputs.name}
      {profile.inputs.id}
      <ul className="autocomplete-results"></ul>
    </div>
  );
};

export const defaultFormOptions = () => {
  return {
    fields: {
      profile: {
        auto: 'none',
        error: 'Profile is required',
        attrs: {
          className: 'participant-profile-edit',
        },
        disableAdd: true,
        disableRemove: true,
        disableOrder: true,
        template: profileLayout,
        fields: {
          name: {
            // template: AutosuggestTemplate({
            //   getSuggestions,
            //   getSuggestionValue,
            //   renderSuggestion,
            //   onSuggestionSelected
            // }),
            error: 'Profile is required',
            attrs: {
              className: 'participant-profile-name-edit',
              autocomplete: 'off'
            }
          },
          id: {
            attrs: {
              className: 'participant-profile-id-edit'
            }
          }
        }
      },
      role: {
        factory: t.form.Select,
        error: 'Role is required',
        attrs: {
          className: 'participant-role-edit',
        }
      },
    },
  };
}

// This represents the keys from Participants objects that should be published
// to the client. If we add secret properties to Participant objects, don't event
// them here to keep them private to the server.
Participants.publicFields = {
  profile: 1,
  role: 1,
  eventId: 1
};

Factory.define('event', Participants, {});

// Participants.helpers({
//   // A event is considered to be private if it has a userId set
//   isPrivate() {
//     return !!this.userId;
//   },
//   isLastPublicParticipant() {
//     const publicParticipantCount = Participants.find({ userId: { $exists: false } }).count();
//     return !this.isPrivate() && publicParticipantCount === 1;
//   },
//   editableBy(userId) {
//     if (!this.userId) {
//       return true;
//     }

//     return this.userId === userId;
//   },
//   todos() {
//     return Todos.find({ eventId: this._id }, { sort: { createdAt: -1 } });
//   },
// });
