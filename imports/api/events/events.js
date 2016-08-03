import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import { Profiles } from '../profiles/profiles.js';

class EventsCollection extends Mongo.Collection {
  insert(event, callback) {
    const ourEvent = event;
    // if (!ourEvent.name) {
    //   let nextLetter = 'A';
    //   ourEvent.name = `Play ${nextLetter}`;

    //   while (!!this.findOne({ name: ourEvent.name })) {
    //     // not going to be too smart here, can go past Z
    //     nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    //     ourEvent.name = `Play ${nextLetter}`;
    //   }
    // }

    // @TODO: Save author information to event

    return super.insert(ourEvent, callback);
  }
  remove(selector, callback) {
    Events.remove({ eventId: selector });
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
//   id: t.String,
// });

const EventTypes = t.enums({
  "Work-in-Progress": "Work-in-Progress",
  "Performance": "Performance",
  "HowlRound TV Livestream": "HowlRound TV Livestream",
  "Twitter Chat": "Twitter Chat"
});

const atLeastOne = arr => arr.length > 0
export const relatedPlaySchema = t.struct({
  name: t.String,
  id: t.String,
  // author: t.refinement(t.list(relatedProfileSchema), atLeastOne),
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?
export const eventSchema = t.struct({
  play: relatedPlaySchema,
  eventType: EventTypes,
  about: t.maybe(t.String),
});

const relatedPlayLayout = (play) => {
  return (
    <div className="play-fields-group">
      {play.inputs.name}
      {play.inputs.id}
      <ul className="event-play-edit-results"></ul>
    </div>
  );
};

export const defaultFormOptions = () => {
  return {
    fields: {
      play: {
        auto: 'none',
        error: 'Play is required',
        attrs: {
          className: 'event-play-edit',
        },
        template: relatedPlayLayout,
        fields: {
          name: {
            error: 'Primary authorship is required',
            attrs: {
              className: 'event-play-name-edit',
              autocomplete: 'off'
            }
          },
          id: {
            attrs: {
              className: 'event-play-id-edit'
            }
          }
        }
      },
      eventType: {
        error: 'Event type is required',
        attrs: {
          className: 'event-type-edit',
        }
      },
      about: {
        type: 'textarea',
        attrs: {
          rows: '10',
          className: 'event-about-edit',
        },
      },
    },
  };
}

// This represents the keys from Events objects that should be published
// to the client. If we add secret properties to Event objects, don't event
// them here to keep them private to the server.
Events.publicFields = {
  play: 1,
  about: 1,
  eventType: 1,
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
