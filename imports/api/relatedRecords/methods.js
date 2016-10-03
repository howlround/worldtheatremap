import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import t from 'tcomb-validation';

// import { RelatedRecords, relatedRecordSchema, relatedRecordReconcileSchema } from './relatedRecords.js';
// import { Participants } from '../participants/participants.js';

// export const reconcile = new ValidatedMethod({
//   name: 'relatedRecords.update',
//   validate({ reconcileRelatedRecord }) {
//     const result = t.validate(reconcileRelatedRecord, relatedRecordReconcileSchema);

//     if (!result.isValid()) {
//       throw new ValidationError(result.firstError());
//     }
//   },
//   run({ reconcileRelatedRecord }) {
//     if (!this.userId) {
//       throw new Meteor.Error('relatedRecords.update.accessDenied',
//         'You must be logged in to complete this operation.');
//     }
//     // Get all participants for this event
//     const allParticipants = Participants.find({'event._id': reconcileRelatedRecord.eventId}, {
//       fields: Participants.publicFields,
//     });
//     console.log(allParticipants);
//     // For each other participant:
//     //    - if there is an existing record: (aka they have worked together)
//     //      - if this event is already in the list (aka already worked together on this event)
//     //        - do nothing
//     //      - else : add this event to the events list (aka worked together before on a different event)
//     //    - else: create a relatedRecord and add this event to the events list (aka never worked together before)


//     // Get any existing record???
//     // const relatedRecord = RelatedRecords.findOne({'profiles': reconcileRelatedRecord.profileId, 'events': reconcileRelatedRecord.eventId});

//     //

//     RelatedRecords.update(relatedRecordId, {
//       $set: newRelatedRecord,
//     });
//   },
// });

// Get list of all method names on RelatedRecord
const RELATEDRECORDS_METHODS = _.pluck([
  // reconcile,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 relatedRecord operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(RELATEDRECORDS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
