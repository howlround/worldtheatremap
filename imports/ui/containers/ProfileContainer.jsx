import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

// Components
import ProfilePage from '../pages/ProfilePage.jsx';

// Collections
import { Affiliations } from '../../api/affiliations/affiliations.js';
import { FestivalOrganizers } from '../../api/festivalOrganizers/festivalOrganizers.js';
import { RelatedRecords } from '../../api/relatedRecords/relatedRecords.js';
import { Participants } from '../../api/participants/participants.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';

const ProfileContainer = createContainer(({ params: { id } }) => {
  const roles = [];
  const showsToSubscribeTo = [];
  const showIdsByOrg = [];
  const eventIdsByProfile = [];
  let eventsByShowByRole = [];
  const eventsByShowByOrg = [];
  // const allNecessaryProfiles = _.clone(connectionIds);
  const allNecessaryProfiles = [];
  // Add the author themselves to save a subscription
  // We first subscribe to the single profile,
  // then also add them to the big profile sub so it doesn't get removed from minimongo
  allNecessaryProfiles.push(id);


  const singleProfileSub = TAPi18n.subscribe('profiles.singleById', id);
  // participantsSubscribe
  Meteor.subscribe('participants.byProfile', id);
  // affiliationsSubscribe
  Meteor.subscribe('affiliations.byProfile', id);
  // const festivalOrganizersSubscribe = Meteor.subscribe('festivalOrganizers.byProfile', id);

  // Connections
  // connectionsSubscribe
  Meteor.subscribe('relatedRecords.byProfile', id);
  const connectionIds = [];
  // relatedProfiles
  RelatedRecords.find({ profiles: id }, { limit: 25 }).map(relatedRecord => {
    for (let i = relatedRecord.profiles.length - 1; i >= 0; i--) {
      if (relatedRecord.profiles[i] === id) {
        continue;
      } else {
        // Add to both, one is for subscribing to profiles,
        // one is for passing on just the connections to render
        connectionIds.push(relatedRecord.profiles[i]);
        allNecessaryProfiles.push(relatedRecord.profiles[i]);
      }
    }
  });

  // Subscribe to all affiliation records regardless of parent or child status
  // affilitedProfilesSubscribe
  Meteor.subscribe('affiliations.anyById', id);

  // Subscribe to all festivalOrganizer records regardless of parent or child status
  // festivalProfilesSubscribe
  Meteor.subscribe('festivalOrganizers.anyById', id);

  // Affilitions (this profile is the child)
  // const affilitionsSubscribe = Meteor.subscribe('affiliations.byProfile', id);
  // const affiliationIds = [];
  const affiliations = Affiliations.find({ 'profile._id': id }).map(affiliation => {
    // Add to both, one is for subscribing to profiles,
    // one is for passing on just the affilitions to render
    // affiliationIds.push(affiliation.parentId);
    allNecessaryProfiles.push(affiliation.parentId);
    return affiliation;
  });

  // Affilited profiles (this profile is the parent)
  // const affilitedProfilesSubscribe = Meteor.subscribe('affiliations.byParent', id);
  // const affiliatedProfileIds = [];
  const affiliatedProfiles = Affiliations.find({ parentId: id }).map(affiliation => {
    // Add to both, one is for subscribing to profiles,
    // one is for passing on just the affilitions to render
    // affiliatedProfileIds.push(affiliation.profile._id);
    allNecessaryProfiles.push(affiliation.profile._id);
    return affiliation;
  });

  // FestivalOrganizers (this profile is the child)
  // const festivalOrganizerSubscribe = Meteor.subscribe('festivalOrganizers.byProfile', id);
  // const festivalOrganizerIds = [];
  const festivalOrganizers = FestivalOrganizers
    .find({ 'profile._id': id })
    .map(festivalOrganizer => {
      // Add to both, one is for subscribing to profiles,
      // one is for passing on just the festivalOrganizer to render
      // festivalOrganizerIds.push(festivalOrganizer.parentId);
      allNecessaryProfiles.push(festivalOrganizer.parentId);
      return festivalOrganizer;
    });

  // Affilited profiles (this profile is the parent)
  // const affilitedProfilesSubscribe = Meteor.subscribe('festivalOrganizers.byParent', id);
  // const affiliatedProfileIds = [];
  const festivalProfiles = FestivalOrganizers.find(
    {
      parentId: id,
    },
    {
      sort: {
        // 'profile.startDate': -1,
        'profile.name': -1,
      },
    }
  ).map(festivalOrganizer => {
    // Add to both, one is for subscribing to profiles,
    // one is for passing on just the affilitions to render
    // affiliatedProfileIds.push(festivalOrganizer.profile._id);
    allNecessaryProfiles.push(festivalOrganizer.profile._id);
    return festivalOrganizer;
  });

  // Get data from participant records
  //  - Roles
  //  - Shows
  //  - Events
  const participantRecords = Participants.find(
    { 'profile._id': id },
    { fields: Participants.publicFields }
  ).fetch();

  _.each(participantRecords, record => {
    // Normalize all role names to prevent duplicates appearing on profiles
    const normRole = record.role.toUpperCase();
    if (!_.contains(roles, normRole)) {
      roles.push(normRole);
    }
    showsToSubscribeTo.push(record.event.show._id);

    // Subscribe to each event also.
    eventIdsByProfile[record.event._id] = record.event._id;

    // Also store all events by role to display later
    if (!_.has(eventsByShowByRole, normRole)) {
      eventsByShowByRole[normRole] = [];
    }

    if (!_.has(eventsByShowByRole[normRole], record.event.show._id)) {
      eventsByShowByRole[normRole][record.event.show._id] = [];
    }
    // .push is ok here because there shouldn't be the same role on the same event
    // push or unshift depending on event date
    if (
      eventsByShowByRole[normRole][record.event.show._id].length > 0 &&
      record.event.endDate > eventsByShowByRole[normRole][record.event.show._id][0].endDate
    ) {
      eventsByShowByRole[normRole][record.event.show._id].unshift(record.event);
    } else {
      eventsByShowByRole[normRole][record.event.show._id].push(record.event);
    }

    // Add Show authors
    _.each(record.event.show.author, (author) => {
      allNecessaryProfiles.push(author._id);
    });
    // Add Event organizations
    _.each(record.event.organizations, (organization) => {
      allNecessaryProfiles.push(organization._id);
    });
  });

  // Sort eventsByShowByRole
  const eventsByShowByRoleSorted = [];
  _.each(Object.keys(eventsByShowByRole), roleKey => {
    eventsByShowByRoleSorted[roleKey] = [];
    _.each(Object.keys(eventsByShowByRole[roleKey]), showKey => {
      eventsByShowByRoleSorted[roleKey].push({
        showKey,
        events: eventsByShowByRole[roleKey][showKey],
      });
    });
  });

  _.each(Object.keys(eventsByShowByRoleSorted), roleKey => {
    eventsByShowByRoleSorted[roleKey].sort((a, b) => {
      let sort = -1;
      if (a.events[0].endDate < b.events[0].endDate) {
        sort = 1;
      }
      return sort;
    });
  });

  // Rebuild the eventsByShowByRole object
  eventsByShowByRole = [];
  _.each(Object.keys(eventsByShowByRoleSorted), roleKey => {
    eventsByShowByRole[roleKey] = [];
    _.each(eventsByShowByRoleSorted[roleKey], sortedShows => {
      eventsByShowByRole[roleKey][sortedShows.showKey] = sortedShows.events;
    });
  });

  // _.each(eventsByShowByRoleSorted, (sortObject, index) => {
  //   console.log(sortObject.events[0].endDate);
  // });

  // Get shows where this user is the local org for an event
  //  - Get all events where this user is the local org
  //  - Add any show to showsToSubscribeTo;
  // eventsByOrgSub
  Meteor.subscribe('events.byOrgPlusIds', id, eventIdsByProfile);
  const eventsByOrg = Events.find({ 'organizations._id': id }, {
    fields: Events.publicFields,
    sort: { endDate: -1 },
  }).fetch();


  if (!_.isEmpty(eventsByOrg)) {
    _.each(eventsByOrg, event => {
      if (event && event.show && event.show._id) {
        showsToSubscribeTo.push(event.show._id);
        showIdsByOrg.push(event.show._id);

        _.each(event.show.author, (author) => allNecessaryProfiles.push(author._id));

        // Populate eventsByShowByOrg
        if (_.isEmpty(eventsByShowByOrg[event.show._id])) {
          eventsByShowByOrg[event.show._id] = {
            show: event.show,
            events: [],
          };
        }
        eventsByShowByOrg[event.show._id].events.push(event);
      }
    });
  }

  // Subscribe to shows where:
  //  - profile is author
  //  - profile is a participant
  //  - profile is listed as the local org
  // showsSubscribe
  TAPi18n.subscribe('shows.byAuthorPlusOthers', id, showsToSubscribeTo);

  const profile = Profiles.findOne(id);

  const showsForAuthor = profile ?
    Shows.find(
      { 'author._id': profile._id },
      { sort: { name: 1 } }
    ).fetch() :
    null;
  if (!_.isEmpty(showsForAuthor)) {
    _.each(showsForAuthor, show => {
      if (show && show.author) {
        _.each(show.author, (author) => allNecessaryProfiles.push(author._id));
      }
    });
  }

  // connectedProfilesSub
  TAPi18n.subscribe('profiles.byId', allNecessaryProfiles);

  const connections = profile ? Profiles.find(
    {
      _id: {
        $in: connectionIds,
      },
    }, {
      fields: Profiles.autocompleteFields,
    }).fetch() : null;

  // const affiliations = profile ? Profiles.find(
  //   {
  //     _id: {
  //       $in: affiliationIds,
  //     }
  //   }, {
  //     fields: Profiles.autocompleteFields,
  //   }).fetch() : null;

  // const affiliatedProfiles = profile ? Profiles.find(
  //   {
  //     _id: {
  //       $in: affiliatedProfileIds,
  //     }
  //   }, {
  //     fields: Profiles.autocompleteFields,
  //   }).fetch() : null;

  const loading = !(singleProfileSub.ready());
  const profileExists = !loading && !!profile;

  return {
    loading,
    profile,
    profileExists,
    showsForAuthor,
    eventsByShowByOrg,
    eventsByShowByRole,
    roles,
    connections,
    affiliations,
    affiliatedProfiles,
    festivalOrganizers,
    festivalProfiles,
  };
}, ProfilePage);

export default ProfileContainer;
