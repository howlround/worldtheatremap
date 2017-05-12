// import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import SiteStatisticsPage from '../pages/SiteStatisticsPage.jsx';

// API
import { Stats } from '../../api/stats/stats.js';

const ContentCountsContainer = createContainer(() => {
  const statsSub = Meteor.subscribe('stats.analytics');
  const OriginalLanguage = Stats.findOne('Original Language');
  const EventsByCountry = Stats.findOne('Events by Country');
  const TheatremakersByCountry = Stats.findOne('Theatremakers by Country');

  return {
    OriginalLanguage,
    EventsByCountry,
    TheatremakersByCountry,
  };
}, SiteStatisticsPage);

export default ContentCountsContainer;
