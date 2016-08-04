import React from 'react';
import { Link } from 'react-router';

export default class FieldWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, content, className } = this.props;

    return (
      <div className={className}>
        <label>{ label } </label>{ content }
      </div>
    );
  }
}

FieldWrapper.propTypes = {
  label: React.PropTypes.string,
  content: React.PropTypes.string,
  className: React.PropTypes.string,
};
