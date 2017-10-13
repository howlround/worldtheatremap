import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

export default class SearchResultsToggle extends React.Component {
  constructor(props) {
    super(props);

    this.activateMap = this.activateMap.bind(this);
    this.activateList = this.activateList.bind(this);
  }

  activateMap(event) {
    const { toggle } = this.props;

    event.preventDefault();

    toggle('map');
  }

  activateList(event) {
    const { toggle } = this.props;

    event.preventDefault();

    toggle('list');
  }

  render() {
    const { active } = this.props;

    return (
      <div className="search-results-toggle">
        <a
          href="#"
          className={classnames('search-results-toggle-item','results-display-list', { active: (active === 'list') })}
          onClick={this.activateList}
        >
          <FormattedMessage
            id="searchResultsToggle.list"
            description="Search results toggle link: List"
            defaultMessage="List"
          />
        </a>
        <a
          href="#"
          className={classnames('search-results-toggle-item', 'results-display-map', { active: (active === 'map') })}
          onClick={this.activateMap}
        >
          <FormattedMessage
            id="searchResultsToggle.map"
            description="Search results toggle link: Map"
            defaultMessage="Map"
          />
        </a>
      </div>
    );
  }
}

SearchResultsToggle.propTypes = {
  toggle: React.PropTypes.func,
  active: React.PropTypes.string,
};

SearchResultsToggle.contextTypes = {
  router: React.PropTypes.object,
};
