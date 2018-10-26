import React from 'react';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Helmet from 'react-helmet';

// API
import { existingCountriesFactory } from '../../api/countries/countries.js';
import { factory as administrativeAreasFactory } from '../../api/administrativeAreas/administrativeAreas.js';
import { factory as localitiesFactory } from '../../api/localities/localities.js';
import { interestsSelectFactory } from '../../api/interests/interests.js';
import { showFiltersSchema, filtersFormOptions } from '../../api/shows/shows.js';

// Containers
import SearchShowsResultsContainer from '../containers/SearchShowsResultsContainer.jsx';

// Components
import SearchTypeNav from '../components/SearchTypeNav.jsx';
import Loading from '../components/Loading.jsx';

const Form = t.form.Form;

class SearchShows extends React.Component {
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

      this.setState({ query: cleanQuery});
    }
  }

  updateQuery(value) {
    const { locale } = this.props.intl;

    this.setState({ query: value });
    this.context.router.push({
      pathname: `/${locale}/search/shows`,
      query: value,
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
      pathname: `/${locale}/search/shows`,
      query: value,
    });
  }

  renderShows() {
    const { locale } = this.props.intl;
    const { query, resultsDisplay } = this.state;

    const cleanQuery = {};
    _.each(query, (val, key) => {
      if (!_.isEmpty(val)) {
        cleanQuery[key] = val;
      }
    });

    return (
      <SearchShowsResultsContainer
        query={cleanQuery}
        updateQuery={this.updateQuery}
        updateResultsDisplay={this.updateResultsDisplay}
        resultsDisplay={resultsDisplay}
        locale={locale}
      />
    );
  }

  render() {
    // const { show, showExists, loading } = this.props;
    const { loading } = this.props;
    const { formatMessage, locale } = this.props.intl;
    const { query } = this.state;

    if (loading) {
      // Tell Prerender.io that we're not ready
      window.prerenderReady = false;

      return (
        <Loading key="loading" />
      );
    } else {
      let formOptions = filtersFormOptions();
      // Shows
      formOptions.fields.country.factory = existingCountriesFactory(locale);
      formOptions.fields.interests.factory = interestsSelectFactory(locale, true);

      const messages = defineMessages({
        placeholder: {
          'id': 'searchShows.placeholder',
          'defaultMessage': 'Search for shows by name',
          'description': 'Placeholder text for the show name field on search filters'
        },
        siteName: {
          'id': 'navigation.siteName',
          'defaultMessage': 'World Theatre Map',
          'description': 'Site name',
        },
      });
      formOptions.fields.name.attrs.placeholder = formatMessage(messages.placeholder);

      // Events
      formOptions.fields.locality.factory = localitiesFactory();
      formOptions.fields.eventsCountry.factory = existingCountriesFactory(locale);
      formOptions.fields.administrativeArea.factory = administrativeAreasFactory();

      const siteName = formatMessage(messages.siteName);

      // @TODO: Refactor filters form to be a component?
      return (
        <div className="search page">
          <section>
            <SearchTypeNav />
            <div className="search-type-content">
              <div className="search-filters">
                <Helmet title="Search Shows" titleTemplate={`%s | ${siteName}`} />
                <form className="show-filters-form">
                  <Form
                    ref="form"
                    type={showFiltersSchema}
                    options={formOptions}
                    onChange={this.onChange}
                    value={query}
                  />
                </form>
              </div>
              {this.renderShows()}
            </div>
          </section>
        </div>
      );
    }
  }
}

SearchShows.contextTypes = {
  router: React.PropTypes.object,
};

SearchShows.propTypes = {
  loading: React.PropTypes.bool,
  location: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchShows);
