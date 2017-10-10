import { Mongo } from 'meteor/mongo';
import t from 'tcomb-form';
import { Participants } from '../participants/participants.js';

class RelatedRecordsCollection extends Mongo.Collection {
  insert(ourRelatedRecord, callback) {
    // @TODO: Save author information to event (?)

    return super.insert(ourRelatedRecord, callback);
  }
  remove(selector, callback) {
    RelatedRecords.remove({ eventId: selector });
    return super.remove(selector, callback);
  }
  relate(profileIdA, profileIdB, connectionPointId) {
    // if there is an existing record: (aka they have worked together)
    const existing = super.findOne({
      $and: [
        { profiles: { $in: [profileIdA] } }, { profiles: { $in: [profileIdB] } },
      ],
    });

    if (existing) {
      // @TODO: if this event is not already in the list
      // (aka they have not worked together on this event),
      // add this event to the events list
      // (meaning they have worked together before on a different event)
      // and increment the count field
      // @TODO: Handle a single user having multiple roles on the same event
    } else {
      // create a relatedRecord and add this event to the events list
      // (aka never worked together before)
      const newRelated = {
        profiles: [
          profileIdA,
          profileIdB,
        ],
        connectionPoints: [
          connectionPointId,
        ],
        count: 1,
      };
      super.insert(newRelated);
    }
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
  connectionPoints: t.list(t.String),
  count: t.Number,
});

export const relatedRecordReconcileSchema = t.struct({
  profileId: t.String,
  eventId: t.String,
});

export const defaultFormOptions = () => ({});

// This represents the keys from RelatedRecords objects that should be published
// to the client. If we add secret properties to RelatedRecord objects, don't event
// them here to keep them private to the server.
RelatedRecords.publicFields = {
  profiles: 1,
  count: 1,
};

export const relatedRecordReconcileEvent = (reconcileRelatedRecord) => {
  // Get all participants for this event
  const allParticipants = Participants.find({ 'event._id': reconcileRelatedRecord.event._id }, {
    fields: Participants.publicFields,
  }).fetch();

  // Add the show authors into the allParticipants array
  // @TODO: Replace this with _.each
  reconcileRelatedRecord.event.show.author.map(author => {
    const addAuthor = { profile: author };
    allParticipants.push(addAuthor);
  });

  // Add the show authors into the allParticipants array
  const addOrg = { profile: reconcileRelatedRecord.event.organizations };
  allParticipants.push(addOrg);

  // @TODO: Replace this with _.each
  allParticipants.map(otherParticipant => {
    RelatedRecords.relate(
      reconcileRelatedRecord.profileId,
      otherParticipant.profile._id,
      reconcileRelatedRecord.event._id
    );
  });
};
