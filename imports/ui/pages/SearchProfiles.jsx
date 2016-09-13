import React from 'react';
import { Link } from 'react-router';
import ReactSelect from 'react-select';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';

// API
import { Profiles, profileFiltersSchema, filtersFormOptions } from '../../api/profiles/profiles.js';
import { Localities, factory as localitiesFactory } from '../../api/localities/localities.js';
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

export default class SearchProfiles extends React.Component {
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
    this.setState(this.props.location.query);

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
      <SearchProfilesResultsContainer query={cleanQuery} />
    );
  }

  onChange(value) {
    this.setState(value);
    this.context.router.push({
      pathname: '/search/profiles',
      query: value
    });
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <Loading key="loading"/>
      );
    }
    else {
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
};
