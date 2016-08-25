import React from 'react';
import { displayError } from '../helpers/errors.js';
import { Shows } from '../../api/shows/shows.js';
import { insert } from '../../api/shows/methods.js';
import { _ } from 'meteor/underscore';

export default class RelatedShowTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: {
        name: '',
      },
      results: {},
    };

    this.throttledAddShow = _.throttle(newShow => {
      if (newShow) {
        const newID = insert.call({
          newShow,
        }, displayError);

        return newID;
      }
    }, 300);

    this.onChange = this.onChange.bind(this);
    this.selectShow = this.selectShow.bind(this);
    this.createShow = this.createShow.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // If the parent form was submitted clear this field
    if (!_.isEmpty(prevProps.attrs.value) && _.isEmpty(this.props.attrs.value)) {
      this.setState({
        show: {
          name: '',
        },
        results: {},
      });
    }
  }

  onChange(value) {
    const { updateParent } = this.props;

    const newState = this.state;
    newState.show.name = value.target.value;
    this.setState(newState);

    const search = value.target.value;

    if (search.length > 0) {
      const regex = new RegExp('.*' + search + '.*', 'i');
      const results = Shows.find({name: { $regex: regex }}, {limit: 5, fields: Shows.publicFields,}).fetch();

      const newState = this.state;
      newState.results = results;
      this.setState(newState);
    }
    else {
      const newState = this.state;
      newState.results = {};
      this.setState(newState);
    }
  }

  createShow(name) {
    // Save show to DB
    const newShowId = this.throttledAddShow(newShow);

    if (newShowId) {
      const newShow = Shows.findOne({_id: newShowId}, {fields: Shows.publicFields,}).fetch();
      console.log(newShow);

      // Update the parent form
      this.selectShow(newShow);
    }
  }

  selectShow(show) {
    const { updateParent } = this.props;

    // We are using 'id' without the underscore later so
    // manually specify that
    // @TODO: Refactor to only use the _id
    const newShow = show;
    newShow.id = show._id;

    const newState = this.state;
    newState.show.name = newShow.name;
    newState.results = {};
    this.setState(newState);

    updateParent(newShow);
  }

  render() {
    const { attrs, updateParent } = this.props;
    const { show, results } = this.state;

    const resultsItems = (results.length > 0) ? results.map(show => {
      // const selectShowClick = this.selectShow.bind(this, show._id);
      return (
        <li key={ show._id } onClick={ this.selectShow.bind(this, show) }>{ show.name }</li>
      );
    }) : '';

    const addShowOption = (show.name.length > 0 && results.length == 0) ? <li onClick={ this.createShow.bind(this, show.name) }>Add Show for <b>{ show.name }</b>?</li> : '';

    return (
      <div className="show-fields-group autocomplete-group">
        <input { ...attrs } value={ show.name } onChange={ this.onChange } />
        <ul className="autocomplete-results">{ resultsItems }{ addShowOption }</ul>
      </div>
    );
  }
}

RelatedShowTextbox.propTypes = {
  attrs: React.PropTypes.object,
  updateParent: React.PropTypes.func,
};

RelatedShowTextbox.contextTypes = {
  router: React.PropTypes.object,
};
