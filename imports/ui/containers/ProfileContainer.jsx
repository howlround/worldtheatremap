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

const ProfileContainer = createContainer(({ params: { id } }) => {
  // @TODO: This should be more specific (by user?)
  const participantsSubscribe = Meteor.subscribe('participants.byProfile', id);

  // Connections
  // @TODO: Refactor to not push to the connectionIds array
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

  // Add the author themselves to save a subscription
  const allNecessaryProfiles = _.clone(connectionIds);
  allNecessaryProfiles.push(id);
  const connectedProfilesSub = TAPi18n.subscribe('profiles.byId', allNecessaryProfiles);

  // Get data from participant records
  //  - Roles
  //  - Shows
  let roles = new Array;
  let showsToSubscribeTo = new Array;
  const participantRecords = Participants.find({ "profile._id": id }, { fields: Participants.publicFields }).fetch();

  _.each(participantRecords, record => {
    if (!_.contains(roles, record.role)) {
      roles.push(record.role);
      showsToSubscribeTo.push(record.event.show._id);
    }
  });

  // Subscribe to shows where:
  //  - profile is author
  //  - profile is a participant
  const showsSubscribe = Meteor.subscribe('shows.byAuthorPlusOthers', id, showsToSubscribeTo);

  const loading = !(connectedProfilesSub.ready() && participantsSubscribe.ready() && connectionsSubscribe.ready() && showsSubscribe.ready());

  const profile = Profiles.findOne(id);
  const shows = profile ? Shows.find({ "author._id": profile._id }).fetch() : null;
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
    shows,
    roles,
    connections,
  };
}, ProfilePage);

export default ProfileContainer;
