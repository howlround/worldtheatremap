import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventPage from '../pages/EventPage.jsx';

export default createContainer(({ params: { id } }) => {
  const event = Events.findOne(id);
  return {
    event,
    editing: event._id,
  };
}, EventPage);
