import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import moment from 'moment';
import SimpleDatePicker from 'simple-date-picker'
// import DayPicker from 'react-day-picker';
// import MomentLocaleUtils from 'react-day-picker/moment';
// import 'moment/locale/ja';
import RelatedShowTextbox from '../../ui/components/RelatedShowTextbox.jsx';
import RelatedProfile from '../../ui/components/RelatedProfile.jsx';

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

      // Set all the dates to 8pm
      ourEvent.startDate = startMoment.hours(20).toDate();
      ourEvent.endDate = endMoment.hours(20).toDate();
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

      // Set the dates to 8pm
      ourEvent.startDate = startMoment.hours(20).toDate();
      ourEvent.endDate = endMoment.hours(20).toDate();
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

/* Date component override */
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

/* Related Show component override */
function renderTextbox(locals) {
  const onChange = (evt) => locals.onChange(evt);
  return (
    <div className="form-group">
      <RelatedShowTextbox parentValue={ locals.value } updateParent={ onChange } attrs={ locals.attrs } />
    </div>
  )
}

const relatedShowTextboxTemplate = t.form.Form.templates.textbox.clone({ renderTextbox })

// here we are: the factory
class RelatedShowFactory extends t.form.Textbox {
  getTemplate() {
    return relatedShowTextboxTemplate
  }
}

// const atLeastOne = arr => arr.length > 0;
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
  streetAddress: t.maybe(t.String),
  locality: t.maybe(t.String), // City
  administrativeArea: t.maybe(t.String), // Province, Region, State
  country: t.maybe(t.String),
  postalCode: t.maybe(t.String),
  lat: t.maybe(t.String),
  lon: t.maybe(t.String),
  about: t.maybe(t.String),
});

export const defaultFormOptions = () => {
  return {
    fields: {
      show: {
        factory: RelatedShowFactory,
        error: 'Show is required',
        label: 'Show name (required)',
        attrs: {
          className: 'event-show-edit',
          autoComplete: 'off',
        },
        fields: {
          name: {
            error: 'Show name is required',
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
      streetAddress: {
        attrs: {
          className: 'event-street-address-edit',
        }
      },
      locality: {
        label: 'City (optional)',
        attrs: {
          className: 'event-locality-edit',
        },
      },
      administrativeArea: {
        label: 'Province, Region, or State (optional)',
        attrs: {
          className: 'event-administrative-area-edit',
        },
      },
      country: {
        attrs: {
          className: 'event-country-edit',
        },
      },
      postalCode: {
        attrs: {
          className: 'event-postal-code-edit',
        },
      },
      lat: {
        attrs: {
          'data-geo': 'lat',
        }
      },
      lon: {
        attrs: {
          'data-geo': 'lng',
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
  streetAddress: 1,
  locality: 1,
  administrativeArea: 1,
  country: 1,
  lat: 1,
  lon: 1,
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
