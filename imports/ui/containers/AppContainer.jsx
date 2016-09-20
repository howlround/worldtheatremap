import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';
import moment from 'moment';

export default createContainer(() => {
  // Load what's on today data
  const startDate = moment().startOf('day').toDate();
  const endDate = moment().endOf('day').toDate();
  const eventsWithLocationsSubscribe = Meteor.subscribe('events.dateRangeWithLocations', startDate, endDate);
  const eventsTodayWithLocationsCursor = Events.find(
    {
      lat: {
        $ne: null,
      },
      startDate: {
        $lte: endDate,
      },
      endDate: {
        $gte: startDate,
      },
    },
    {
      fields: Events.publicFields,
      sort: { startDate: 1 }
    });
  const eventsTodayWithLocations = eventsTodayWithLocationsCursor.fetch();

  // Get author and show ids for these events
  const authorsToday = [];
  const showsToday = [];
  _.each(eventsTodayWithLocations, (event) => {
    showsToday.push(event.show._id);
    _.each(event.show.author, (author) => authorsToday.push(author._id));
  });


  const authorsTodaySubscribe = TAPi18n.subscribe('profiles.byId', authorsToday);
  const showsTodaySubscribe = TAPi18n.subscribe('shows.multipleById', showsToday);

  // Language
  // const lang = TAPi18n.getLanguage();
  const lang = window.AppState.getLocale();
  const supportedLanguages = TAPi18n.getLanguages();

  // Start loading all data after
  let loadingFullApp = true;
  if (authorsTodaySubscribe.ready() && showsTodaySubscribe.ready()) {
    const profilesSubscribe = TAPi18n.subscribe('profiles.public');
    const showsSubscribe = Meteor.subscribe('shows.public');
    const eventsSubscribe = Meteor.subscribe('events.public');
    loadingFullApp = !(profilesSubscribe.ready() && showsSubscribe.ready() && eventsSubscribe.ready());
  }

  return {
    user: Meteor.user(),
    loading: !(eventsWithLocationsSubscribe.ready() && authorsTodaySubscribe.ready() && showsTodaySubscribe.ready()),
    loadingFullApp,
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    profiles: Profiles.find().fetch(),
    shows: Shows.find().fetch(),
    eventsTodayWithLocations,
    eventsTodayCount: eventsTodayWithLocationsCursor.count(),
    startDate,
    endDate,
    lang,
    supportedLanguages,
  };
}, App);
