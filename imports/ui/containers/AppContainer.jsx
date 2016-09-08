import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';
import moment from 'moment';

export default createContainer(() => {
  // @TODO: All of these need to be moved into more
  // granular subscriptions deeper down the chain
  // https://www.discovermeteor.com/blog/query-constructors/
  // Except some version of events for todays events
  // @TODO: Even today events should be in a new page container then made into an IndexRoute
  const profilesSubscribe = Meteor.subscribe('profiles.public');
  const showsSubscribe = Meteor.subscribe('shows.public');
  // @TODO: Change to events today.
  const startDate = moment().startOf('day').toDate();
  const endDate = moment().endOf('day').toDate();
  const eventsWithLocationsSubscribe = Meteor.subscribe('events.dateRangeWithLocations', startDate, endDate);
  eventsTodayWithLocationsCursor = Events.find(
    {
      'lat': {
        $ne: null
      },
      'startDate': {
        $lte: endDate
      },
      'endDate': {
        $gte: startDate
      }
    },
    {
      fields: Events.publicFields
    });
  return {
    user: Meteor.user(),
    loading: !(profilesSubscribe.ready() && showsSubscribe.ready() && eventsWithLocationsSubscribe.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find().fetch(),
    shows: Shows.find().fetch(),
    eventsTodayWithLocations: eventsTodayWithLocationsCursor.fetch(),
    eventsTodayCount: eventsTodayWithLocationsCursor.count(),
    startDate,
    endDate,
  };
}, App);
