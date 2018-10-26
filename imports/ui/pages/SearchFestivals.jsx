import React from 'react';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Helmet from 'react-helmet';

// API
import { Profiles, profileFestivalsFiltersSchema, filtersFormOptions } from '../../api/profiles/profiles.js';
import { Localities, factory as localitiesFactory } from '../../api/localities/localities.js';
import { Countries, existingCountriesFactory } from '../../api/countries/countries.js';
import { AdministrativeAreas, factory as administrativeAreasFactory } from '../../api/administrativeAreas/administrativeAreas.js';
import { interestsSelectFactory } from '../../api/interests/interests.js';

// Containers
import SearchProfilesResultsContainer from '../containers/SearchProfilesResultsContainer.jsx';

// Components
import Profile from '../components/Profile.jsx';
import ProfileSearchResult from '../components/ProfileSearchResult.jsx';
import SearchTypeNav from '../components/SearchTypeNav.jsx';
import Loading from '../components/Loading.jsx';

const Form = t.form.Form;

class SearchFestivals extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location && this.props.location.query) {
      const cleanQuery = {};

      _.each(this.props.location.query, (val, key) => {
        // If next has a value, add it
        if (!_.isEmpty(val)) {
          cleanQuery[key] = val;
        }
      });

      // If next doesn't have a value but this.props does, add null
      _.each(this.props.location.query, (val, key) => {
        if (_.isEmpty(this.props.location.query[key]) && !_.isEmpty(val)) {
          cleanQuery[key] = null;
        }
      });

      // Always filter by festivals
      if (!_.isEmpty(cleanQuery)) {
        cleanQuery['profileType'] = [ 'Festival' ];
      }

      this.state = {
        query: cleanQuery,
        resultsDisplay: 'list',
      };
    } else {
      this.state = {
        resultsDisplay: 'list',
      };
    }

    this.onChange = this.onChange.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateResultsDisplay = this.updateResultsDisplay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query !== nextProps.location.query) {
      const cleanQuery = {};
      _.each(nextProps.location.query, (val, key) => {
        // If next has a value, add it
        if (!_.isEmpty(val)) {
          cleanQuery[key] = val;
        }
      });

      // If next doesn't have a value but this.props does, add null
      _.each(this.props.location.query, (val, key) => {
        if (_.isEmpty(nextProps.location.query[key]) && !_.isEmpty(val)) {
          cleanQuery[key] = null;
        }
      });

      // Always filter by festivals
      if (!_.isEmpty(cleanQuery)) {
        cleanQuery['profileType'] = [ 'Festival' ];
      }

      this.setState({ query: cleanQuery});
    }
  }

  renderProfiles() {
    const { locale } = this.props.intl;
    const { query, resultsDisplay } = this.state;

    const cleanQuery = {};
    _.each(query, (val, key) => {
      if (!_.isEmpty(val)) {
        cleanQuery[key] = val;
      }
    });

    return (
      <SearchProfilesResultsContainer
        query={cleanQuery}
        updateQuery={this.updateQuery}
        updateResultsDisplay={this.updateResultsDisplay}
        resultsDisplay={resultsDisplay}
        locale={locale}
      />
    );
  }

  updateQuery(value) {
    // Similar to onChange except it's coming from the pager so it shouldn't reset the pager value
    const { locale } = this.props.intl;

    this.setState({ query: value });
    this.context.router.push({
      pathname: `/${locale}/search/festivals`,
      query: value
    });
  }

  updateResultsDisplay(value) {
    this.setState({ resultsDisplay: value });
  }

  onChange(value) {
    const { locale } = this.props.intl;
    const changeValue = value;
    // @TODO: Maybe pass this down in SearchProfilesResultsContainer to page faster

    // This function should always reset the pager because something changed
    delete changeValue.page;

    this.setState({ query: changeValue });
    this.context.router.push({
      pathname: `/${locale}/search/festivals`,
      query: value
    });
  }

  render() {
    const { loading, dummyForm } = this.props;
    const { formatMessage, locale } = this.props.intl;
    const { query } = this.state;

    if (loading) {
      // Don't display loading screen if using the form away from the directory page
      if (dummyForm) {
        return (null);
      } else {
        return (<Loading key="loading" />);
      }
    } else {
      let formOptions = filtersFormOptions();
      formOptions.fields.locality.factory = localitiesFactory();
      formOptions.fields.country.factory = existingCountriesFactory(locale);
      formOptions.fields.administrativeArea.factory = administrativeAreasFactory();
      formOptions.fields.interests.factory = interestsSelectFactory(locale, true);

      const messages = defineMessages({
        placeholder: {
          'id': 'searchFestivals.placeholder',
          'defaultMessage': 'Search for festivals by name',
          'description': 'Placeholder text for the festival name field on search filters'
        },
        pageTitle: {
          'id': 'searchFestivals.pageTitle',
          'defaultMessage': 'Search Festivals',
          'description': 'Page title for the festivals search page',
        },
      });

      formOptions.fields.name.attrs.placeholder = formatMessage(messages.placeholder);

      const searchProfilesPageTitle = formatMessage(messages.pageTitle);

      return (
        <div className="search page">
          <section>
            <SearchTypeNav />
            <div className="search-type-content">
              <div className="search-filters">
                {!dummyForm ?
                  <Helmet title={searchProfilesPageTitle} />
                  : ''
                }
                <form className="profile-filters-form">
                  <Form
                    ref="form"
                    type={profileFestivalsFiltersSchema}
                    options={formOptions}
                    onChange={this.onChange}
                    value={query}
                  />
                </form>
              </div>
              { this.renderProfiles() }
            </div>
          </section>
        </div>
      );
    }
  }
}

SearchFestivals.contextTypes = {
  router: React.PropTypes.object,
};

SearchFestivals.propTypes = {
  loading: React.PropTypes.bool,
  dummyForm: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchFestivals);
