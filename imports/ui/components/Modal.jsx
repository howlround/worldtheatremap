import React from 'react';

export default class Modal extends React.Component {
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
