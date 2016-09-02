import React from 'react';
import { Link } from 'react-router';
import ReactSelect from 'react-select';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';

import { Profiles, profileFiltersSchema, filtersFormOptions } from '../../api/profiles/profiles.js';
import { Localities } from '../../api/localities/localities.js';

import Profile from '../components/Profile.jsx';
import ProfileSearchResult from '../components/ProfileSearchResult.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

const Form = t.form.Form;

export default class SearchProfiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

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

    // @TODO: Use a function passed down on the container instead.
    // Right now if a profile is deleted it doesn't get remove
    // from the list
    const profiles = (!_.isEmpty(cleanQuery)) ? Profiles.find(cleanQuery).fetch() : {};

    // @TODO: This should be a component that takes the results of Profiles.find().fetch()
    return (
      _.map(profiles, profile => (
        <li key={profile._id}>
          <ProfileSearchResult profile={profile} />
        </li>
      ))
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
    // const { profile, profileExists, loading } = this.props;
    const { loading } = this.props;

    if (loading) {
      return (
        <Loading key="loading"/>
      );
    }
    else {
      // locality options
      const ExistingLocalities = Localities.find().fetch();

      // locality template
      const existingLocalitiesTags = t.form.Form.templates.select.clone({
        renderSelect: (locals) => {
          function onChange(options) {
            const values = (options || []).map(({value}) => value)
            locals.onChange(values)
          }
          return <ReactSelect multi autoBlur options={ExistingLocalities} value={locals.value} onChange={onChange} className="profile-locality-select-edit" />
        }
      });

      // locality factory function
      class ReactSelectExistingLocalitiesFactory extends t.form.Component {
        getTemplate() {
          return existingLocalitiesTags;
        }
      }

      // selfDefinedRoles transformer
      ReactSelectExistingLocalitiesFactory.transformer = t.form.List.transformer;

      let formOptions = filtersFormOptions();
      formOptions.fields.locality.factory = ReactSelectExistingLocalitiesFactory;

      // @TODO: Refactor search type <ul> to be a component
      return (
        <div className="search page">
          <section>
            <ul className="search-type">
              {/*<li><Link to="/search/shows" activeClassName="active">Shows</Link></li>*/}
              <li><Link to="/search/profiles" activeClassName="active">Profiles</Link></li>
            </ul>
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
              <ul className="search-results">
                { this.renderProfiles() }
              </ul>
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
