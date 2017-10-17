import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const Ethnicity = (props) => {
  const { ethnicities, conjunction } = props;
  const { formatMessage } = props.intl;

  const conj = conjunction ? conjunction : 'and';

  const ethnicitiesString = ethnicities.map((ethnicity, index, array) => {
    let seperator = ', ';
    if (index === array.length - 1) {
      seperator = '';
    } else if (index === array.length - 2) {
      if (array.length > 2) {
        seperator = ', and ';
      } else {
        seperator = ' and ';
      }
    }
    return (<span key={ethnicity}>{ethnicity}{seperator}</span>);
  });

  return (
    <span>
      {ethnicitiesString}
    </span>
  );
};

Ethnicity.propTypes = {
  ethnicities: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Ethnicity);
