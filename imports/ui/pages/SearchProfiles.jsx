import React from 'react';
import Profile from '../components/Profile.jsx';
import { Profiles, profileFiltersSchema, defaultFormOptions } from '../../api/profiles/profiles.js';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';

const Form = t.form.Form;

export default class SearchProfiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.location.query;

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

    const profiles = (!_.isEmpty(cleanQuery)) ? Profiles.find(cleanQuery).fetch() : {};

    // @TODO: This should be a component that takes the results of Profiles.find().fetch()
    return (
      _.map(profiles, profile => (
        <li key={profile._id}>
          <Link
            to={`/profiles/${ profile._id }`}
            title={profile.name}
            className="profile-view"
            activeClassName="active"
          >
            {profile.name}
          </Link>
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
      const formOptions = defaultFormOptions();
      // @TODO: Refactor search type <ul> to be a component
      return (
        <div className="search page">
          <section>
            <ul className="search-type">
              <li><Link to="/search/shows" activeClassName="active">Shows</Link></li>
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
