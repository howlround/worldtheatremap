import React from 'react';

class ShowName extends React.Component {
  render() {
    const { showName, showExists } = this.props;

    return (
      <span className="show-name">
        {showExists ?
          showName.name
          : ''
        }
      </span>
    );
  }
}

ShowName.propTypes = {
  showName: React.PropTypes.object,
  loading: React.PropTypes.bool,
  showExists: React.PropTypes.bool,
};

ShowName.contextTypes = {
  router: React.PropTypes.object,
};

export default ShowName;
