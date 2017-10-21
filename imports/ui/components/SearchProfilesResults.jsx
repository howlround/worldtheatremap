import React from 'react';
import Helmet from 'react-helmet';
import {
  each,
  filter,
  isEmpty,
  size,
} from 'lodash';

import ProfileSearchResult from '../components/ProfileSearchResult.jsx';
import ProfilesGlobe from '../components/ProfilesGlobe.jsx';
import SearchProfilesResultsSummary from '../components/SearchProfilesResultsSummary.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';
import SearchResultsToggle from '../components/SearchResultsToggle.jsx';

export default class SearchProfilesResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsDisplay: 'list',
      shareImageId: '',
    };

    this.updateResultsDisplay = this.updateResultsDisplay.bind(this);
  }

  updateResultsDisplay(display) {
    this.setState({ resultsDisplay: display });
  }

  render() {
    const {
      count,
      results,
      loading,
      skip,
      query,
      updateQuery,
      saveShareText,
      shareImageId,
    } = this.props;
    const { resultsDisplay } = this.state;

    let output = null;

    if (loading) {
      output = <SearchResultsLoading />;
    } else if (!_.isEmpty(results)) {
      switch (resultsDisplay) {
        case 'map': {
          // Remove profiles that do not have locations
          const profilesWithLocations = filter(results, profile => (!!profile.lat && !!profile.lon));
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
                { results.map(profile => (
                  <li key={profile._id}>
                    <ProfileSearchResult profile={profile} />
                  </li>
                )) }
              </ul>
              <SearchResultsPager
                count={results.length}
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

    const searchShareImage = shareImageId ? (
      <Helmet
        meta={[
          // { property: 'twitter:card', content: 'summary'},
          { property: 'og:image', content: `https://s3.amazonaws.com/${Meteor.settings.public.AWSShareImageBucket}/out/${shareImageId}.png` },
          // { property: 'twitter:image', content: profile.image },
        ]}
      />
    ) : '';

    // Include the map/list toggle on all cases to maintain a consistant interface
    return (
      <div>
        {searchShareImage}
        <SearchProfilesResultsSummary
          query={query}
          count={count}
          saveShareText={saveShareText}
        />
        <SearchResultsToggle
          toggle={this.updateResultsDisplay}
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
  count: React.PropTypes.number,
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
  shareImageId: React.PropTypes.string,
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
  saveShareText: React.PropTypes.func,
  skip: React.PropTypes.number,
};
