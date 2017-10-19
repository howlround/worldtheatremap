import React from 'react';
import ReactDOMServer from 'react-dom/server';
import classnames from 'classnames';
import { IntlProvider, FormattedDate, defineMessages, intlShape, injectIntl } from 'react-intl';
import {
  get,
  includes,
  isEmpty,
  isNil,
} from 'lodash';
import sanitizeHtml from 'sanitize-html';

// API
import { upsert } from '../../api/searchShare/methods.js';

// Components
import AdministrativeAreas from '../components/AdministrativeAreas.jsx';
import Countries from '../components/Countries.jsx';
import Interests from '../components/Interests.jsx';
import Languages from '../components/Languages.jsx';
import Localities from '../components/Localities.jsx';
import ShareBackgroundImage from '../components/ShareBackgroundImage.jsx';

class SearchShowsResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
    const { formatMessage, locale, messages } = this.props.intl;

    const pluralTypes = defineMessages({
      show: {
        id: 'plural.show',
        defaultMessage: '{count, plural, one {Show} other {Shows}}',
      },
    });

    let type = formatMessage(pluralTypes.show, { count });
    const prefixModifiersArray = [];
    const suffixModifiersArray = [];

    if (isEmpty(query)) {
      return null;
    }

    // Prefixes
    if (!isNil(query.languages)) {
      const languagesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Languages
            languages={query.languages}
            conjunction="or"
          />
        </IntlProvider>
      );

      prefixModifiersArray.push(sanitizeHtml(ReactDOMServer.renderToStaticMarkup(languagesMarkup)));
    }

    // Suffixes
    if (!isNil(query.eventType)) {
      suffixModifiersArray.push(sanitizeHtml(`that have a ${sanitizeHtml(query.eventType)}`));
    }

    if (!isNil(query.startDate)) {
      const startDateMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <FormattedDate
            value={query.startDate}
            year="numeric"
            month="short"
            day="numeric"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(sanitizeHtml(`from ${ReactDOMServer.renderToStaticMarkup(startDateMarkup)}`));
    }

    if (!isNil(query.endDate)) {
      const endDateMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <FormattedDate
            value={query.endDate}
            year="numeric"
            month="short"
            day="numeric"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(sanitizeHtml(`until ${ReactDOMServer.renderToStaticMarkup(endDateMarkup)}`));
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

      suffixModifiersArray.push(`with a topic of ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(interestsMarkup))}`);
    }

    // All location fields should be at the end
    if (!isNil(query.locality)) {
      const localitiesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Localities
            localities={query.locality}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(`in ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(localitiesMarkup))}`);
    }

    if (!isNil(query.administrativeArea)) {
      const administrativeAreasMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <AdministrativeAreas
            administrativeAreas={query.administrativeArea}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(`in ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(administrativeAreasMarkup))}`);
    }

    if (!isNil(query.country)) {
      const countriesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Countries
            countries={query.country}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(`originally from ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(countriesMarkup))}`);
    }

    if (!isNil(query.eventsCountry)) {
      const countriesMarkup = (
        <IntlProvider locale={locale} messages={messages}>
          <Countries
            countries={query.eventsCountry}
            conjunction="or"
          />
        </IntlProvider>
      );

      suffixModifiersArray.push(`taking place in ${sanitizeHtml(ReactDOMServer.renderToStaticMarkup(countriesMarkup))}`);
    }

    if (!isNil(query.postalCode)) {
      suffixModifiersArray.push(`in postal code ${sanitizeHtml(query.postalCode)}`);
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
    const svg = (
      <svg width="1200" height="630">
        <ShareBackgroundImage />
        <textArea x="20" y="100" fontFamily="OpenSans" fontWeight="900" fontSize="80px" fill="#1cb4b0">
          {count} profile interested in {interestsMarkup}
        </textArea>
      </svg>
    );
    return svg;

    return (
      <h3 className="search-results-summary">
        {count} {modifiers}
      </h3>
    );
  }
}

SearchShowsResultsSummary.propTypes = {
  query: React.PropTypes.object,
  count: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchShowsResultsSummary);
