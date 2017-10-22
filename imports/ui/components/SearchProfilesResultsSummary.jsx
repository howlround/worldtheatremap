import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, FormattedDate, defineMessages, intlShape, injectIntl } from 'react-intl';
import {
  get,
  includes,
  isEmpty,
  isNil,
  words as splitWords,
  size,
} from 'lodash';
import { $ } from 'meteor/jquery';
import sanitizeHtml from 'sanitize-html';
import cheerio from 'cheerio';

// API
import { upsert } from '../../api/searchShare/methods.js';
// import { update } from '../../api/content/methods.js';

// Components
import AdministrativeAreas from '../components/AdministrativeAreas.jsx';
import Countries from '../components/Countries.jsx';
import Ethnicities from '../components/Ethnicities.jsx';
import Genders from '../components/Genders.jsx';
import Interests from '../components/Interests.jsx';
import Localities from '../components/Localities.jsx';
import OrgTypes from '../components/OrgTypes.jsx';
import SelfDefinedRoles from '../components/SelfDefinedRoles.jsx';
import ShareBackgroundImage from '../components/ShareBackgroundImage.jsx';

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count, saveShareText } = this.props;
    const { formatMessage, locale, messages } = this.props.intl;

    const pluralTypes = defineMessages({
      theatremaker: {
        id: 'plural.theatremaker',
        defaultMessage: '{count, plural, one {Theatremaker} other {Theatremakers}}',
      },
      organization: {
        id: 'plural.organization',
        defaultMessage: '{count, plural, one {Organization} other {Organizations}}',
      },
      festival: {
        id: 'plural.festival',
        defaultMessage: '{count, plural, one {Festival} other {Festivals}}',
      },
    });

    let type = formatMessage(pluralTypes.theatremaker, { count });
    const prefixModifiersArray = [];
    const suffixModifiersArray = [];

    if (isEmpty(query)) {
      return null;
    }

    // Change type value for festivals
    if (includes(get(query, 'profileType'), 'Festival')) {
      type = formatMessage(pluralTypes.festival, { count });
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
      const ethnicitiesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Ethnicities
            ethnicities={query.ethnicityRace}
            conjunction="or"
          />
        </IntlProvider>
      );

      const ethnicitiesMarkup = ReactDOMServer.renderToStaticMarkup(ethnicitiesReact);
      prefixModifiersArray.push(sanitizeHtml(ethnicitiesMarkup));
    }

    if (!isNil(query.orgTypes)) {
      const orgTypesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <OrgTypes
            orgTypes={query.orgTypes}
            conjunction="or"
          />
        </IntlProvider>
      );

      const orgTypesMarkup = ReactDOMServer.renderToStaticMarkup(orgTypesReact);
      prefixModifiersArray.push(sanitizeHtml(orgTypesMarkup));

      // Overwrite type
      type = formatMessage(pluralTypes.organization, { count });
    }

    // Suffixes
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

    if (!isNil(query.selfDefinedRoles)) {
      const rolesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <SelfDefinedRoles
            roles={query.selfDefinedRoles}
            conjunction="or"
          />
        </IntlProvider>
      );

      const rolesMarkup = ReactDOMServer.renderToStaticMarkup(rolesReact);
      suffixModifiersArray.push(sanitizeHtml(`with the role ${rolesMarkup}`));
    }

    if (!isNil(query.name)) {
      suffixModifiersArray.push(`named ${sanitizeHtml(query.name)}`);
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
      suffixModifiersArray.push(`in ${sanitizeHtml(countriesMarkup)}`);
    }

    if (!isNil(query.postalCode)) {
      suffixModifiersArray.push(`in postal code ${sanitizeHtml(query.postalCode)}`);
    }

    // Pad end of prefix and begining of suffix if they have items
    const prefix = (!isEmpty(prefixModifiersArray)) ? `${prefixModifiersArray.join(' ')} ` : '';
    const suffix = (!isEmpty(suffixModifiersArray)) ? ` ${suffixModifiersArray.join(' and ')}` : '';

    const modifiers = prefix + type + suffix;
    const summary = `${count} ${modifiers}`;

    const shareRecordId = upsert.call({
      summary,
    });
    saveShareText(summary);

    // Tell Prerender.io that we're ready
    window.prerenderReady = true;

    return (
      <h3 className="search-results-summary">
        {summary}
      </h3>
    );
  }
}

SearchProfilesResultsSummary.propTypes = {
  query: React.PropTypes.object,
  count: React.PropTypes.number,
  saveShareText: React.PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfilesResultsSummary);
