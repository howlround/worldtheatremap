import React from 'react';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overlay-background">
        {this.props.children}
      </div>
    );
  }
}
