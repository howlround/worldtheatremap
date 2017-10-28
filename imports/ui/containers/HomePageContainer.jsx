// Utilities
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { _ } from 'meteor/underscore';
import { createContainer } from 'meteor/react-meteor-data';
import { get, each } from 'lodash';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

// API
import { Profiles } from '../../api/profiles/profiles.js';
import { Events } from '../../api/events/events.js';
import { Variables } from '../../api/variables/variables.js';

// Components
import HomePage from '../components/HomePage.jsx';

const HomePageContainer = createContainer(() => {
  // Load what's on today data
  const startDate = moment().startOf('day').toDate();
  const endDate = moment().add(1, 'month').endOf('day').toDate();
  const eventsWithLocationsSub = Meteor.subscribe('events.dateRangeWithLocations', startDate, endDate); // eslint-disable-line max-len
  const eventsWithLocationsCursor = Events.find(
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
      sort: { startDate: 1 },
    });
  const eventsTodayWithLocations = eventsWithLocationsCursor.fetch();

  // Get author and show ids for these events
  const profilesLoad = [];
  const showsLoad = [];
  _.each(eventsTodayWithLocations, (event) => {
    if (get(event, 'show._id')) {
      showsLoad.push(event.show._id);
    }

    if (get(event, 'organizations._id')) {
      profilesLoad.push(event.organizations._id);
    }

    if (get(event, 'show.author[0]._id')) {
      _.each(event.show.author, (author) => profilesLoad.push(author._id));
    }
  });

  // Get profiles for the people globe


  // Featured Howlround Posts
  // Trigger call to get current set of posts
  // This will update the database with current posts
  Meteor.call('howlround.getPosts', {});
  // Subscribe to local posts: howlroundPostsSub
  Meteor.subscribe('variables.get', ['featuredHowlroundPosts']);
  const howlroundPostsQuery = Variables.findOne('featuredHowlroundPosts');
  const howlroundPosts = get(howlroundPostsQuery, 'value') ? howlroundPostsQuery.value : [];

  // Load profiles for the homepage visualization
  const profilesVisQuery = {
    gender: {
      $in: ['Female'],
    },
    lat: {
      $ne: null,
    },
    imageWide: {
      $ne: null,
    },
  };
  const profilesHomepageVizSub = TAPi18n.subscribe('profiles.viz', profilesVisQuery);
  const profilesVisCursor = Profiles.find(
    profilesVisQuery,
    {
      fields: Profiles.publicFields,
    }
  );
  const profilesVis = profilesVisCursor.fetch();
  each(profilesVis, vizProfile => {
    profilesLoad.push(vizProfile._id);
  });

  // profilesHomepageSub
  TAPi18n.subscribe('profiles.byId', profilesLoad);

  // showsTodaySubscribe
  TAPi18n.subscribe('shows.multipleById', showsLoad);

  // Language
  // const locale = TAPi18n.getLanguage();
  const locale = window.AppState.getLocale();
  const supportedLanguages = TAPi18n.getLanguages();

  return {
    // Purposely excluding profiles sub and shows sub to speed up loading time.
    loading: !(eventsWithLocationsSub.ready() && profilesHomepageVizSub.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    eventsTodayWithLocations,
    eventsTodayCount: eventsWithLocationsCursor.count(),
    startDate,
    endDate,
    profilesVis,
    profilesVisCount: profilesVisCursor.count(),
    howlroundPosts,
    locale,
    supportedLanguages,
  };
}, HomePage);

export default HomePageContainer;
