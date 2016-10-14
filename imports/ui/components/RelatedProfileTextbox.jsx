import React from 'react';
import { displayError } from '../helpers/errors.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { insert } from '../../api/profiles/methods.js';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

export default class RelatedProfileTextbox extends React.Component {
  constructor(props) {
    super(props);
    const { parentValue, results } = this.props;

    this.state = {
      profile: {
        name: '',
      },
      results,
      focus: false,
    };

    if (parentValue) {
      if (parentValue.name) {
        this.state.profile.name = parentValue.name;
      }
      if (parentValue._id) {
        this.state.profile._id = parentValue._id;
      }
    }

    this.throttledAddProfile = _.throttle(newProfile => {
      if (newProfile) {
        const newID = insert.call({
          newProfile,
        }, displayError);

        return newID;
      }
    }, 300);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.selectProfile = this.selectProfile.bind(this);
    this.createProfile = this.createProfile.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // If the parent form was submitted clear this field
    if (!_.isEmpty(prevProps.attrs.value) && _.isEmpty(this.props.attrs.value)) {
      this.setState({
        profile: {
          name: '',
        },
        results: {},
      });
    }
  }

  onChange(value) {
    const { updateParent } = this.props;

    const search = value.target.value;
    updateParent({
      name: search,
    });
    this.setState({ profile: { name: search } });
  }

  createProfile(name) {
    // Build a new profile object
    let newProfile = {
      name: name,
    }
    // Save profile to DB
    newProfile._id = this.throttledAddProfile(newProfile);

    // Update the parent form
    this.selectProfile(newProfile);

    const newState = this.state;
    newState.profile = newProfile;
    newState.focus = false;
    this.setState(newState);
  }

  selectProfile(profile) {
    const { updateParent } = this.props;

    const newState = this.state;
    newState.profile.name = profile.name;
    newState.profile._id = profile._id;
    newState.focus = false;
    this.setState(newState);

    updateParent({
      name: profile.name,
      _id: profile._id
    });
  }

  onFocus() {
    this.setState({ focus: true });
  }

  render() {
    const { attrs, results, updateParent, wrapperAttrs, disabled, loading, addNew } = this.props;
    const { profile, focus } = this.state;

    const resultsItems = (results.length > 0) ? results.map(profile => {
      const itemContextSeperator = profile.locality ? ' – ' : '';
      return (
        <li key={ profile._id } className="select-profile" onClick={ this.selectProfile.bind(this, profile) }>{ profile.name } <span className="autocomplete-item-context">{ itemContextSeperator }{ profile.locality }</span></li>
      );
    }) : '';


    const addProfileOption = (profile.name.length > 0 && addNew !== false) ?
      <li className="create-profile" onClick={ this.createProfile.bind(this, profile.name) }>
        <FormattedMessage
          id="profile.autocompleteCreate"
          description="Autocomplete option to create a related profile"
          defaultMessage={`Add Profile for {name}?`}
          values={{ name: <b>{ profile.name }</b> }}
        />
      </li> : '';

    const additionalWrapperClasses = (wrapperAttrs) ? wrapperAttrs.className : '';
    const wrapperClasses = classnames(
      'profile-fields-group',
      'autocomplete-group',
      additionalWrapperClasses,
      {
        loading,
      },
    );
    const labelClasses = classnames({ 'disabled': disabled });

    return (
      <div className={wrapperClasses}>
        {attrs.label ? <label className={labelClasses}>{ attrs.label }</label> : ''}
        <input {...attrs} onFocus={this.onFocus} type="text" value={profile.name} onChange={this.onChange} disabled={disabled} />
        {focus ? <ul className="autocomplete-results">{resultsItems}{addProfileOption}</ul> : ''}

      </div>
    );
  }
}

RelatedProfileTextbox.propTypes = {
  parentValue: React.PropTypes.object,
  results: React.PropTypes.array,
  attrs: React.PropTypes.object,
  wrapperAttrs: React.PropTypes.object,
  updateParent: React.PropTypes.func,
  addNew: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  loading: React.PropTypes.bool,
};

RelatedProfileTextbox.contextTypes = {
  router: React.PropTypes.object,
};
