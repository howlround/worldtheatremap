import React from 'react';
import { displayError } from '../helpers/errors.js';
import { Shows } from '../../api/shows/shows.js';
import { insert } from '../../api/shows/methods.js';
import { _ } from 'meteor/underscore';
import RelatedProfile from '../../ui/components/RelatedProfile.jsx';
import Authors from '../../ui/components/Authors.jsx';
import { FormattedMessage } from 'react-intl';

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
      focus: false,
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
    this.onFocus = this.onFocus.bind(this);
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

  onFocus() {
    this.setState({ focus: true });
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
    this.setState({ focus: false });
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
    newState.focus = false;
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
    const { show, results, showAuthorField, focus } = this.state;

    let resultsItems = (results.length > 0) ? results.map(show => {
      return (
        <li className="select-show" key={ show._id } onClick={ this.selectShow.bind(this, show) }>{ show.name } – <span className="autocomplete-authors"><Authors authors={show.author} noLinks /></span></li>
      );
    }) : '';

    const addShowOption = (show.name.length > 0) ?
      <li className="select-new-show" onClick={ this.selectNewShow.bind(this, show.name) }>
        <FormattedMessage
          id="show.autocompleteCreate"
          description="Autocomplete option to create a related show"
          defaultMessage={`Add Show for {name}?`}
          values={{ name: <b>{ show.name }</b> }}
        />
      </li> : '';

    return (
      <div className="show-fields-group autocomplete-group">
        <input { ...attrs } value={ show.name } onChange={ this.onChange } onFocus={ this.onFocus } />
        { focus ? <ul className="autocomplete-results">{ resultsItems }{ addShowOption }</ul> : '' }
        { showAuthorField ?
          <RelatedProfile
            updateParent={ this.setProfileForNewShow }
            attrs={{
              className: 'show-author-name-edit',
              label: <FormattedMessage
                id="forms.labelRequiredOrOptional"
                description="Label for a form field with required or optional specified"
                defaultMessage="{labelText} {optionalOrRequired}"
                values={{
                  optionalOrRequired: <span className="field-label-modifier required"><FormattedMessage
                    id="forms.requiredLabel"
                    description="Addition to label indicating a field is required"
                    defaultMessage="(required)"
                  /></span>,
                  labelText: <FormattedMessage
                    id="forms.primaryAuthorLabel"
                    description="Label for a Primary author form field"
                    defaultMessage="Primary Author"
                  />,
                }}
              />,
            }}
            wrapperAttrs={{ className: 'nested-subfield' }}
          /> : '' }
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
