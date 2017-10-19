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

// Adapted from https://bl.ocks.org/mbostock/7555321
const wrap = (inputText, width) => {
  const text = $('<text></text>');
  const words = splitWords(inputText).reverse();
  let word = null;
  let line = [];
  let lineNumber = 0;
  const lineHeight = 1.1;
  const y = 30;
  const x = 40;
  const dy = 1;
  let tspan = $('<tspan></tspan>').attr('x', x).attr('dy', `${dy}em`);
  $(text).append(tspan);

  while (word = words.pop()) {
    line.push(word);
    const expandedLine = line.join(' ');
    tspan.text(expandedLine);

    if (size(tspan.text()) > width) {
      line.pop();
      tspan.text(line.join(' '));
      line = [word];
      tspan = $('<tspan></tspan>')
        .attr('x', x)
        .attr('dy', `${dy}em`)
        .text(word);
      $(text).append(tspan);
    }
  }

  return text;
};

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
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

    upsert.call({
      count,
      modifiers,
    });

    // SVG here for manual testing only
    // const singleLineText = `${count} ${modifiers}`;
    // const wrappedText = wrap(singleLineText, 24);
    // const svg = (
    //   <svg width="1200" height="630">
    //     <ShareBackgroundImage />
    //     <text
    //       dangerouslySetInnerHTML={{ __html: wrappedText[0].innerHTML }}
    //       x="40"
    //       y="30"
    //       dy="1em"
    //       fontFamily="OpenSans"
    //       fontWeight="900"
    //       fontSize="80px"
    //       fill="#1cb4b0"
    //     />
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
