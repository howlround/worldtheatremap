import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Profiles } from '../../api/profiles/profiles.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import HomePage from '../components/HomePage.jsx';
import { _ } from 'meteor/underscore';
import { get } from 'lodash';
import moment from 'moment';

const HomePageContainer = createContainer(() => {
  // Load what's on today data
  const startDate = moment().startOf('day').toDate();
  const endDate = moment().endOf('day').toDate();
  const eventsTodayWithLocationsSubscribe = Meteor.subscribe('events.dateRangeWithLocations', startDate, endDate);
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
    if (get(event, 'show._id')) {
      showsToday.push(event.show._id);
    }

    if (get(event, 'organizations._id')) {
      authorsToday.push(event.organizations._id);
    }

    if (get(event, 'show.author[0]._id')) {
      _.each(event.show.author, (author) => authorsToday.push(author._id));
    }
  });


  const authorsTodaySubscribe = TAPi18n.subscribe('profiles.byId', authorsToday);
  const showsTodaySubscribe = TAPi18n.subscribe('shows.multipleById', showsToday);

  // Language
  // const lang = TAPi18n.getLanguage();
  const lang = window.AppState.getLocale();
  const supportedLanguages = TAPi18n.getLanguages();

  return {
    user: Meteor.user(),
    loading: !(eventsTodayWithLocationsSubscribe.ready() && authorsTodaySubscribe.ready() && showsTodaySubscribe.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    eventsTodayWithLocations,
    eventsTodayCount: eventsTodayWithLocationsCursor.count(),
    startDate,
    endDate,
    lang,
    supportedLanguages,
  };
}, HomePage);

export default HomePageContainer;
