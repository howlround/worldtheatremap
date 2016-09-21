import { Meteor } from 'meteor/meteor';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import ShowPage from '../pages/ShowPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleShowSubscribe = Meteor.subscribe('shows.singleById', id);
  const loading = !singleShowSubscribe.ready();
  const show = Shows.findOne(id);
  const showExists = !loading && !!show;

  if (showExists) {
    const showAuthors = [];
    _.each(show.author, (author) => showAuthors.push(author._id));
    const authorsSub = TAPi18n.subscribe('profiles.byId', showAuthors);
  }

  // If necessary another loading prop can be created from eventsByShowSubscribe
  const eventsByShowSubscribe = Meteor.subscribe('events.byShow', id);
  return {
    loading,
    show,
    showExists,
    eventsByShow: Events.find({ 'show._id': id }, {
      fields: Events.publicFields,
      sort: { startDate: 1 },
    }).fetch(),
  };
}, ShowPage);
