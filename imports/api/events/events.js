// Meteor
import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';

// Utilities
import { _ } from 'meteor/underscore';
import moment from 'moment';

// API
import { relatedRecordReconcileEvent } from '../../api/relatedRecords/relatedRecords.js';
import { Participants } from '../../api/participants/participants.js';

// Methods
import { upsert as upsertLocality } from '../localities/methods.js';
import { upsert as upsertAdministrativeArea } from '../administrativeAreas/methods.js';
import { upsert as upsertCountry } from '../countries/methods.js';

class EventsCollection extends Mongo.Collection {
  insert(event, callback) {
    const ourEvent = event;
    if (ourEvent.startDate && ourEvent.endDate) {
      // Set all the dates to 8pm
      const startMoment = moment(ourEvent.startDate);
      const endMoment = moment(ourEvent.endDate);
      ourEvent.startDate = startMoment.hours(20).toDate();
      ourEvent.endDate = endMoment.hours(20).toDate();
    }

    if (!_.isEmpty(ourEvent.locality)) {
      upsertLocality.call({ locality: ourEvent.locality });
    }
    if (!_.isEmpty(ourEvent.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: ourEvent.administrativeArea });
    }
    if (!_.isEmpty(ourEvent.country)) {
      upsertCountry.call({ country: ourEvent.country });
    }

    relatedRecordReconcileEvent({
      event: ourEvent,
      profileId: ourEvent.organizations._id,
    });

    // @TODO: Save author information to event
    //        Or maybe check to make sure the correct author is passed in?
    return super.insert(ourEvent, callback);
  }
  update(eventId, event) {
    const ourEvent = event.$set;
    if (ourEvent.startDate && ourEvent.endDate) {
      // Set the dates to 8pm
      const startMoment = moment(ourEvent.startDate);
      const endMoment = moment(ourEvent.endDate);
      ourEvent.startDate = startMoment.hours(20).toDate();
      ourEvent.endDate = endMoment.hours(20).toDate();
    }

    if (!_.isEmpty(ourEvent.locality)) {
      upsertLocality.call({ locality: ourEvent.locality });
    }
    if (!_.isEmpty(ourEvent.administrativeArea)) {
      upsertAdministrativeArea.call({ administrativeArea: ourEvent.administrativeArea });
    }
    if (!_.isEmpty(ourEvent.country)) {
      upsertCountry.call({ country: ourEvent.country });
    }

    if (_.has(ourEvent, 'organizations._id')) {
      relatedRecordReconcileEvent({
        event: ourEvent,
        profileId: ourEvent.organizations._id,
      });
    }

    // @TODO: Save author information to event
    //        Or maybe check to make sure the correct author is passed in?
    return super.update(eventId, {
      $set: ourEvent,
    });
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Events = new EventsCollection('Events');

// Deny all client-side updates since we will be using methods to manage this collection
Events.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// export const relatedProfileSchema = t.struct({
//   name: t.String,
//   _id: t.String,
// });

// This represents the keys from Events objects that should be published
// to the client. If we add secret properties to Event objects, don't event
// them here to keep them private to the server.
Events.publicFields = {
  show: 1,
  organizations: 1,
  startDate: 1,
  endDate: 1,
  streetAddress: 1,
  locality: 1,
  administrativeArea: 1,
  country: 1,
  lat: 1,
  lon: 1,
  about: 1,
  eventType: 1,
  requestRemoval: 1,
};

Factory.define('event', Events, {});

// Events.helpers({
//   // A event is considered to be private if it has a userId set
//   isPrivate() {
//     return !!this.userId;
//   },
//   isLastPublicEvent() {
//     const publicEventCount = Events.find({ userId: { $exists: false } }).count();
//     return !this.isPrivate() && publicEventCount === 1;
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
