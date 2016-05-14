import React from 'react';
import { Link } from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  }

  close(e) {
    this.setState({
      open: false,
    });
  }

  renderLoggedIn() {
    const { open } = this.state;
    const { user, logout } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));

    return (
      <div className="user-menu menu-container menu-right">
        <a href="#" className="menu-parent" onClick={this.toggle}>
          {emailLocalPart}
        </a>
        { open ?
          <div className="menu-children">
            <a href="#" onClick={logout}>Logout</a>
          </div> : ''
        }
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div className="user-menu menu-container menu-right">
        <Link to="/signin" className="menu-parent" onClick={this.close}>Signup/In</Link>
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
