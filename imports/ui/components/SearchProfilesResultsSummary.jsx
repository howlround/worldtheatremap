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
import Countries from '../components/Countries.jsx';
import Ethnicities from '../components/Ethnicities.jsx';
import Genders from '../components/Genders.jsx';
import Interests from '../components/Interests.jsx';
import SelfDefinedRoles from '../components/SelfDefinedRoles.jsx';
import ShareBackgroundImage from '../components/ShareBackgroundImage.jsx';

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
    const { formatMessage, locale, messages } = this.props.intl;

    const pluralType = defineMessages({
      'pluralTheatremaker': {
        id: 'plural.theatremaker',
        defaultMessage: '{count, plural, one {Theatremaker} other {Theatremakers}}',
      },
    });

    const type = formatMessage(pluralType.pluralTheatremaker, { count });
    const prefixModifiersArray = [];
    const suffixModifiersArray = [];

    if (isEmpty(query)) {
      return null;
    }

    // Prefixes
    if (!isNil(query.gender)) {
      const genderMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Genders
            genders={query.gender}
            conjunction="or"
          />
        </IntlProvider>
      );

      prefixModifiersArray.push(sanitizeHtml(ReactDOMServer.renderToStaticMarkup(genderMarkup)));
    }

    if (!isNil(query.ethnicityRace)) {
      const ethnicitiesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Ethnicities
            ethnicities={query.ethnicityRace}
            conjunction="or"
          />
        </IntlProvider>
      );

      prefixModifiersArray.push(sanitizeHtml(ReactDOMServer.renderToStaticMarkup(ethnicitiesMarkup)));
    }

    // Suffixes
    if (!isNil(query.selfDefinedRoles)) {
      const rolesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <SelfDefinedRoles
            roles={query.selfDefinedRoles}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(sanitizeHtml(`with the role ${ReactDOMServer.renderToStaticMarkup(rolesMarkup)}`));
    }

    if (!isNil(query.name)) {
      suffixModifiersArray.push(`named ${sanitizeHtml(query.name)}`);
    }

    if (!isNil(query.interests)) {
      const interestsMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Interests
            interests={query.interests}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(`interested in ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(interestsMarkup))}`);
    }

    // All location fields should be at the end
    if (!isNil(query.country)) {
      const countriesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Countries
            countries={query.country}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(`in ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(countriesMarkup))}`);
    }

    // Pad end of prefix and begining of suffix if they have items
    const prefix = (!isEmpty(prefixModifiersArray)) ? `${prefixModifiersArray.join(' ')} ` : '';
    const suffix = (!isEmpty(suffixModifiersArray)) ? ` ${suffixModifiersArray.join(' and ')}` : '';

    const modifiers = prefix + type + suffix;

    upsert.call({
      count,
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
        {count} {modifiers}
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
