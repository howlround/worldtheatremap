import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { _ } from 'meteor/underscore';
import { Shows } from '../../api/shows/shows.js';
import { Events } from '../../api/events/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import ShowPage from '../pages/ShowPage.jsx';

export default createContainer(({ params: { id } }) => {
  const singleShowSubscribe = Meteor.subscribe('shows.singleById', id);
  const loading = !singleShowSubscribe.ready();
  const show = Shows.findOne(id);
  const showExists = !loading && !!show;
  const showAuthors = [];

  // If necessary another loading prop can be created from eventsByShowSubscribe
  const eventsByShowSubscribe = Meteor.subscribe('events.byShow', id);
  const eventsByShow = Events.find({ 'show._id': id }, {
    fields: Events.publicFields,
    sort: { startDate: -1 },
  }).fetch();

  if (!_.isEmpty(eventsByShow)) {
    _.each(eventsByShow, (event) => showAuthors.push(event.organizations._id));
  }

  if (showExists) {
    _.each(show.author, (author) => showAuthors.push(author._id));
  }

  const authorsSub = TAPi18n.subscribe('profiles.byId', showAuthors);

  return {
    loading,
    show,
    showExists,
    eventsByShow,
  };
}, ShowPage);
