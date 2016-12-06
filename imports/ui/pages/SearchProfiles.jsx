import React from 'react';
import ReactSelect from 'react-select';
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
    const query = this.state;

    const cleanQuery = {};
    _.each(query, (val, key) => {
      if (!_.isEmpty(val)) {
        cleanQuery[key] = val;
      }
    });

    return (
      <SearchProfilesResultsContainer query={cleanQuery}  updateQuery={this.onChange} />
    );
  }

  onChange(value) {
    const { locale } = this.props.intl;
    // @TODO: Maybe pass this down in SearchProfilesResultsContainer to page faster
    this.setState(value);
    this.context.router.push({
      pathname: `/${locale}/search/profiles`,
      query: value
    });
  }

  render() {
    const { loading, dummyForm } = this.props;
    const { formatMessage } = this.props.intl;

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
      formOptions.fields.country.factory = existingCountriesFactory();
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
