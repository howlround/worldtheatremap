import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import ShowName from '../components/ShowName.jsx';

// Collections
import { Shows } from '../../api/shows/shows.js';

const ShowNameContainer = createContainer((props) => {
  const { showId } = props;
  const showsSub = Meteor.subscribe('shows.singleNameById', showId);

  const loading = !(showsSub.ready());

  const showName = Shows.find(
    {
      _id: showId,
    }, {
      fields: { name: 1 },
    }).fetch()[0];

  const showExists = !loading && !!showName;

  return {
    loading,
    showName,
    showExists,
  };
}, ShowName);

export default ShowNameContainer;
