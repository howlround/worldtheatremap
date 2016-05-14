import React from 'react';
import { Link } from 'react-router';

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="add-menu menu-container menu-right">
        <a href="#" className="add menu-parent" >
          + Add
        </a>
        <div className="add-options menu-children">
          <Link to="/profiles/add" className="add-profile">Add Profile</Link>
          <Link to="/plays/add" className="add-play">Add Play</Link>
        </div>
      </div>
    );
  }
}
