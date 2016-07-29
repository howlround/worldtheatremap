import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import { Participants } from '../participants/participants.js';

class RelatedRecordsCollection extends Mongo.Collection {
  insert(ourRelatedRecord, callback) {
    // const ourRelatedRecord = ourRelatedRecord;

    // if (!ourRelatedRecord.name) {
    //   let nextLetter = 'A';
    //   ourRelatedRecord.name = `Play ${nextLetter}`;

    //   while (!!this.findOne({ name: ourRelatedRecord.name })) {
    //     // not going to be too smart here, can go past Z
    //     nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    //     ourRelatedRecord.name = `Play ${nextLetter}`;
    //   }
    // }

    // @TODO: Save author information to event

    return super.insert(ourRelatedRecord, callback);
  }
  remove(selector, callback) {
    RelatedRecords.remove({ eventId: selector });
    return super.remove(selector, callback);
  }
  reconcile(reconcileRelatedRecord) {
    // Get all participants for this event
    // For each other participant:
    //    - if there is an existing record: (aka they have worked together)
    //      - if this event is already in the list (aka already worked together on this event)
    //        - do nothing
    //      - else : add this event to the events list (aka worked together before on a different event)
    //    - else: create a relatedRecord and add this event to the events list (aka never worked together before)


    // Get all participants for this event
    const allParticipants = Participants.find({'event._id': reconcileRelatedRecord.eventId}, {
      fields: Participants.publicFields,
    }).fetch();

    allParticipants.map(otherParticipant => {
      // @TODO: Handle a single user having multiple roles

      // if there is an existing record: (aka they have worked together)
      const existing = super.findOne({
        profiles: [reconcileRelatedRecord.profileId, otherParticipant.profile.id],
      });

      if (existing) {
        // @TODO: if this event is not already in the list
        // (aka they have not worked together on this event),
        // add this event to the events list
        // (meaning they have worked together before on a different event)
        // and increment the count field
      }
      else {
        // create a relatedRecord and add this event to the events list (aka never worked together before)
        const newRelated = {
          profiles: [
            reconcileRelatedRecord.profileId,
            otherParticipant.profile.id
          ],
          events: [
            reconcileRelatedRecord.eventId
          ],
          count: 1
        }
        super.insert(newRelated);
      }
    });
  }
}

export const RelatedRecords = new RelatedRecordsCollection('RelatedRecords');

// Deny all client-side updates since we will be using methods to manage this collection
RelatedRecords.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?

export const relatedRecordSchema = t.struct({
  profiles: t.list(t.String),
  events: t.list(t.String),
  count: t.Number,
});

export const relatedRecordReconcileSchema = t.struct({
  profileId: t.String,
  eventId: t.String,
});

export const defaultFormOptions = () => {
  return {};
}

// This represents the keys from RelatedRecords objects that should be published
// to the client. If we add secret properties to RelatedRecord objects, don't event
// them here to keep them private to the server.
RelatedRecords.publicFields = {
  profiles: 1,
  count: 1
};

// RelatedRecords.helpers({
//   // A event is considered to be private if it has a userId set
//   isPrivate() {
//     return !!this.userId;
//   },
//   isLastPublicRelatedRecord() {
//     const publicRelatedRecordCount = RelatedRecords.find({ userId: { $exists: false } }).count();
//     return !this.isPrivate() && publicRelatedRecordCount === 1;
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
