import React from 'react';
import ReactDOMServer from 'react-dom/server';
import classnames from 'classnames';
import { IntlProvider, defineMessages, intlShape, injectIntl } from 'react-intl';
import {
  isNil,
  isEmpty,
} from 'lodash';
import sanitizeHtml from 'sanitize-html';

// API
import { upsert } from '../../api/searchShare/methods.js';
// import { update } from '../../api/content/methods.js';

// Components
import Interests from '../components/Interests.jsx';
import ShareBackgroundImage from '../components/ShareBackgroundImage.jsx';

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
    const { formatMessage } = this.props.intl;

    const type = 'profile';
    const modifiersArray = [];

    if (isEmpty(query)) {
      return null;
    }

    if (!isNil(query.interests)) {
      const interests = (query.interests) ?
        <Interests
          interests={query.interests}
          conjunction="or"
        />
        : '';

      const interestsMarkup = (
        <IntlProvider>
          <Interests
            interests={query.interests}
            conjunction="or"
          />
        </IntlProvider>
      );

      modifiersArray.push(`interested in ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(interestsMarkup))}`);
    }

    const modifiers = modifiersArray.join(', ');

    upsert.call({
      count,
      type,
      modifiers,
    });

    // SVG here for manual testing only
    // const svg = (
    //   <svg width="1200" height="630">
    //     <ShareBackgroundImage />
    //     <text x="20" y="100" fontFamily="OpenSans" fontWeight="900" fontSize="80px" fill="#1cb4b0">
    //       {count} profile interested in {interestsMarkup}
    //     </text>
    //   </svg>
    // );
    // return svg;

    return (
      <h3 className="search-results-summary">
        {count} {type} {modifiers}
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
