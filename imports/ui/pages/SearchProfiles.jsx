import React from 'react';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Helmet from 'react-helmet';

// API
import { profileFiltersSchema, filtersFormOptions } from '../../api/profiles/profiles.js';
import { factory as localitiesFactory } from '../../api/localities/localities.js';
import { existingCountriesFactory } from '../../api/countries/countries.js';
import { interestsSelectFactory } from '../../api/interests/interests.js';
import {
  factory as administrativeAreasFactory,
} from '../../api/administrativeAreas/administrativeAreas.js';

// Containers
import SearchProfilesResultsContainer from '../containers/SearchProfilesResultsContainer.jsx';

// Components
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

      this.state = {
        query: cleanQuery,
      };
    } else {
      this.state = {};
    }


    this.onChange = this.onChange.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
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

      this.setState({ query: cleanQuery });
    }
  }

  onChange(value) {
    const { locale } = this.props.intl;
    const changeValue = value;
    // @TODO: Maybe pass this down in SearchProfilesResultsContainer to page faster

    // This function should always reset the pager because something changed
    delete changeValue.page;

    this.setState({ query: changeValue });
    this.context.router.push({
      pathname: `/${locale}/search/profiles`,
      query: changeValue,
    });
  }

  updateQuery(value) {
    // Similar to onChange except it's coming from the pager so it shouldn't reset the pager value
    const { locale } = this.props.intl;

    this.setState({ query: value });
    this.context.router.push({
      pathname: `/${locale}/search/profiles`,
      query: value,
    });
  }

  renderProfiles() {
    const { locale } = this.props.intl;
    const { query } = this.state;

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
        locale={locale}
      />
    );
  }

  render() {
    const { loading, dummyForm } = this.props;
    const { formatMessage, locale } = this.props.intl;
    const { query } = this.state;
    let output = '';

    if (loading) {
      // Don't display loading screen if using the form away from the directory page
      if (dummyForm) {
        output = '';
      } else {
        // Tell Prerender.io that we're not ready
        window.prerenderReady = false;

        output = <Loading key="loading" />;
      }
    } else {
      let formOptions = filtersFormOptions();
      formOptions.fields.locality.factory = localitiesFactory();
      formOptions.fields.country.factory = existingCountriesFactory(locale);
      formOptions.fields.interests.factory = interestsSelectFactory(locale, true);
      formOptions.fields.administrativeArea.factory = administrativeAreasFactory();

      const messages = defineMessages({
        placeholder: {
          id: 'searchProfiles.placeholder',
          defaultMessage: 'Search for profiles by name',
          description: 'Placeholder text for the profile name field on search filters',
        },
        pageTitle: {
          id: 'searchProfiles.pageTitle',
          defaultMessage: 'Search Profiles',
          description: 'Page title for the profiles search page',
        },
      });

      formOptions.fields.name.attrs.placeholder = formatMessage(messages.placeholder);

      const searchProfilesPageTitle = formatMessage(messages.pageTitle);

      output = (
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
                    value={query}
                  />
                </form>
              </div>
              {this.renderProfiles()}
            </div>
          </section>
        </div>
      );
    }

    return output;
  }
}

SearchProfiles.contextTypes = {
  router: React.PropTypes.object,
};

SearchProfiles.propTypes = {
  loading: React.PropTypes.bool,
  dummyForm: React.PropTypes.bool,
  location: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchProfiles);
