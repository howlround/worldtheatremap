import { Meteor } from 'meteor/meteor';
import { Shows } from '../../api/shows/shows.js';
import { createContainer } from 'meteor/react-meteor-data';
import ShowPage from '../pages/ShowPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleShowSubscribe = TAPi18n.subscribe('shows.singleById', id);
  const loading = !singleShowSubscribe.ready();
  const show = Shows.findOne(id);
  const showExists = !loading && !!show;
  return {
    show,
    editing: showExists ? show._id : null,
  };
}, ShowPage);
