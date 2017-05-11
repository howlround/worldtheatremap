// import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import SiteStatisticsPage from '../pages/SiteStatisticsPage.jsx';

// API
import { Stats } from '../../api/stats/stats.js';

const ContentCountsContainer = createContainer(() => {
  const statsSub = Meteor.subscribe('stats.analytics');
  const OriginalLanguage = Stats.findOne('Original Language');

  return {
    OriginalLanguage,
  };
}, SiteStatisticsPage);

export default ContentCountsContainer;
