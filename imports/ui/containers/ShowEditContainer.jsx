import { Meteor } from 'meteor/meteor';
import { Shows } from '../../api/shows/shows.js';
import { createContainer } from 'meteor/react-meteor-data';
import ShowPage from '../pages/ShowPage.jsx';

export default createContainer(({ params: { id } }) => {
  const show = Shows.findOne(id);
  return {
    show,
    editing: show._id,
  };
}, ShowPage);
