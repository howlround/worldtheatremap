import React from 'react';
import { displayError } from '../helpers/errors.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { insert } from '../../api/profiles/methods.js';
import { _ } from 'meteor/underscore';
import classNames from 'classnames';

export default class RelatedProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        name: '',
      },
      results: {},
    };

    this.throttledAddProfile = _.throttle(newProfile => {
      if (newProfile) {
        const newID = insert.call({
          newProfile,
        }, displayError);

        return newID;
      }
    }, 300);

    this.onChange = this.onChange.bind(this);
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

    const newState = this.state;
    newState.profile.name = value.target.value;
    this.setState(newState);

    const search = value.target.value;
    // const resultsElement = $('.form-group-profile-name').siblings('ul.autocomplete-results');

    if (search.length > 0) {
      const regex = new RegExp('.*' + search + '.*', 'i');
      const results = Profiles.find({name: { $regex: regex }}, {limit: 5, fields: Profiles.publicFields,}).fetch();

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

  createProfile(name) {
    // Build a new profile object
    let newProfile = {
      name: name,
    }
    // Save profile to DB
    newProfile._id = this.throttledAddProfile(newProfile);

    // Update the parent form
    this.selectProfile(newProfile);
  }

  selectProfile(profile) {
    const { updateParent } = this.props;

    const newState = this.state;
    newState.profile.name = profile.name;
    newState.results = {};
    this.setState(newState);

    updateParent({
      name: profile.name,
      'id': profile._id
    });
  }

  render() {
    const { attrs, updateParent, wrapperAttrs } = this.props;
    const { profile, results } = this.state;

    const resultsItems = (results.length > 0) ? results.map(profile => {
      // const selectProfileClick = this.selectProfile.bind(this, profile._id);
      return (
        <li key={ profile._id } onClick={ this.selectProfile.bind(this, profile) }>{ profile.name }</li>
      );
    }) : '';

    const addProfileOption = (profile.name.length > 0 && results.length == 0) ? <li onClick={ this.createProfile.bind(this, profile.name) }>Add Profile for <b>{ profile.name }</b>?</li> : '';

    const wrapperClasses = classNames('profile-fields-group', 'autocomplete-group', wrapperAttrs.className);

    return (
      <div className={ wrapperClasses }>
        { attrs.label ? <label>{ attrs.label }</label> : '' }
        <input { ...attrs } type="text" value={ profile.name } onChange={ this.onChange } />
        <ul className="autocomplete-results">{ resultsItems }{ addProfileOption }</ul>
      </div>
    );
  }
}

RelatedProfile.propTypes = {
  attrs: React.PropTypes.object,
  updateParent: React.PropTypes.func,
};

RelatedProfile.contextTypes = {
  router: React.PropTypes.object,
};
