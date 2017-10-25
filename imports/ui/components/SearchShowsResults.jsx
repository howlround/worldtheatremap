import { Meteor } from 'meteor/meteor';

import Helmet from 'react-helmet';
import qs from 'qs';
import React from 'react';
import { each, isEmpty } from 'lodash';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { OutboundLink } from 'react-ga';

import EventsGlobe from '../components/EventsGlobe.jsx';
import SearchResultsEmptyText from '../components/SearchResultsEmptyText.jsx';
import SearchResultsLoading from '../components/SearchResultsLoading.jsx';
import SearchResultsPager from '../components/SearchResultsPager.jsx';
import SearchResultsToggle from '../components/SearchResultsToggle.jsx';
import SearchShowsResultsSummary from '../components/SearchShowsResultsSummary.jsx';
import ShowTeaser from '../components/ShowTeaser.jsx';

class SearchShowsResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsDisplay: 'list',
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
      shareImageFilename,
    } = this.props;
    const { locale } = this.props.intl;
    const { resultsDisplay } = this.state;

    let output = null;

    if (loading) {
      output = <SearchResultsLoading />;
    } else if (!isEmpty(results)) {
      switch (resultsDisplay) {
        case 'map': {
          // results will either have just a show item or show and events.
          const eventsOnly = [];
          each(results, result => each(result.events, event => eventsOnly.push(event)));

          output = (
            <EventsGlobe
              items={eventsOnly}
            />
          );
          break;
        }

        case 'list':
        default: {
          output = (
            <div className="search-results-wrapper">
              <ul className="search-results">
                {results.map(result => (
                  <li key={result.show._id}>
                    <ShowTeaser
                      show={result.show}
                      eventsByShow={result.events}
                      defaultOpen
                    />
                  </li>
                ))}
              </ul>
              <SearchResultsPager
                count={results.length}
                skip={skip}
                query={query}
                updateQuery={updateQuery}
              />
            </div>
          );
          break;
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
      const searchUrl = `${baseUrl}${locale}/search/shows?${queryString}`;

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
            to={`https://twitter.com/intent/tweet?text=${searchUrl} %23howlround @HowlRound @WorldTheatreMap`}
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

    // Include the map/list toggle on all cases to maintain a consistant interface
    return (
      <div>
        {helmet}
        {pageActionsShare}
        <SearchShowsResultsSummary
          query={query}
          // count={count}
          shareImageFilename={shareImageFilename}
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

SearchShowsResults.contextTypes = {
  router: React.PropTypes.object,
};

SearchShowsResults.propTypes = {
  shareImageFilename: React.PropTypes.string,
  // count: React.PropTypes.number,
  results: React.PropTypes.array,
  loading: React.PropTypes.bool,
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
  skip: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchShowsResults);
