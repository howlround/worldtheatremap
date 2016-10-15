import React from 'react';
import classnames from 'classnames';

export default class Loading extends React.Component {
  render() {
    const { interiorBlock } = this.props;
    const className = {
      'interior-loading-block': interiorBlock,
    }

    return (
      <span className={classnames(className)}>
        <img src="/loading_globe.png" className="loading-app" />
        <h2 className="loading-app">Loading...</h2>
      </span>
    );
  }
}

Loading.propTypes = {
  interiorBlock: React.PropTypes.bool,
};
