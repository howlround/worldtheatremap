import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

const Authors = (props) => {
  const { authors, noLinks } = props;

  const authorString = authors.map((author, index, array) => {
    let seperator = ', ';
    if (index === array.length - 1) {
      seperator = '';
    } else if (index === array.length - 2) {
      // Had to leave those extra spans to make spaces validate with the react element
      seperator = (<span><span> </span><FormattedMessage
        id="show.authorsFinalSeperator"
        description="When there are multiple authors for a show, the final seperator between names" // eslint-disable-line max-len
        defaultMessage="and"
      /><span> </span></span>);
    }

    return (
      <span key={author._id}>
        <ProfileNameContainer
          profileId={author._id}
          defaultName={author.name}
          noLinks={noLinks}
        />
        {seperator}
      </span>
    );
  });

  return (
    <span>
      {authorString}
    </span>
  );
};

Authors.propTypes = {
  authors: React.PropTypes.array,
  noLinks: React.PropTypes.bool,
  // intl: intlShape.isRequired,
};

export default Authors;
