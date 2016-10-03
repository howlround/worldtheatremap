import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';
import { eventSchema } from '../events/forms.js';
import { relatedRecordReconcileEvent } from '../relatedRecords/relatedRecords.js';
import RelatedProfileTextboxContainer from '../../ui/containers/RelatedProfileTextboxContainer.jsx';

class ParticipantsCollection extends Mongo.Collection {
  insert(ourParticipant, callback) {
    // Update the relatedRecords collection
    // - Try running it after the insert to speed things up
    // - But running it first means you don't have to exclude it later
    relatedRecordReconcileEvent({
      event: ourParticipant.event,
      profileId: ourParticipant.profile._id,
    });

    return super.insert(ourParticipant, callback);
  }
  remove(selector, callback) {
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

function renderTextbox(locals) {
  const onChange = (evt) => locals.onChange(evt);
  return (
    <div className="input-group">
      <RelatedProfileTextboxContainer
        disabled={locals.disabled}
        parentValue={locals.value}
        updateParent={onChange}
        attrs={locals.attrs}
      />
    </div>
  );
}

const textboxTemplate = t.form.Form.templates.textbox.clone({ renderTextbox });

// here we are: the factory
class RelatedProfileFactory extends t.form.Textbox {
  getTemplate() {
    return textboxTemplate;
  }
}

export const relatedProfileSchema = t.struct({
  name: t.String,
  _id: t.String,
});

export const participantSchema = t.struct({
  profile: relatedProfileSchema,
  role: t.maybe(t.String),
  event: eventSchema,
});

export const participantFormSchema = t.struct({
  profile: relatedProfileSchema,
  role: t.maybe(t.String),
});

export const defaultFormOptions = () => ({
  fields: {
    profile: {
      factory: RelatedProfileFactory,
      error: 'Profile is required',
      attrs: {
        className: 'participant-profile-edit',
        autoComplete: 'off',
      },
      label: <FormattedMessage
        id="forms.participantNameLabel"
        description="Label for Participant name"
        defaultMessage="Name (individual or organization name)"
      />,
      disableAdd: true,
      disableRemove: true,
      disableOrder: true,
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
          },
        },
        _id: {
          attrs: {
            className: 'participant-profile-id-edit',
          },
        },
      },
    },
    role: {
      error: 'Role is required',
      attrs: {
        className: 'participant-role-edit',
        placeholder: 'Enter the role you played. Create seperate entries for each role.',
      },
      label: <FormattedMessage
        id="forms.participantRoleLabel"
        description="Label for Participant Role"
        defaultMessage="Role (director, designer, dramaturg, performer, co-producer, etc.)"
      />,
    },
  },
});

// This represents the keys from Participants objects that should be published
// to the client. If we add secret properties to Participant objects, don't event
// them here to keep them private to the server.
Participants.publicFields = {
  profile: 1,
  role: 1,
  event: 1,
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
