import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const OrgTypes = (props) => {
  const { orgTypes, conjunction } = props;
  const { formatMessage } = props.intl;

  const conj = conjunction ? conjunction : 'and';

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
    return (<span key={orgType}>{orgType}{seperator}</span>);
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
