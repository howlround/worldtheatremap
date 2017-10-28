import React from 'react';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/profiles/methods.js';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class RelatedProfileTextbox extends React.Component {
  constructor(props) {
    super(props);
    const { parentValue, results } = this.props;
    const { locale } = this.props.intl;

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
          source: locale,
        }, displayError);

        return newID;
      }
    }, 300);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.selectProfile = this.selectProfile.bind(this);
    this.createProfile = this.createProfile.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { parentValue, attrs } = this.props;
    // If the parent form was submitted clear this field
    if (!_.isEmpty(prevProps.attrs.value) && _.isEmpty(attrs.value)) {
      this.setState({
        profile: {
          name: '',
        },
        results: {},
      });
    }
    // If the parent value updates make sure to update fields
    else if (_.has(parentValue, 'name') && _.has(parentValue, '_id') && this.state.profile._id !== parentValue._id) {
      this.setState({
        profile: {
          name: parentValue.name,
          _id: parentValue._id,
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

  onFocus() {
    this.setState({ focus: true });
  }

  createProfile(name) {
    // Build a new profile object
    const newProfile = {
      name,
    };
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
      _id: profile._id,
    });
  }

  render() {
    const { attrs, results, wrapperAttrs, disabled, loading, addNew } = this.props;
    const { profile, focus } = this.state;

    const resultsItems = (results.length > 0) ? results.map(itemProfile => {
      const itemContextSeperator = itemProfile.locality ? ' – ' : '';
      return (
        <li
          key={itemProfile._id}
          className="select-profile"
          onClick={this.selectProfile.bind(this, itemProfile)}
        >
          {itemProfile.name}
          <span className="autocomplete-item-context">
            {itemContextSeperator}
            {itemProfile.locality}
          </span>
        </li>
      );
    }) : '';


    const addProfileOption = (profile.name.length > 0 && addNew !== false) ?
      <li className="create-profile" onClick={this.createProfile.bind(this, profile.name)}>
        <FormattedMessage
          id="profile.autocompleteCreate"
          description="Autocomplete option to create a related profile"
          defaultMessage={'Add Profile for {name}?'}
          values={{ name: <b>{profile.name}</b> }}
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
    const labelClasses = classnames({ disabled });

    return (
      <div className={wrapperClasses}>
        {attrs.label ? <label className={labelClasses}>{attrs.label}</label> : ''}
        <input
          {...attrs}
          onFocus={this.onFocus}
          type="text"
          value={profile.name}
          onChange={this.onChange}
          disabled={disabled}
        />
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
  intl: intlShape.isRequired,
};

RelatedProfileTextbox.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(RelatedProfileTextbox);
