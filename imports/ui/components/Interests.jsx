import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const Interests = (props) => {
  const { interests } = props;
  const { formatMessage } = props.intl;

  const interestsString = interests.map((interest, index, array) => {
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
  intl: intlShape.isRequired,
};

export default injectIntl(Interests);
