import React from 'react';
import { Link } from 'react-router';

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
    };
    this.addToggle = this.addToggle.bind(this);
  }

  addToggle(e) {
    e.stopPropagation();
    this.setState({
      addOpen: !this.state.addOpen,
    });
  }

  render() {
    const { addOpen } = this.state;
    return (
      <div className="add-menu">
        <a href="#" className="btn-secondary" onClick={this.addToggle}>
          + Add
        </a>
        {addOpen
          ? <Link to="/profiles/add" className="btn-secondary">Profile</Link>
          : null}
      </div>
    );
  }
}

// AddMenu.propTypes = {
//   user: React.PropTypes.object,
// };
