import React from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

const Languages = (props) => {
  const { languages, conjunction } = props;
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

  const languagesString = languages.map((language, index, array) => {
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
      <span key={language}>
        {
          formatMessage({
            id: `language.${language}`,
            defaultMessage: language,
            description: language,
          })
        }
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {languagesString}
    </span>
  );
};

Languages.propTypes = {
  languages: React.PropTypes.array,
  conjunction: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Languages);
