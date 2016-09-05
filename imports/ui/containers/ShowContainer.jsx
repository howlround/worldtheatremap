import { Meteor } from 'meteor/meteor';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import ShowPage from '../pages/ShowPage.jsx';

export default createContainer(({ params: { id } }) => {
  const show = Shows.findOne(id);
  const eventsByShow = Meteor.subscribe('events.byShow', id);
  return {
    show,
    eventsByShow: Events.find({'show.id': id}, {
      fields: Events.publicFields,
      sort: { startDate: 1 },
    }).fetch(),
  };
}, ShowPage);
