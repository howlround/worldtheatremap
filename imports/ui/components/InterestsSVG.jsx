import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const Interests = (props) => {
  const { interests, conjunction } = props;
  const { formatMessage } = props.intl;

  const conj = conjunction ? conjunction : 'and';

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
      <tspan key={interest}>
        {
          formatMessage({
            id: `interest.${interest}`,
            defaultMessage: interest,
            description: `Interests option: ${interest}`,
          })
        }
        {seperator}
      </tspan>
    );
  });

  return (
    <tspan>
      {interestsString}
    </tspan>
  );
};

Interests.propTypes = {
  interests: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Interests);
