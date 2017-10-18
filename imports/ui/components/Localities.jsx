import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const Localities = (props) => {
  const { localities, conjunction } = props;
  const { formatMessage } = props.intl;

  const conj = conjunction ? conjunction : 'and';

  const localitiesString = localities.map((locality, index, array) => {
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

    // Locality doesn't get translated for now.
    return (
      <span key={locality}>
        {locality}
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {localitiesString}
    </span>
  );
};

Localities.propTypes = {
  localities: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Localities);
