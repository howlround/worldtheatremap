import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, FormattedDate, defineMessages, intlShape, injectIntl } from 'react-intl';
import { isEmpty, isNil } from 'lodash';
import sanitizeHtml from 'sanitize-html';

// API
import { upsert } from '../../api/searchShare/methods.js';

// Components
import AdministrativeAreas from '../components/AdministrativeAreas.jsx';
import Countries from '../components/Countries.jsx';
import Interests from '../components/Interests.jsx';
import Languages from '../components/Languages.jsx';
import Localities from '../components/Localities.jsx';

class SearchShowsResultsSummary extends React.Component {
  render() {
    const {
      query,
      // count,
      shareImageFilename,
    } = this.props;
    const { formatMessage, locale, messages } = this.props.intl;

    const pluralTypes = defineMessages({
      show: {
        id: 'plural.show',
        defaultMessage: '{count, plural, one {Show} other {Shows}}',
      },
    });

    // Hard code to zero for now until we get proper counts from the API
    const count = 0;
    const type = formatMessage(pluralTypes.show, { count });
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
      const startDateReact = (
        <IntlProvider locale={locale} messages={messages}>
          <FormattedDate
            value={query.startDate}
            year="numeric"
            month="short"
            day="numeric"
          />
        </IntlProvider>
      );

      const startDateMarkup = ReactDOMServer.renderToStaticMarkup(startDateReact);
      suffixModifiersArray.push(sanitizeHtml(`from ${startDateMarkup}`));
    }

    if (!isNil(query.endDate)) {
      const endDateReact = (
        <IntlProvider locale={locale} messages={messages}>
          <FormattedDate
            value={query.endDate}
            year="numeric"
            month="short"
            day="numeric"
          />
        </IntlProvider>
      );

      const endDateMarkup = ReactDOMServer.renderToStaticMarkup(endDateReact);
      suffixModifiersArray.push(sanitizeHtml(`until ${endDateMarkup}`));
    }

    if (!isNil(query.interests)) {
      const interestsReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Interests
            interests={query.interests}
            conjunction="or"
          />
        </IntlProvider>
      );

      const interestsMarkup = ReactDOMServer.renderToStaticMarkup(interestsReact);
      suffixModifiersArray.push(`interested in ${sanitizeHtml(interestsMarkup)}`);
    }

    // All location fields should be at the end
    if (!isNil(query.locality)) {
      const localitiesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Localities
            localities={query.locality}
            conjunction="or"
          />
        </IntlProvider>
      );

      const localitiesMarkup = ReactDOMServer.renderToStaticMarkup(localitiesReact);
      suffixModifiersArray.push(`in ${sanitizeHtml(localitiesMarkup)}`);
    }

    if (!isNil(query.administrativeArea)) {
      const aaReact = (
        <IntlProvider locale={locale} messages={messages}>
          <AdministrativeAreas
            administrativeAreas={query.administrativeArea}
            conjunction="or"
          />
        </IntlProvider>
      );

      const aaMarkup = ReactDOMServer.renderToStaticMarkup(aaReact);
      suffixModifiersArray.push(`in ${sanitizeHtml(aaMarkup)}`);
    }

    if (!isNil(query.country)) {
      const countriesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Countries
            countries={query.country}
            conjunction="or"
          />
        </IntlProvider>
      );

      const countriesMarkup = ReactDOMServer.renderToStaticMarkup(countriesReact);
      suffixModifiersArray.push(`originally from ${sanitizeHtml(countriesMarkup)}`);
    }

    if (!isNil(query.eventsCountry)) {
      const eventsCountriesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Countries
            countries={query.eventsCountry}
            conjunction="or"
          />
        </IntlProvider>
      );

      const eventsCountriesMarkup = ReactDOMServer.renderToStaticMarkup(eventsCountriesReact);
      suffixModifiersArray.push(`taking place in ${sanitizeHtml(eventsCountriesMarkup)}`);
    }

    if (!isNil(query.postalCode)) {
      suffixModifiersArray.push(`in postal code ${sanitizeHtml(query.postalCode)}`);
    }

    // Pad end of prefix and begining of suffix if they have items
    const prefix = (!isEmpty(prefixModifiersArray)) ? `${prefixModifiersArray.join(' ')} ` : '';
    const suffix = (!isEmpty(suffixModifiersArray)) ? ` ${suffixModifiersArray.join(' and ')}` : '';

    const modifiers = prefix + type + suffix;
    // const summary = `${count} ${modifiers}`;
    const summary = modifiers;

    upsert.call({
      shareImageFilename,
      count,
      summary,
    });

    // Tell Prerender.io that we're ready
    window.prerenderReady = true;

    return (
      <h3 className="search-results-summary">
        {summary}
      </h3>
    );
  }
}

SearchShowsResultsSummary.propTypes = {
  shareImageFilename: React.PropTypes.string,
  query: React.PropTypes.object,
  // count: React.PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchShowsResultsSummary);
