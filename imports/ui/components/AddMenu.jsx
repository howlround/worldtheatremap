import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class AddMenu extends React.Component {
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
      this.props.hideDropDown('UserMenu', true);
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

  componentWillReceiveProps() {
    if (this.props.forceCloseDropDown.AddMenu) {
      this.setState({
        open: false,
      });

      this.props.hideDropDown('AddMenu', false);
    }
  }

  render() {
    const { locale } = this.props.intl;
    const { open } = this.state;
    return (
      <div className="add-menu menu-container menu-right" onMouseEnter={this.open} onMouseLeave={this.close}>
        <a href="#" className="add menu-parent" onClick={this.toggle}>
          <FormattedMessage
            id="navigation.addMenu"
            description="Parent navigation item for Add menu"
            defaultMessage="+ Add"
          />
        </a>
        { open ?
          <div className="add-options menu-children">
            <Link
              to={{
                pathname: `/${locale}/profiles/add`,
                query: {
                  '_escaped_fragment_': '',
                },
              }}
              className="add-profile"
              onClick={this.close}
            >
              <FormattedMessage
                id="navigation.addProfile"
                description="Add menu item for a Profile"
                defaultMessage="Add Person / Organization / Festival"
              />
            </Link>
            <Link to={`/${locale}/events/add`} className="add-event" onClick={this.close}>
              <FormattedMessage
                id="navigation.addEvent"
                description="Add menu item for an Event"
                defaultMessage="Add Show Event"
              />
            </Link>
          </div> : ''
        }
      </div>
    );
  }
}

AddMenu.propTypes = {
  hideDropDown: React.PropTypes.func,
  forceCloseDropDown: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(AddMenu);
