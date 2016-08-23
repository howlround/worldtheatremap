import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import SimpleDatePicker from 'simple-date-picker'
// import DayPicker from 'react-day-picker';
// import MomentLocaleUtils from 'react-day-picker/moment';
// import 'moment/locale/ja';
import moment from 'moment';
import { Profiles } from '../profiles/profiles.js';

class EventsCollection extends Mongo.Collection {
  insert(event, callback) {
    const ourEvent = event;
    // Construct the human readable date range line
    if (ourEvent.startDate && ourEvent.endDate) {
      const startMoment = moment(ourEvent.startDate);
      const endMoment = moment(ourEvent.endDate);
      const dateRange = startMoment.format('MMM D YYYY') + ' – ' + endMoment.format('MMM D YYYY');
      ourEvent.dateRange = dateRange;
    }

    // @TODO: Save author information to event
    //        Or maybe check to make sure the correct author is passed in?
    return super.insert(ourEvent, callback);
  }
  update(eventId, event, callback) {
    const ourEvent = event.$set;
    // Construct the human readable date range line
    if (ourEvent.startDate && ourEvent.endDate) {

      const startMoment = moment(ourEvent.startDate);
      const endMoment = moment(ourEvent.endDate);
      const dateRange = startMoment.format('MMM D YYYY') + ' – ' + endMoment.format('MMM D YYYY');
      ourEvent.dateRange = dateRange;
    }

    // @TODO: Save author information to event
    //        Or maybe check to make sure the correct author is passed in?
    return super.update(eventId, {
      $set: ourEvent,
    });
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

function renderDate(locals) {
  return (
    <SimpleDatePicker
      value={locals.value}
      onChange={locals.onChange}
    />
  )
}

const dateTemplate = t.form.Form.templates.date.clone({ renderDate });

class DatePickerFactory extends t.form.Component {
  getTemplate() {
    return dateTemplate;
  }
}

t.Date.getTcombFormFactory = () => DatePickerFactory;

const atLeastOne = arr => arr.length > 0
export const relatedShowSchema = t.struct({
  name: t.String,
  id: t.String,
  // author: t.refinement(t.list(relatedProfileSchema), atLeastOne),
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in eventProfile?
export const eventSchema = t.struct({
  show: relatedShowSchema,
  eventType: EventTypes,
  startDate: t.Date,
  endDate: t.Date,
  about: t.maybe(t.String),
});

const relatedShowLayout = (show) => {
  return (
    <div className="show-fields-group autocomplete-group">
      {show.inputs.name}
      {show.inputs.id}
      <ul className="autocomplete-results"></ul>
    </div>
  );
};

export const defaultFormOptions = () => {
  return {
    fields: {
      show: {
        auto: 'none',
        error: 'Show is required',
        attrs: {
          className: 'event-show-edit',
        },
        template: relatedShowLayout,
        fields: {
          name: {
            error: 'Primary authorship is required',
            attrs: {
              className: 'event-show-name-edit',
              autoComplete: 'off',
              placeholder: 'Show name',
            }
          },
          id: {
            attrs: {
              className: 'event-show-id-edit'
            }
          }
        }
      },
      startDate: {
        error: 'Start date is required',
        attrs: {
          className: 'event-start-date-edit',
        },
      },
      endDate: {
        error: 'End date is required',
        attrs: {
          className: 'event-end-date-edit',
        },
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
  show: 1,
  startDate: 1,
  endDate: 1,
  dateRange: 1,
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
