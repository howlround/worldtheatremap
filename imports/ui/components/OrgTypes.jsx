import React from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const OrgTypes = (props) => {
  const { orgTypes, conjunction } = props;
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

  const orgTypesString = orgTypes.map((orgType, index, array) => {
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
    return (
      <span key={orgType}>
        {
          formatMessage({
            id: `orgType.${orgType}`,
            defaultMessage: orgType,
          })
        }
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {orgTypesString}
    </span>
  );
};

OrgTypes.propTypes = {
  orgTypes: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(OrgTypes);
