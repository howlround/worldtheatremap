import React from 'react';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { intlShape, injectIntl } from 'react-intl';
import Helmet from 'react-helmet';

// API
import { Profiles, profileFiltersSchema, filtersFormOptions } from '../../api/profiles/profiles.js';
import { Localities, factory as localitiesFactory } from '../../api/localities/localities.js';
import { Ethnicities, factory as ethnicitiesFactory } from '../../api/ethnicities/ethnicities.js';
import { Countries, existingCountriesFactory } from '../../api/countries/countries.js';
import { AdministrativeAreas, factory as administrativeAreasFactory } from '../../api/administrativeAreas/administrativeAreas.js';

// Containers
import SearchProfilesResultsContainer from '../containers/SearchProfilesResultsContainer.jsx';

// Components
import Profile from '../components/Profile.jsx';
import ProfileSearchResult from '../components/ProfileSearchResult.jsx';
import SearchTypeNav from '../components/SearchTypeNav.jsx';
import Loading from '../components/Loading.jsx';

const Form = t.form.Form;

class SearchProfiles extends React.Component {
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

      // @TODO: Maybe deal with pager here too?
      // Only if a user would go directly to a path with only the pager set

      this.state = cleanQuery;
    } else {
      this.state = {};
    }


    this.onChange = this.onChange.bind(this);
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

      this.setState(cleanQuery);
    }
  }

  renderProfiles() {
    const { locale } = this.props.intl;
    const query = this.state;

    const cleanQuery = {};
    _.each(query, (val, key) => {
      if (!_.isEmpty(val)) {
        cleanQuery[key] = val;
      }
    });

    return (
      <SearchProfilesResultsContainer
        query={cleanQuery}
        updateQuery={this.onChange}
        locale={locale}
      />
    );
  }

  onChange(value) {
    const { locale } = this.props.intl;
    // @TODO: Maybe pass this down in SearchProfilesResultsContainer to page faster

    // Clear pager if it's the only value left
    const cleanValue = {};
    _.each(value, (val, key) => {
      if (!_.isEmpty(value[key]) || _.isNumber(value[key])) {
        cleanValue[key] = value[key];
      }
    });
    if (Object.keys(cleanValue).length === 1 && !_.isEmpty(cleanValue.page)) {
      delete cleanValue.page;
    }

    this.setState(cleanValue);
    this.context.router.push({
      pathname: `/${locale}/search/profiles`,
      query: cleanValue,
    });
  }

  render() {
    const { loading, dummyForm } = this.props;
    const { formatMessage, locale } = this.props.intl;

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
      formOptions.fields.ethnicityRace.factory = ethnicitiesFactory();
      formOptions.fields.country.factory = existingCountriesFactory(locale);
      formOptions.fields.administrativeArea.factory = administrativeAreasFactory();
      formOptions.fields.name.attrs.placeholder = formatMessage({
        'id': 'searchProfiles.placeholder',
        'defaultMessage': 'Search for profiles by name',
        'description': 'Placeholder text for the profile name field on search filters'
      });

      const searchProfilesPageTitle = formatMessage({
        'id': 'searchProfiles.pageTitle',
        'defaultMessage': 'Search Profiles',
        'description': 'Page title for the profiles search page',
      });

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
                    type={profileFiltersSchema}
                    options={formOptions}
                    onChange={this.onChange}
                    value={this.state}
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

SearchProfiles.contextTypes = {
  router: React.PropTypes.object,
};

SearchProfiles.propTypes = {
  loading: React.PropTypes.bool,
  dummyForm: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfiles);
