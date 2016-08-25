import React from 'react';
import { displayError } from '../helpers/errors.js';
import { Shows } from '../../api/shows/shows.js';
import { insert } from '../../api/shows/methods.js';
import { _ } from 'meteor/underscore';
import RelatedProfile from '../../ui/components/RelatedProfile.jsx';

export default class RelatedShowTextbox extends React.Component {
  constructor(props) {
    super(props);
    const { parentValue } = this.props;
    const defaultName = (parentValue.name) ? parentValue.name : '';

    this.state = {
      show: {
        name: defaultName,
      },
      results: {},
      showAuthorField: false,
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
    this.setProfileForNewShow = this.setProfileForNewShow.bind(this);
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

  createShow(newShow) {
    // Save show to DB
    const newShowId = this.throttledAddShow(newShow);

    if (newShowId) {
      const newShow = Shows.findOne(newShowId);

      // Update the parent form
      this.selectShow(newShow);
    }
  }

  selectNewShow(name) {
    // User indicated they are creating a new show
    const newShow = {
      name
    }
    this.setState({ show: newShow, results: {}, showAuthorField: true });
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

  setProfileForNewShow(newProfile) {
    const { show } = this.state;
    const newShow = show;
    newShow.author = [ newProfile ];

    this.createShow(newShow);
  }

  render() {
    const { attrs, updateParent } = this.props;
    const { show, results, showAuthorField } = this.state;

    const resultsItems = (results.length > 0) ? results.map(show => {
      // const selectShowClick = this.selectShow.bind(this, show._id);
      return (
        <li key={ show._id } onClick={ this.selectShow.bind(this, show) }>{ show.name }</li>
      );
    }) : '';

    const addShowOption = (show.name.length > 0 && results.length == 0) ? <li onClick={ this.selectNewShow.bind(this, show.name) }>Add Show for <b>{ show.name }</b>?</li> : '';

    return (
      <div className="show-fields-group autocomplete-group">
        <input { ...attrs } value={ show.name } onChange={ this.onChange } />
        <ul className="autocomplete-results">{ resultsItems }{ addShowOption }</ul>
        { showAuthorField ? <RelatedProfile updateParent={ this.setProfileForNewShow } attrs={ { className: 'show-author-name-edit', label: 'Primary Author (required)' } } wrapperAttrs={ { className: 'nested-subfield' } } /> : '' }
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
