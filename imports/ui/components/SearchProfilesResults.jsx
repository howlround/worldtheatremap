import { Meteor } from 'meteor/meteor';

import Helmet from 'react-helmet';
import qs from 'qs';
import React from 'react';
import { filter, isEmpty } from 'lodash';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { OutboundLink } from 'react-ga';

import ProfileSearchResult from '../components/ProfileSearchResult.jsx';
import ProfilesGlobe from '../components/ProfilesGlobe.jsx';
import SearchProfilesResultsSummary from '../components/SearchProfilesResultsSummary.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';
import SearchResultsToggle from '../components/SearchResultsToggle.jsx';

class SearchProfilesResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      count,
      results,
      loading,
      skip,
      query,
      updateQuery,
      updateResultsDisplay,
      resultsDisplay,
      shareImageFilename,
    } = this.props;
    const { locale } = this.props.intl;

    let output = null;

    if (loading) {
      output = <SearchResultsLoading />;
    } else if (!isEmpty(results)) {
      switch (resultsDisplay) {
        case 'map': {
          // Remove profiles that do not have locations
          const profilesWithLocations = filter(results, profile => (
            !!profile.lat && !!profile.lon
          ));
          output = (
            <ProfilesGlobe
              items={profilesWithLocations}
            />
          );
          break;
        }

        case 'list':
        default: {
          output = (
            <div className="search-results-wrapper">
              <ul className="search-results">
                {results.map(profile => (
                  <li key={profile._id}>
                    <ProfileSearchResult profile={profile} />
                  </li>
                ))}
              </ul>
              <SearchResultsPager
                count={count}
                skip={skip}
                query={query}
                updateQuery={updateQuery}
              />
            </div>
          );
        }
      }
    } else {
      output = <SearchResultsEmptyText />;
    }

    let helmet = '';
    let pageActionsShare = '';
    if (!isEmpty(query)) {
      const baseUrl = Meteor.absoluteUrl(false, { secure: true });
      const queryString = qs.stringify(query);
      const searchUrl = `${baseUrl}${locale}/search/profiles?${queryString}`;

      helmet = (
        <Helmet
          meta={[
            { property: 'og:image', content: `https://s3.amazonaws.com/${Meteor.settings.public.AWSShareImageBucket}/out/${shareImageFilename}.png` },
            { property: 'og:url', content: searchUrl },
            { property: 'twitter:image', content: `https://s3.amazonaws.com/${Meteor.settings.public.AWSShareImageBucket}/out/${shareImageFilename}.png` },
          ]}
        />
      );

      pageActionsShare = (
        <div className="page-actions-share">
          <OutboundLink
            eventLabel="twitter-share"
            to={`https://twitter.com/intent/tweet?text=${searchUrl} @HowlRound`}
            className="twitter-share"
          >
            <FormattedMessage
              id="pageActions.tweet"
              description="Twitter Share Text"
              defaultMessage="Tweet"
            />
          </OutboundLink>
          <OutboundLink
            eventLabel="facebook-share"
            to={`https://www.facebook.com/dialog/share?app_id=662843947226126&display=popup&href=${searchUrl}&redirect_uri=${searchUrl}`}
            className="facebook-share"
          >
            <FormattedMessage
              id="pageActions.share"
              description="Facebook Share Text"
              defaultMessage="Share"
            />
          </OutboundLink>
        </div>
      );
    }

    if (!loading) {
      // Tell Prerender.io that we're ready
      window.prerenderReady = true;
    }

    // Include the map/list toggle on all cases to maintain a consistant interface
    return (
      <div>
        {helmet}
        {pageActionsShare}
        <SearchProfilesResultsSummary
          query={query}
          count={count}
        />
        <SearchResultsToggle
          toggle={updateResultsDisplay}
          active={resultsDisplay}
        />
        {output}
      </div>
    );
  }
}

SearchProfilesResults.contextTypes = {
  router: React.PropTypes.object,
};

SearchProfilesResults.propTypes = {
  shareImageFilename: React.PropTypes.string,
  count: React.PropTypes.number,
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
  resultsDisplay: React.PropTypes.string,
  skip: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfilesResults);
