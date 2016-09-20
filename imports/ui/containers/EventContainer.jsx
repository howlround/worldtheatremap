import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Events } from '../../api/events/events.js';
import { Participants } from '../../api/participants/participants.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleEventSubscription = Meteor.subscribe('events.single', id);
  const event = Events.findOne(id);
  const participantsByEvent = Meteor.subscribe('participants.byEvent', id);

  const loading = !(singleEventSubscription.ready() && participantsByEvent.ready());
  return {
    event,
    loading,
    participantsByEvent: Participants.find({'event._id': id}, {
      fields: Participants.publicFields,
    }).fetch(),
  };
}, EventPage);
