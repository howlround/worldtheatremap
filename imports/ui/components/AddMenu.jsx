import React from 'react';
import { Link } from 'react-router';

export default class AddMenu extends React.Component {
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
    const { open } = this.state;
    return (
      <div className="add-menu menu-container menu-right" onMouseEnter={this.open} onMouseLeave={this.close}>
        <a href="#" className="add menu-parent" onClick={this.toggle}>
          + Add
        </a>
        { open ?
          <div className="add-options menu-children">
            <Link to="/profiles/add" className="add-profile" onClick={this.close}>Add Person / Organization</Link>
            <Link to="/shows/add" className="add-show" onClick={this.close}>Add Show</Link>
            <Link to="/events/add" className="add-event" onClick={this.close}>Add Event</Link>
          </div> : ''
        }
      </div>
    );
  }
}

AddMenu.propTypes = {
  hideDropDown: React.PropTypes.func,
  forceCloseDropDown: React.PropTypes.object,
};
