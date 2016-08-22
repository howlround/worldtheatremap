import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import { eventSchema } from '../events/events.js';
import { RelatedRecords } from '../relatedRecords/relatedRecords.js';

class ParticipantsCollection extends Mongo.Collection {
  insert(ourParticipant, callback) {
    // const ourParticipant = event;
    // if (!ourParticipant.name) {
    //   let nextLetter = 'A';
    //   ourParticipant.name = `Play ${nextLetter}`;

    //   while (!!this.findOne({ name: ourParticipant.name })) {
    //     // not going to be too smart here, can go past Z
    //     nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    //     ourParticipant.name = `Play ${nextLetter}`;
    //   }
    // }

    // Update the relatedRecords collection
    // - Try running it after the insert to speed things up
    // - But running it first means you don't have to exclude it later
    RelatedRecords.reconcile({
      event: ourParticipant.event,
      profileId: ourParticipant.profile.id
    });

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

const atLeastOne = arr => arr.length > 0

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?

export const participantSchema = t.struct({
  profile: relatedProfileSchema,
  role: t.maybe(t.String),
  event: eventSchema,
});

export const participantFormSchema = t.struct({
  profile: relatedProfileSchema,
  role: t.maybe(t.String),
});

const profileLayout = (profile) => {
  return (
    <div className="profile-fields-group autocomplete-group">
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
              autoComplete: 'off',
              placeholder: 'Profile name',
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
        error: 'Role is required',
        attrs: {
          className: 'participant-role-edit',
          placeholder: 'Enter the role you played. Create seperate entries for each role.'
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
  event: 1
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
