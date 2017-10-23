import React from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const Countries = (props) => {
  const { countries, conjunction } = props;
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

  const countriesString = countries.map((country, index, array) => {
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
      <span key={country}>
        {
          formatMessage({
            id: `country.${country}`,
            defaultMessage: country,
          })
        }
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {countriesString}
    </span>
  );
};

Countries.propTypes = {
  countries: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Countries);
