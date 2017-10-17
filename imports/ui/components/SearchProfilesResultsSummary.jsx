import React from 'react';
import ReactDOMServer from 'react-dom/server';
import classnames from 'classnames';
import { IntlProvider, defineMessages, intlShape, injectIntl } from 'react-intl';

// API
import { upsert } from '../../api/searchShare/methods.js';
// import { update } from '../../api/content/methods.js';

// Components
import Interests from '../components/Interests.jsx';
import InterestsSVG from '../components/InterestsSVG.jsx';

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
    const { formatMessage } = this.props.intl;

    const interests = (query.interests) ?
      <Interests
        interests={query.interests}
        conjunction="or"
      />
      : '';

    const interestsMarkup = (
      <IntlProvider>
        <InterestsSVG
          interests={query.interests}
          conjunction="or"
        />
      </IntlProvider>
    );

    upsert.call({
      count,
      type: 'profile',
      modifiers: `interested in ${ReactDOMServer.renderToStaticMarkup(interestsMarkup)}`,
    });

    const svg = (
      <svg width="1200" height="630">
        <text x="20" y="20" fontFamily="OpenSans" fontSize="20px" fill="red">
          {count} profile interested in {interestsMarkup}
        </text>
      </svg>
    );

    return svg;

    // const outputSvg = ReactDOMServer.renderToStaticMarkup(svg);
    // console.log(svg);
    // return outputSvg;

    return (
      <h3 className="search-results-summary">
        {count} profile interested in {interests}
      </h3>
    );
  }
}

SearchProfilesResultsSummary.propTypes = {
  query: React.PropTypes.object,
  count: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfilesResultsSummary);
