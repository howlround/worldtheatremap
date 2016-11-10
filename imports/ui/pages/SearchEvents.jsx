import React from 'react';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

// API
import { eventFiltersSchema, filtersFormOptions } from '../../api/events/forms.js';
import { factory as localitiesFactory } from '../../api/localities/localities.js';
import { existingCountriesFactory } from '../../api/countries/countries.js';
import { factory as administrativeAreasFactory } from '../../api/administrativeAreas/administrativeAreas.js';

// Containers
import SearchEventsResultsContainer from '../containers/SearchEventsResultsContainer.jsx';

// Components
import SearchTypeNav from '../components/SearchTypeNav.jsx';
import Loading from '../components/Loading.jsx';

const Form = t.form.Form;

export default class SearchEvents extends React.Component {
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

  onChange(value) {
    this.setState(value);
    this.context.router.push({
      pathname: '/search/events',
      query: value,
    });
  }

  renderEvents() {
    const query = this.state;

    const cleanQuery = {};
    _.each(query, (val, key) => {
      if (!_.isEmpty(val)) {
        cleanQuery[key] = val;
      }
    });

    return (
      <SearchEventsResultsContainer query={cleanQuery} updateQuery={this.onChange} />
    );
  }

  render() {
    // const { event, eventExists, loading } = this.props;
    const { loading } = this.props;

    if (loading) {
      return (
        <Loading key="loading" />
      );
    } else {
      let formOptions = filtersFormOptions();
      formOptions.fields.locality.factory = localitiesFactory();
      formOptions.fields.country.factory = existingCountriesFactory();
      formOptions.fields.administrativeArea.factory = administrativeAreasFactory();

      // @TODO: Refactor filters form to be a component?
      return (
        <div className="search page">
          <section>
            <SearchTypeNav />
            <div className="search-type-content">
              <div className="search-filters">
                <Helmet title="Search Events" />
                <h3>
                  <FormattedMessage
                    id="search.filterByHeader"
                    description="Header for search filters"
                    defaultMessage="Filter by"
                  />
                </h3>
                <form className="event-filters-form">
                  <Form
                    ref="form"
                    type={eventFiltersSchema}
                    options={formOptions}
                    onChange={this.onChange}
                    value={this.state}
                  />
                </form>
              </div>
              {this.renderEvents()}
            </div>
          </section>
        </div>
      );
    }
  }
}

SearchEvents.contextTypes = {
  router: React.PropTypes.object,
};

SearchEvents.propTypes = {
  loading: React.PropTypes.bool,
  location: React.PropTypes.object,
};
