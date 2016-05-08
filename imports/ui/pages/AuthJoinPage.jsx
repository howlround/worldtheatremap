import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import AuthJoin from '../components/AuthJoin.jsx';

export default class AuthJoinPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page auth">
        <AuthJoin/>
      </div>
    );
  }
}

AuthJoinPage.contextTypes = {
  router: React.PropTypes.object,
};
