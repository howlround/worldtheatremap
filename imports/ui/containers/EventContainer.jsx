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
  const participantsByEvent = Meteor.subscribe('participants.byEvent', id);

  // Subscribe to show authors
  let authorIds = [];
  if (event && event.show && event.show.author) {
    authorIds = _.map(event.show.author, (author) => author._id);
  }
  const authorsSubscribe = TAPi18n.subscribe('profiles.byId', authorIds);

  const showId = (event && event.show && event.show._id) ? event.show._id : null;
  const showSubscribe = Meteor.subscribe('shows.singleById', showId);

  const loading = !(
    singleEventSubscription.ready() &&
    participantsByEvent.ready() &&
    authorsSubscribe.ready() &&
    showSubscribe.ready()
  );

  return {
    event,
    loading,
    participantsByEvent: Participants.find({ 'event._id': id }, {
      fields: Participants.publicFields,
    }).fetch(),
  };
}, EventPage);
