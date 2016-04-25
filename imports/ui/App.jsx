import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Profiles } from '../api/profiles.js';

import Profile from './Profile.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('profiles.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderProfiles() {
    let filteredProfiles = this.props.profiles;
    if (this.state.hideCompleted) {
      filteredProfiles = filteredProfiles.filter(profile => !profile.checked);
    }
    return filteredProfiles.map((profile) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = profile.owner === currentUserId;

      return (
        <Profile
          key={profile._id}
          profile={profile}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="profile-name">Irondale Center</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Profiles
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-profile" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new profiles"
              />
            </form> : ''

          }

        </header>

        <ul className="block">
          {this.renderProfiles()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  profiles: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer(() => {
  Meteor.subscribe('profiles');

  return {
    profiles: Profiles.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  }
}, App);
