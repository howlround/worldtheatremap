import React from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const SelfDefinedRoles = (props) => {
  const { roles, conjunction } = props;
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

  const rolesString = roles.map((role, index, array) => {
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
      <span key={role}>
        {
          formatMessage({
            id: `role.${role}`,
            defaultMessage: role,
            description: `Roles option: ${role}`,
          })
        }
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {rolesString}
    </span>
  );
};

SelfDefinedRoles.propTypes = {
  roles: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(SelfDefinedRoles);
