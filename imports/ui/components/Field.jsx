import React from 'react';
import { Link } from 'react-router';

export default class FieldWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, content } = this.props;

    return (
      <div>
        <label>{ label } </label>{ content }
      </div>
    );
  }
}

FieldWrapper.propTypes = {
  label: React.PropTypes.string,
  content: React.PropTypes.string,
};
