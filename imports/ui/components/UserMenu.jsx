import React from 'react';
import { Link } from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLoggedIn() {
    const { user, logout } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));

    return (
      <div className="user-menu menu-container menu-right">
        <a href="#" className="add menu-parent" >
          {emailLocalPart}
        </a>
        <div className="add-options menu-children">
          <a href="#" onClick={logout}>Logout</a>
        </div>
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div className="user-menu menu-container">
        <Link to="/signin">Signup/In</Link>
      </div>
    );
  }

  render() {
    return this.props.user
      ? this.renderLoggedIn()
      : this.renderLoggedOut();
  }
}

UserMenu.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
};
