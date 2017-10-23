import React from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const Ethnicity = (props) => {
  const { ethnicities, conjunction } = props;
  const { formatMessage } = props.intl;

  const messages = defineMessages({
    and: {
      id: 'conjunction.and',
      defaultMessage: 'and',
    },
    or: {
      id: 'conjunction.or',
      defaultMessage: 'or',
    },
  });

  const conj = conjunction ?
    formatMessage(messages[conjunction])
    : formatMessage(messages.and);

  const ethnicitiesString = ethnicities.map((ethnicity, index, array) => {
    let seperator = ', ';
    if (index === array.length - 1) {
      seperator = '';
    } else if (index === array.length - 2) {
      if (array.length > 2) {
        seperator = `, ${conj} `;
      } else {
        seperator = ` ${conj} `;
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
