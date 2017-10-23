import React from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const Interests = (props) => {
  const { interests, conjunction } = props;
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

  const interestsString = interests.map((interest, index, array) => {
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
      <span key={interest}>
        {
          formatMessage({
            id: `interest.${interest}`,
            defaultMessage: interest,
            description: `Interests option: ${interest}`,
          })
        }
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {interestsString}
    </span>
  );
};

Interests.propTypes = {
  interests: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Interests);
