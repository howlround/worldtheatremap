// import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import ContentCounts from '../components/ContentCounts.jsx';

// API
import { Counts } from '../../api/counts/counts.js';

const ContentCountsContainer = createContainer(() => {
  const countsSub = Meteor.subscribe('counts.collections');
  const counts = Counts.find().fetch();

  return {
    counts,
  };
}, ContentCounts);

export default ContentCountsContainer;
