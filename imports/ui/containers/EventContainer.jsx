import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { _ } from 'meteor/underscore';
import { Events } from '../../api/events/events.js';
import { Participants } from '../../api/participants/participants.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleEventSubscription = Meteor.subscribe('events.single', id);
  const event = Events.findOne(id);
  const participantsByEventSubscription = Meteor.subscribe('participants.byEvent', id);
  const participantsByEvent = Participants.find({ 'event._id': id }, {
      fields: Participants.publicFields,
    }).fetch();

  // Subscribe to various profiles we need
  let profileIds = [];

  // Subscribe to show authors
  if (event && event.show && event.show.author) {
    _.each(event.show.author, (author) => profileIds.push(author._id));
  }

  // Subscribe to local organization
  if (event && event.organizations) {
    profileIds.push(event.organizations._id);
  }

  // Add participant profiles to subscription
  if (!_.isEmpty(participantsByEvent)) {
    _.each(participantsByEvent, (participantRecord) => profileIds.push(participantRecord.profile._id));
  }

  const authorsSubscribe = TAPi18n.subscribe('profiles.byId', profileIds);

  const showId = (event && event.show && event.show._id) ? event.show._id : null;
  const showSubscribe = Meteor.subscribe('shows.singleById', showId);

  const loading = !(
    singleEventSubscription.ready() &&
    authorsSubscribe.ready() &&
    showSubscribe.ready()
  );

  return {
    event,
    loading,
    participantsByEvent,
  };
}, EventPage);
