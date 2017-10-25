import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import SiteStatisticsPage from '../pages/SiteStatisticsPage.jsx';

// API
import { Stats } from '../../api/stats/stats.js';

const ContentCountsContainer = createContainer(() => {
  Meteor.subscribe('stats.analytics');
  const OriginalLanguage = Stats.findOne('Content Original Language');
  const EventsByCountry = Stats.findOne('Events by Country');
  const TheatremakersByCountry = Stats.findOne('Theatremakers by Country');
  const OrganizationsByCountry = Stats.findOne('Organizations by Country');

  return {
    OriginalLanguage,
    EventsByCountry,
    TheatremakersByCountry,
    OrganizationsByCountry,
  };
}, SiteStatisticsPage);

export default ContentCountsContainer;
