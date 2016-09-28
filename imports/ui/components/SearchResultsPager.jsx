import React from 'react';
import { _ } from 'meteor/underscore';

export default class SearchResultsPager extends React.Component {
  constructor(props) {
    super(props);

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    const { updateQuery, query } = this.props;

    const value = query;
    if (value.page && value.page > 0) {
      value.page--;

      if (value.page === 0) {
        delete value.page;
      }
      updateQuery(value);
    }
  }

  next() {
    const { updateQuery, query } = this.props;

    const value = query;
    if (value.page) {
      value.page = Number(value.page);
      if (_.isNumber(value.page) && !_.isNaN(value.page)) {
        value.page++;
      }
    } else {
      value.page = 1;
    }
    updateQuery(value);
  }

  render() {
    const { count, skip } = this.props;
    const limit = 20;

    const prev = (skip >= limit) ? <span className="prev" onClick={this.prev}>&larr; Previous</span> : '';
    const next = (count === limit) ? <span className="next" onClick={this.next}>Next &rarr;</span> : '';

    const pager = (prev || next) ? <div className="search-results-pager">{prev}{next}</div> : null;

    return pager;
  }
}

SearchResultsPager.contextTypes = {
  router: React.PropTypes.object,
};

SearchResultsPager.propTypes = {
  count: React.PropTypes.number,
  skip: React.PropTypes.number,
  query: React.PropTypes.object,
  updateQuery: React.PropTypes.func,
};
