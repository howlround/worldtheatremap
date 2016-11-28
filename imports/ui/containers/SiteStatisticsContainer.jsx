// import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import SiteStatistics from '../components/SiteStatistics.jsx';

// API
import { Counts } from '../../api/counts/counts.js';

const SiteStatisticsContainer = createContainer(() => {
  const countsSub = Meteor.subscribe('counts.collections');
  const counts = Counts.find().fetch();

  return {
    counts,
  };
}, SiteStatistics);

export default SiteStatisticsContainer;
