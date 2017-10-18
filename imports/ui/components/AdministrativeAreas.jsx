import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

const AdministrativeAreas = (props) => {
  const { administrativeAreas, conjunction } = props;
  const { formatMessage } = props.intl;

  const conj = conjunction ? conjunction : 'and';

  const administrativeAreasString = administrativeAreas.map((area, index, array) => {
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
      <span key={area}>
        {area}
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {administrativeAreasString}
    </span>
  );
};

AdministrativeAreas.propTypes = {
  administrativeAreas: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(AdministrativeAreas);
