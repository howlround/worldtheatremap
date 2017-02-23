import React from 'react';
import { displayError } from '../helpers/errors.js';
import { insert } from '../../api/profiles/methods.js';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class DuplicateProfileTextbox extends React.Component {
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

    // this.throttledAddProfile = _.throttle(newProfile => {
    //   if (newProfile) {
    //     const newID = insert.call({
    //       newProfile,
    //     }, displayError);

    //     return newID;
    //   }
    // }, 300);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.selectProfile = this.selectProfile.bind(this);
    // this.createProfile = this.createProfile.bind(this);
  }

  componentDidUpdate(prevProps) {
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

  onFocus() {
    this.setState({ focus: true });
  }

  selectProfile(profile) {
    const { locale } = this.props.intl;

    this.context.router.push(`/${locale}/profiles/${profile._id}/edit`);
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

    // ¿Desea editar uno de estos perfiles ya existentes?
    const autocompleteHelp = (profile.name.length > 0 && addNew !== false) ?
      <li className="autocomplete-results-help">
        <FormattedMessage
          id="profile.autocompleteDuplicate"
          description="Autocomplete option to avoid duplicate profile creation"
          defaultMessage="Would you like to edit one of these existing profiles instead?"
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
        {focus ? <ul className="autocomplete-results">{autocompleteHelp}{resultsItems}</ul> : ''}

      </div>
    );
  }
}

DuplicateProfileTextbox.propTypes = {
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

DuplicateProfileTextbox.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(DuplicateProfileTextbox);
