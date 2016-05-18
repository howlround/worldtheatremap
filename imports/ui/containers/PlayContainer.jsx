import { Meteor } from 'meteor/meteor';
import { Plays } from '../../api/plays/plays.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import PlayPage from '../pages/PlayPage.jsx';

export default createContainer(({ params: { id } }) => {
  const play = Plays.findOne(id);
  const eventsByPlay = Meteor.subscribe('events.byPlay', id);
  return {
    play,
    eventsByPlay: Events.find({'play.id': id}, {
      fields: Events.publicFields,
    }).fetch(),
  };
}, PlayPage);
