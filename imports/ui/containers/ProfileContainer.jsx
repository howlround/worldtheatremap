import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

// Components
import ProfilePage from '../pages/ProfilePage.jsx';

// Collections
import { RelatedRecords } from '../../api/relatedRecords/relatedRecords.js';
import { Participants } from '../../api/participants/participants.js';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';

const ProfileContainer = createContainer(({ params: { id } }) => {
  const participantsSubscribe = Meteor.subscribe('participants.byProfile', id);

  // Connections
  const connectionsSubscribe = Meteor.subscribe('relatedRecords.byProfile', id);
  let connectionIds = new Array;
  const relatedProfiles = RelatedRecords.find({ "profiles": id }).map(relatedRecord => {
    for (let i = relatedRecord.profiles.length - 1; i >= 0; i--) {
      if (relatedRecord.profiles[i] === id) {
        continue;
      } else {
        connectionIds.push(relatedRecord.profiles[i]);
      }
    }
  });

  // Get data from participant records
  //  - Roles
  //  - Shows
  let roles = new Array;
  let showsToSubscribeTo = new Array;
  let showIdsByOrg = new Array;
  const allNecessaryProfiles = _.clone(connectionIds);
  // Add the author themselves to save a subscription
  allNecessaryProfiles.push(id);

  const participantRecords = Participants.find({ "profile._id": id }, { fields: Participants.publicFields }).fetch();

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

  const loading = !(connectedProfilesSub.ready() && participantsSubscribe.ready() && connectionsSubscribe.ready() && showsSubscribe.ready());

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
        $in: connectionIds
      }
    }, {
      fields: Profiles.publicFields,
    }).fetch() : null;
  const profileExists = !loading && !!profile;

  return {
    loading,
    profile,
    profileExists,
    showsForAuthor,
    showsForOrg,
    roles,
    connections,
  };
}, ProfilePage);

export default ProfileContainer;
