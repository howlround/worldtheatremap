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
  let roles = new Array;
  let showsToSubscribeTo = new Array;
  let showIdsByOrg = new Array;
  let eventIdsByProfile = new Array;
  let eventsByShowByRole = new Array;
  let eventsByShowByOrg = new Array;
  // const allNecessaryProfiles = _.clone(connectionIds);
  const allNecessaryProfiles = new Array;
  // Add the author themselves to save a subscription
  // We first subscribe to the single profile, then also add them to the big profile sub so it doesn't get removed from minimongo
  allNecessaryProfiles.push(id);


  const singleProfileSub = TAPi18n.subscribe('profiles.singleById', id);
  const participantsSubscribe = Meteor.subscribe('participants.byProfile', id);
  const affiliationsSubscribe = Meteor.subscribe('affiliations.byProfile', id);
  // const festivalOrganizersSubscribe = Meteor.subscribe('festivalOrganizers.byProfile', id);

  // Connections
  const connectionsSubscribe = Meteor.subscribe('relatedRecords.byProfile', id);
  let connectionIds = new Array;
  const relatedProfiles = RelatedRecords.find({ "profiles": id }, { limit: 25 }).map(relatedRecord => {
    for (let i = relatedRecord.profiles.length - 1; i >= 0; i--) {
      if (relatedRecord.profiles[i] === id) {
        continue;
      } else {
        // Add to both, one is for subscribing to profiles, one is for passing on just the connections to render
        connectionIds.push(relatedRecord.profiles[i]);
        allNecessaryProfiles.push(relatedRecord.profiles[i]);
      }
    }
  });

  // Subscribe to all affiliation records regardless of parent or child status
  const affilitedProfilesSubscribe = Meteor.subscribe('affiliations.anyById', id);

  // Subscribe to all festivalOrganizer records regardless of parent or child status
  const festivalProfilesSubscribe = Meteor.subscribe('festivalOrganizers.anyById', id);

  // Affilitions (this profile is the child)
  // const affilitionsSubscribe = Meteor.subscribe('affiliations.byProfile', id);
  // const affiliationIds = new Array;
  const affiliations = Affiliations.find({ 'profile._id': id }).map(affiliation => {
    // Add to both, one is for subscribing to profiles, one is for passing on just the affilitions to render
    // affiliationIds.push(affiliation.parentId);
    allNecessaryProfiles.push(affiliation.parentId);
    return affiliation;
  });

  // Affilited profiles (this profile is the parent)
  // const affilitedProfilesSubscribe = Meteor.subscribe('affiliations.byParent', id);
  // const affiliatedProfileIds = new Array;
  const affiliatedProfiles = Affiliations.find({ parentId: id }).map(affiliation => {
    // Add to both, one is for subscribing to profiles, one is for passing on just the affilitions to render
    // affiliatedProfileIds.push(affiliation.profile._id);
    allNecessaryProfiles.push(affiliation.profile._id);
    return affiliation;
  });

  // FestivalOrganizers (this profile is the child)
  // const festivalOrganizerSubscribe = Meteor.subscribe('festivalOrganizers.byProfile', id);
  // const festivalOrganizerIds = new Array;
  const festivalOrganizers = FestivalOrganizers.find({ 'profile._id': id }).map(festivalOrganizer => {
    // Add to both, one is for subscribing to profiles, one is for passing on just the festivalOrganizer to render
    // festivalOrganizerIds.push(festivalOrganizer.parentId);
    allNecessaryProfiles.push(festivalOrganizer.parentId);
    return festivalOrganizer;
  });

  // Affilited profiles (this profile is the parent)
  // const affilitedProfilesSubscribe = Meteor.subscribe('festivalOrganizers.byParent', id);
  // const affiliatedProfileIds = new Array;
  const festivalProfiles = FestivalOrganizers.find(
    {
      parentId: id
    },
    {
      sort: {
        'profile.startDate': -1,
        'profile.name': -1,
      }
    }
  ).map(festivalOrganizer => {
    // Add to both, one is for subscribing to profiles, one is for passing on just the affilitions to render
    // affiliatedProfileIds.push(festivalOrganizer.profile._id);
    allNecessaryProfiles.push(festivalOrganizer.profile._id);
    return festivalOrganizer;
  });

  // Get data from participant records
  //  - Roles
  //  - Shows
  //  - Events
  const participantRecords = Participants.find({ 'profile._id': id }, { fields: Participants.publicFields }).fetch();

  _.each(participantRecords, record => {
    if (!_.contains(roles, record.role)) {
      roles.push(record.role);
    }
    showsToSubscribeTo.push(record.event.show._id);

    // Subscribe to each event also.
    eventIdsByProfile[record.event._id] = record.event._id;

    // Also store all events by role to display later
    if (!_.has(eventsByShowByRole, record.role)) {
      eventsByShowByRole[record.role] = new Array;
    }

    if (!_.has(eventsByShowByRole[record.role], record.event.show._id)) {
      eventsByShowByRole[record.role][record.event.show._id] = new Array;
    }
    // .push is ok here because there shouldn't be the same role on the same event
    eventsByShowByRole[record.role][record.event.show._id].push(record.event);

    // Populate eventsByShowByOrg
    // @TODO: Merge eventsByShowByRole and eventsByShowByOrg
    // turn this into eventsByShowByRole['organization'][record.event.show._id]
    if (_.isEmpty(eventsByShowByOrg[record.event.show._id])) {
      eventsByShowByOrg[record.event.show._id] = new Array;
    }
    // If anything about this gets loaded twice make sure to have unique events.
    eventsByShowByOrg[record.event.show._id][record.event._id] = record.event;


    // Add Show authors
    _.each(record.event.show.author, (author) => allNecessaryProfiles.push(author._id));
    // Add Event organizations
    _.each(record.event.organizations, (organization) => allNecessaryProfiles.push(organization._id));
  });

  // Get shows where this user is the local org for an event
  //  - Get all events where this user is the local org
  //  - Add any show to showsToSubscribeTo;
  const eventsByOrgSub = Meteor.subscribe('events.byOrgPlusIds', id, eventIdsByProfile);
  const eventsByOrg = Events.find({'organizations._id': id}, {
    fields: Events.publicFields,
    sort: { startDate: 1 }
  }).fetch();


  if (!_.isEmpty(eventsByOrg)) {
    _.each(eventsByOrg, event => {
      if (event && event.show && event.show._id) {
        showsToSubscribeTo.push(event.show._id);
        showIdsByOrg.push(event.show._id);

        _.each(event.show.author, (author) => allNecessaryProfiles.push(author._id));

        // Populate eventsByShowByOrg
        if (_.isEmpty(eventsByShowByOrg[event.show._id])) {
          eventsByShowByOrg[event.show._id] = new Array;
        }
        eventsByShowByOrg[event.show._id].push(event);
      }
    });
  }

  // Subscribe to shows where:
  //  - profile is author
  //  - profile is a participant
  //  - profile is listed as the local org
  const showsSubscribe = TAPi18n.subscribe('shows.byAuthorPlusOthers', id, showsToSubscribeTo);

  const profile = Profiles.findOne(id);

  const showsForAuthor = profile ? Shows.find({ "author._id": profile._id }).fetch() : null;
  if (!_.isEmpty(showsForAuthor)) {
    _.each(showsForAuthor, show => {
      if (show && show.author) {
        _.each(show.author, (author) => allNecessaryProfiles.push(author._id));
      }
    });
  }

  const connectedProfilesSub = TAPi18n.subscribe('profiles.byId', allNecessaryProfiles);

  const showsForOrg = profile ? Shows.find(
    {
      _id: {
        $in: showIdsByOrg,
      }
    }
  ).fetch() : null;

  const connections = profile ? Profiles.find(
    {
      _id: {
        $in: connectionIds,
      }
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
    showsForOrg,
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
