import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

export default class SearchResultsToggle extends React.Component {
  constructor(props) {
    super(props);

    this.updateParentResultsDisplay = this.updateParentResultsDisplay.bind(this);
  }

  updateParentResultsDisplay(display, event) {
    const { toggle } = this.props;

    event.preventDefault();

    toggle(display);
  }

  render() {
    const { active } = this.props;

    return (
      <div className="search-results-toggle">
        <a
          href="#"
          className={classnames('search-results-toggle-item', { active: (active === 'list') })}
          onClick={this.updateParentResultsDisplay.bind(this, 'list')}
        >
          <FormattedMessage
            id="searchResultsToggle.list"
            description="Search results toggle link: List"
            defaultMessage="List"
          />
        </a>
        <a
          href="#"
          className={classnames('search-results-toggle-item', { active: (active === 'map') })}
          onClick={this.updateParentResultsDisplay.bind(this, 'map')}
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
