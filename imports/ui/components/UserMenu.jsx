import React from 'react';
import { Link } from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      forceCloseDropDown: this.props.forceCloseDropDown,
    };
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    if (!this.state.open) {
      this.props.hideDropDown('AddMenu', true);
    }

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

  componentWillReceiveProps() {
    if (this.props.forceCloseDropDown.UserMenu) {
      this.setState({
        open: false,
      });

      this.props.hideDropDown('UserMenu', false);
    }
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
  hideDropDown: React.PropTypes.func,
  forceCloseDropDown: React.PropTypes.object,
};
