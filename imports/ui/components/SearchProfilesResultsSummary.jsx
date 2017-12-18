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
import {
  get,
  includes,
  isEmpty,
  isNil,
} from 'lodash';
import sanitizeHtml from 'sanitize-html';

// Components
import AdministrativeAreas from '../components/AdministrativeAreas.jsx';
import Countries from '../components/Countries.jsx';
import Genders from '../components/Genders.jsx';
import Interests from '../components/Interests.jsx';
import Localities from '../components/Localities.jsx';
import OrgTypes from '../components/OrgTypes.jsx';
import SelfDefinedRoles from '../components/SelfDefinedRoles.jsx';

class SearchProfilesResultsSummary extends React.Component {
  render() {
    const { query, count } = this.props;
    const { formatMessage, locale, messages } = this.props.intl;

    const pluralTypes = defineMessages({
      profile: {
        id: 'plural.profile',
        defaultMessage: '{count, plural, one {Profile} other {Profiles}}',
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

    let type = formatMessage(pluralTypes.profile, { count });
    const prefixModifiersArray = [];
    const suffixModifiersArray = [];
    const listVersion = [];

    if (isEmpty(query)) {
      return null;
    }

    // Change type value for festivals
    if (includes(get(query, 'profileType'), 'Festival')) {
      type = formatMessage(pluralTypes.festival, { count });
    }

    // Prefixes
    if (!isNil(query.gender)) {
      const genderReact = (
        <IntlProvider locale={locale} messages={messages}>
          <Genders
            genders={query.gender}
            conjunction="or"
          />
        </IntlProvider>
      );

      const genderMarkup = markup(genderReact);

      if (locale === 'en') {
        prefixModifiersArray.push(sanitizeHtml(genderMarkup));
      } else {
        const genderLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.genderLabel"
              description="Label for the Gender form field"
              defaultMessage="Gender"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(genderLabel)}: ${genderMarkup}`));
      }
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

      const orgTypesMarkup = markup(orgTypesReact);

      if (locale === 'en') {
        prefixModifiersArray.push(sanitizeHtml(orgTypesMarkup));

        // Overwrite type
        type = formatMessage(pluralTypes.organization, { count });
      } else {
        const orgTypesLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.orgTypesLabel"
              description="Label for an Organization Type form field"
              defaultMessage="What kind of organization is this?"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(orgTypesLabel)} ${orgTypesMarkup}`));
      }
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

    if (!isNil(query.selfDefinedRoles)) {
      const rolesReact = (
        <IntlProvider locale={locale} messages={messages}>
          <SelfDefinedRoles
            roles={query.selfDefinedRoles}
            conjunction="or"
          />
        </IntlProvider>
      );

      const rolesMarkup = markup(rolesReact);

      if (locale === 'en') {
        suffixModifiersArray.push(sanitizeHtml(`with the role ${rolesMarkup}`));
      } else {
        const rolesLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.rolesLabel"
              description="Label for the Roles form field"
              defaultMessage="What does this person do in the theatre?"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(rolesLabel)} ${rolesMarkup}`));
      }
    }

    if (!isNil(query.name)) {
      if (locale === 'en') {
        suffixModifiersArray.push(`named ${sanitizeHtml(query.name)}`);
      } else {
        const profileNameLabel = (
          <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage
              id="forms.profileNameLabel"
              description="Label for a Profile name form field"
              defaultMessage="Profile name"
            />
          </IntlProvider>
        );
        listVersion.push(sanitizeHtml(`${markup(profileNameLabel)}: ${query.name}`));
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
        suffixModifiersArray.push(`in ${sanitizeHtml(countriesMarkup)}`);
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
    const summary = `${count} ${modifiers}`;

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
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfilesResultsSummary);
