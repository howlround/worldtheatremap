import React from 'react';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Helmet from 'react-helmet';

// API
import { showFiltersSchema, filtersFormOptions } from '../../api/shows/shows.js';
import { allCountriesFactory } from '../../api/countries/countries.js';

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

      this.state = cleanQuery;
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

      this.setState(cleanQuery);
    }
  }

  updateQuery(value) {
    const { locale } = this.props.intl;

    this.setState(value);
    this.context.router.push({
      pathname: `/${locale}/search/shows`,
      query: value,
    });
  }

  onChange(value) {
    const { locale } = this.props.intl;

    // This function should always reset the pager because something changed
    delete value.page;

    this.setState(value);
    this.context.router.push({
      pathname: `/${locale}/search/shows`,
      query: value,
    });
  }

  renderShows() {
    const query = this.state;

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
      />
    );
  }

  render() {
    // const { show, showExists, loading } = this.props;
    const { loading } = this.props;
    const { formatMessage, locale } = this.props.intl;

    if (loading) {
      return (
        <Loading key="loading" />
      );
    } else {
      let formOptions = filtersFormOptions();
      formOptions.fields.country.factory = allCountriesFactory(locale, true);

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
                    value={this.state}
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
