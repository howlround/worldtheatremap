import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

// Components
import ProfilePage from '../pages/ProfilePage.jsx';

// Collections
import { Affiliations } from '../../api/affiliations/affiliations.js';
import { RelatedRecords } from '../../api/relatedRecords/relatedRecords.js';
import { Participants } from '../../api/participants/participants.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';

const ProfileContainer = createContainer(({ params: { id } }) => {
  let roles = new Array;
  let showsToSubscribeTo = new Array;
  let showIdsByOrg = new Array;
  // const allNecessaryProfiles = _.clone(connectionIds);
  const allNecessaryProfiles = new Array;
  // Add the author themselves to save a subscription
  // We first subscribe to the single profile, then also add them to the big profile sub so it doesn't get removed from minimongo
  allNecessaryProfiles.push(id);


  const singleProfileSub = TAPi18n.subscribe('profiles.singleById', id);
  const participantsSubscribe = Meteor.subscribe('participants.byProfile', id);
  const affiliationsSubscribe = Meteor.subscribe('affiliations.byProfile', id);

  // Connections
  const connectionsSubscribe = Meteor.subscribe('relatedRecords.byProfile', id);
  let connectionIds = new Array;
  const relatedProfiles = RelatedRecords.find({ "profiles": id }).map(relatedRecord => {
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


  // Affilitions (this profile is the child)
  // const affilitionsSubscribe = Meteor.subscribe('affiliations.byProfile', id);
  const affiliationIds = new Array;
  Affiliations.find({ 'profile._id': id }).map(affiliation => {
    // Add to both, one is for subscribing to profiles, one is for passing on just the affilitions to render
    affiliationIds.push(affiliation.parentId);
    allNecessaryProfiles.push(affiliation.parentId);
  });

  // Affilited profiles (this profile is the parent)
  // const affilitedProfilesSubscribe = Meteor.subscribe('affiliations.byParent', id);
  const affiliatedProfileIds = new Array;
  Affiliations.find({ parentId: id }).map(affiliation => {
    // Add to both, one is for subscribing to profiles, one is for passing on just the affilitions to render
    affiliatedProfileIds.push(affiliation.profile._id);
    allNecessaryProfiles.push(affiliation.profile._id);
  });

  // Get data from participant records
  //  - Roles
  //  - Shows
  const participantRecords = Participants.find({ 'profile._id': id }, { fields: Participants.publicFields }).fetch();

  _.each(participantRecords, record => {
    if (!_.contains(roles, record.role)) {
      roles.push(record.role);
      showsToSubscribeTo.push(record.event.show._id);
    }
  });

  // Get shows where this user is the local org for an event
  //  - Get all events where this user is the local org
  //  - Add any show to showsToSubscribeTo;
  const eventsByOrgSub = Meteor.subscribe('events.idsByOrg', id);
  const eventsByOrg = Events.find({'organizations._id': id}, {
    fields: {
      show: 1,
      organizations: 1,
    },
    sort: { startDate: 1 }
  }).fetch();

  if (!_.isEmpty(eventsByOrg)) {
    _.each(eventsByOrg, event => {
      if (event && event.show && event.show._id) {
        showsToSubscribeTo.push(event.show._id);
        showIdsByOrg.push(event.show._id);

        _.each(event.show.author, (author) => allNecessaryProfiles.push(author._id));
      }
    });
  }

  // Subscribe to shows where:
  //  - profile is author
  //  - profile is a participant
  //  - profile is listed as the local org
  const showsSubscribe = Meteor.subscribe('shows.byAuthorPlusOthers', id, showsToSubscribeTo);

  const connectedProfilesSub = TAPi18n.subscribe('profiles.byId', allNecessaryProfiles);

  const profile = Profiles.findOne(id);

  const showsForAuthor = profile ? Shows.find({ "author._id": profile._id }).fetch() : null;

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

  const affiliations = profile ? Profiles.find(
    {
      _id: {
        $in: affiliationIds,
      }
    }, {
      fields: Profiles.autocompleteFields,
    }).fetch() : null;

  const affiliatedProfiles = profile ? Profiles.find(
    {
      _id: {
        $in: affiliatedProfileIds,
      }
    }, {
      fields: Profiles.autocompleteFields,
    }).fetch() : null;

  const loading = !(singleProfileSub.ready());
  const profileExists = !loading && !!profile;

  return {
    loading,
    profile,
    profileExists,
    showsForAuthor,
    showsForOrg,
    roles,
    connections,
    affiliations,
    affiliatedProfiles,
  };
}, ProfilePage);

export default ProfileContainer;
