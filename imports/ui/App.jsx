import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import { Profiles } from '../api/profiles.js';

import Profile from './Profile.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   hideCompleted: false,
    // };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('profiles.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <li><Link to="/about">About</Link></li>

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

        <div className="content">
          {this.props.children}
        </div>
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
