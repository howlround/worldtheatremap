import React from 'react';
import { renderToStaticMarkup as markup } from 'react-dom/server';
import {
  IntlProvider,
  FormattedMessage,
  FormattedDate,
  defineMessages,
  intlShape,
  injectIntl,
} from 'react-intl';
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
    const listVersion = [];

    if (isEmpty(query)) {
      return null;
    }

    // Prefixes
    if (!isNil(query.languages)) {
      const languagesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Languages
            languages={query.languages}
            conjunction="or"
          />
        </IntlProvider>
      );

      const languagesMarkup = markup(languagesReact);
      if (locale === 'en') {
        prefixModifiersArray.push(sanitizeHtml(languagesMarkup));
      } else {
        const languagesLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.languagesLabel"
              description="Field label for Languages label on shows"
              defaultMessage="Languages"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(languagesLabel)}: ${languagesMarkup}`));
      }
    }

    // Suffixes
    if (!isNil(query.eventType)) {
      if (locale === 'en') {
        suffixModifiersArray.push(sanitizeHtml(`that have a ${sanitizeHtml(query.eventType)}`));
      } else {
        const eventTypeLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.eventTypeLabel"
              description="Label for a Event type form field"
              defaultMessage="Event type"
            />
          </IntlProvider>
        );
        const i18nEventType = formatMessage({
          id: `eventType.${query.eventType}`,
          defaultMessage: query.eventType,
        });
        listVersion.push(sanitizeHtml(`${markup(eventTypeLabel)}: ${i18nEventType}`));
      }
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

      const startDateMarkup = markup(startDateReact);

      if (locale === 'en') {
        suffixModifiersArray.push(sanitizeHtml(`from ${startDateMarkup}`));
      } else {
        const startDateLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.startDateLabel"
              description="Label for a Start date form field"
              defaultMessage="Start date"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(startDateLabel)}: ${startDateMarkup}`));
      }
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

      const endDateMarkup = markup(endDateReact);

      if (locale === 'en') {
        suffixModifiersArray.push(sanitizeHtml(`until ${endDateMarkup}`));
      } else {
        const endDateLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.endDateLabel"
              description="Label for a End date form field"
              defaultMessage="End date"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(endDateLabel)}: ${endDateMarkup}`));
      }
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

      const interestsMarkup = markup(interestsReact);

      if (locale === 'en') {
        suffixModifiersArray.push(`interested in ${sanitizeHtml(interestsMarkup)}`);
      } else {
        const interestsLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.interestsLabel"
              description="Label for Interests form field"
              defaultMessage="Interests"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(interestsLabel)}: ${interestsMarkup}`));
      }
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

      const localitiesMarkup = markup(localitiesReact);

      if (locale === 'en') {
        suffixModifiersArray.push(`in ${sanitizeHtml(localitiesMarkup)}`);
      } else {
        const localityLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.localityLabel"
              description="Label for a Locality / City form field"
              defaultMessage="City"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(localityLabel)}: ${localitiesMarkup}`));
      }
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

      const aaMarkup = markup(aaReact);

      if (locale === 'en') {
        suffixModifiersArray.push(`in ${sanitizeHtml(aaMarkup)}`);
      } else {
        const administrativeAreaLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.administrativeAreaLabel"
              description="Label for Administrative Area form iel"
              defaultMessage="Province, Region, or State"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(administrativeAreaLabel)}: ${aaMarkup}`));
      }
    }

    if (!isNil(query.eventsCountry)) {
      const eventCountriesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Countries
            countries={query.eventsCountry}
            conjunction="or"
          />
        </IntlProvider>
      );

      const eventsCountryMarkup = markup(eventCountriesReact);

      if (locale === 'en') {
        suffixModifiersArray.push(`in ${sanitizeHtml(eventsCountryMarkup)}`);
      } else {
        const countryLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.countryLabel"
              description="Label for a Country form field"
              defaultMessage="Country"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(countryLabel)}: ${eventsCountryMarkup}`));
      }
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

      const countriesMarkup = markup(countriesReact);

      if (locale === 'en') {
        suffixModifiersArray.push(`from ${sanitizeHtml(countriesMarkup)}`);
      } else {
        const countryLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.countryOfOriginLabel"
              description="Field label for country of origin label on shows"
              defaultMessage="Country of origin"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(countryLabel)}: ${countriesMarkup}`));
      }
    }

    if (!isNil(query.postalCode)) {
      if (locale === 'en') {
        suffixModifiersArray.push(`in postal code ${sanitizeHtml(query.postalCode)}`);
      } else {
        const postalCodeLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.postalCodeLabel"
              description="Label for a Postal code form field"
              defaultMessage="Postal Code"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(postalCodeLabel)}: ${query.postalCode}`));
      }
    }

    // Pad end of prefix and begining of suffix if they have items
    const prefix = (!isEmpty(prefixModifiersArray)) ? `${prefixModifiersArray.join(' ')} ` : '';
    const suffix = (!isEmpty(suffixModifiersArray)) ? ` ${suffixModifiersArray.join(' and ')}` : '';
    const labels = (!isEmpty(listVersion)) ? ` • ${listVersion.join(' • ')} ` : '';

    const modifiers = prefix + type + suffix + labels;
    // const summary = `${count} ${modifiers}`;
    const summary = modifiers;

    upsert.call({
      shareImageFilename,
      count,
      summary,
      locale,
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
