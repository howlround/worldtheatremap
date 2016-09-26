import React from 'react';
import { displayError } from '../helpers/errors.js';
import { Shows } from '../../api/shows/shows.js';
import { insert } from '../../api/shows/methods.js';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';
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

  componentWillReceiveProps() {
    const { parentValue } = this.props;

    this.setState({ show: {
      name: parentValue.name,
      _id: parentValue._id,
    } });
  }

  onChange(value) {
    const { updateParent } = this.props;

    const search = value.target.value;
    updateParent({
      name: search,
    });
    this.setState({ show: { name: search } });
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
    this.setState({ show: newShow, showAuthorField: true });
  }

  selectShow(show) {
    const { updateParent } = this.props;

    // We are using 'id' without the underscore later so
    // manually specify that
    // @TODO: Refactor to only use the _id
    const newShow = show;
    newShow._id = show._id;

    const newState = this.state;
    newState.show.name = newShow.name;
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
    const { attrs, results, updateParent, disabled, loading } = this.props;
    const { show, showAuthorField, focus } = this.state;

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

    const className = {
      'show-fields-group': true,
      'autocomplete-group': true,
      loading,
    }

    return (
      <div className={classnames(className)}>
        <input { ...attrs } value={ show.name } onChange={ this.onChange } onFocus={ this.onFocus } disabled={disabled} />
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
  results: React.PropTypes.array,
  updateParent: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

RelatedShowTextbox.contextTypes = {
  router: React.PropTypes.object,
};
