import React from 'react';
import { Link } from 'react-router';
import ReactSelect from 'react-select';
import { _ } from 'meteor/underscore';
import t from 'tcomb-form';

import { Events, eventFiltersSchema, filtersFormOptions } from '../../api/events/events.js';
import { Localities } from '../../api/localities/localities.js';

import Event from '../components/Event.jsx';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';
import SearchTypeNav from '../components/SearchTypeNav.jsx';
import Loading from '../components/Loading.jsx';

const Form = t.form.Form;

export default class SearchEvents extends React.Component {
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

  renderEvents() {
    const query = this.state;

    const cleanQuery = {};
    _.each(query, (val, key) => {
      if (!_.isEmpty(val)) {
        cleanQuery[key] = val;
      }
    });

    // @TODO: Use a function passed down on the container instead.
    // Right now if a event is deleted it doesn't get remove
    // from the list
    const events = (!_.isEmpty(cleanQuery)) ? Events.find(cleanQuery).fetch() : {};

    // @TODO: This should be a component that takes the results of Events.find().fetch()
    return (
      _.map(events, event => (
        <li key={event._id}>
          <EventTeaserWithShow event={event} />
        </li>
      ))
    );
  }

  onChange(value) {
    this.setState(value);
    this.context.router.push({
      pathname: '/search/events',
      query: value
    });
  }

  render() {
    // const { event, eventExists, loading } = this.props;
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
          return <ReactSelect multi autoBlur options={ExistingLocalities} value={locals.value} onChange={onChange} className="event-locality-select-edit" />
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

      // @TODO: Refactor filters form to be a component?
      return (
        <div className="search page">
          <section>
            <SearchTypeNav />
            <div className="search-type-content">
              <div className="search-filters">
                <h3>Filter by</h3>
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
              <ul className="search-results">
                { this.renderEvents() }
              </ul>
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
};
