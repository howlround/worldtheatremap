import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// About component - represents a single todo item
export default class About extends Component {
  render() {
    return (
      <article >
        The about page
      </article>
    );
  }
}

// About.propTypes = {
//   // This component gets the profile to display through a React prop.
//   // We can use propTypes to indicate it is required
//   profile: PropTypes.object.isRequired,
// };
