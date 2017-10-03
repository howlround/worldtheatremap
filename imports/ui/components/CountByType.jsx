import React from 'react';
import classnames from 'classnames';
import {
  FormattedNumber,
  FormattedPlural,
  intlShape,
  injectIntl,
} from 'react-intl';

class CountByType extends React.Component {
  render() {
    const { countObj } = this.props;
    const { formatMessage } = this.props.intl;

    const type = countObj._id;
    const typeClass = type.toLowerCase();
    const typeSingular = type.replace(new RegExp('s$'), '');

    // Can't use defineMessages here because it's pulling from the db

    return (
      <div className={classnames('count-by-type', `${typeClass}-count`)}>
        <div className="count">
          <FormattedNumber
            value={countObj.count}
          />
        </div>
        <div className="type">
          <FormattedPlural
            value={countObj.count}
            one={
              formatMessage({
                id: `stats.one${typeSingular}`,
                defaultMessage: typeSingular,
                description: `Statistics Count Singular for ${type}`,
              })
            }
            other={
              formatMessage({
                id: `stats.other${type}`,
                defaultMessage: type,
                description: `Statistics Count Other for ${type}`,
              })
            }
          />
        </div>
      </div>
    );
  }
}

CountByType.propTypes = {
  countObj: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(CountByType);
