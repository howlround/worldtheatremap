import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const Genders = (props) => {
  const { genders, conjunction } = props;
  const { formatMessage } = props.intl;

  const conj = conjunction ? conjunction : 'and';

  const gendersString = genders.map((gender, index, array) => {
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
      <span key={gender}>
        {
          formatMessage({
            id: `gender.${gender}`,
            defaultMessage: gender,
            description: gender,
          })
        }
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {gendersString}
    </span>
  );
};

Genders.propTypes = {
  genders: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Genders);
