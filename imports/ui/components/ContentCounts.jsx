import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

// Components
import CountByType from '../components/CountByType.jsx';

class ContentCounts extends React.Component {
  render() {
    const { counts } = this.props;

    const stats = _.map(counts, (countObj) => (
      <CountByType
        countObj={countObj}
        key={countObj._id}
      />
    ));

    return (
      <div className="content-counts">
        <h2>
          <FormattedMessage
            id="footer.siteStatisticsHeader"
            description="Header text for the site statistics block"
            defaultMessage="The State of the World Theatre Map"
          />
        </h2>
        <div className="footer-content">
          {stats}
        </div>
      </div>
    );
  }
}

ContentCounts.propTypes = {
  counts: React.PropTypes.array,
};

export default ContentCounts;
