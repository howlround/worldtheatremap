import React from 'react';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';

export default class Checkboxes extends React.Component {
  constructor(props) {
    super(props);

    const { options, name, values } = this.props;
    const optionFlags = {};
    _.each(options, option => optionFlags[option.value] = _.contains(values, option.value));

    this.state = optionFlags;

    this.onChange = this.onChange.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      const { onChange } = this.props;

      var keys = [];

      _.find(nextState, function(v, k) {
        if (v === true) {
          keys.push(k);
        }
      });

      onChange(keys);
    }
  }

  onChange(value) {
    // Get all the select values in an array and pass them on onChange
    const state = {};
    state[value.target.name] = value.target.checked;
    this.setState(state);
  }

  render() {
    const { options, name, values, disabled } = this.props;

    const wrapperClass = {
      'checkbox-group': true,
      disabled,
    }

    const checkboxes = _.map(options, (option, index) => {
    const checked = this.state[option.value];

      return (
        <div className="checkbox" key={option.value}>
          <label for={`${name}-checkbox-${index}`}>
            <input
              id={`${name}-checkbox-${index}`}
              type="checkbox"
              name={option.value}
              checked={checked}
              onChange={this.onChange}
              disabled={disabled}
            />
            <div className={`label-text ${name}-label-text`}>
              {option.label}
            </div>
          </label>
        </div>
      );
    });

    return (
      <div className={classnames(wrapperClass)}>
        {checkboxes}
      </div>
    );
  }
}

Checkboxes.propTypes = {
  options: React.PropTypes.array,
  values: React.PropTypes.array,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};
