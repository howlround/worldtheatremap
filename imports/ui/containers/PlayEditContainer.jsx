import { Meteor } from 'meteor/meteor';
import { Plays } from '../../api/plays/plays.js';
import { createContainer } from 'meteor/react-meteor-data';
import PlayPage from '../pages/PlayPage.jsx';

export default createContainer(({ params: { id } }) => {
  const play = Plays.findOne(id);
  return {
    play,
    editing: play._id,
  };
}, PlayPage);
