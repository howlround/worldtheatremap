import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      forceCloseDropDown: this.props.forceCloseDropDown,
    };
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
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

  open(e) {
    this.setState({
      open: true,
    });
  }

  close(e) {
    e.stopPropagation();
    this.setState({
      open: false,
    });
  }

  renderLoggedIn() {
    const { open } = this.state;
    const { user, logout } = this.props;
    // const email = user.emails[0].address;
    // const emailLocalPart = email.substring(0, email.indexOf('@'));

    return (
      <div className="user-menu menu-container menu-right" onMouseEnter={this.open} onMouseLeave={this.close}>
        <a href="#" className="menu-parent logged-in" onClick={this.toggle}>
          {/*emailLocalPart*/}
        </a>
        { open ?
          <div className="menu-children">
            <a href="#" className="menu-logout" onClick={logout}>
              <FormattedMessage
                id='navigation.logout'
                description="Logout Text"
                defaultMessage="Logout"
              />
            </a>
          </div> : ''
        }
      </div>
    );
  }

  renderLoggedOut() {
    const { locale } = this.props.intl;

    return (
      <div className="user-menu menu-container menu-right">
        <Link to={`/${locale}/signin`} className="menu-parent" onClick={this.close}>
          <FormattedMessage
            id='navigation.signIn'
            description="Signup/In Text"
            defaultMessage="Signup/In"
          />
        </Link>
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
  intl: intlShape.isRequired,
};

export default injectIntl(UserMenu);
