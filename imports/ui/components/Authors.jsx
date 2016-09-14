import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

export default class Authors extends React.Component {
  render() {
    const { authors, noLinks } = this.props;

    // @TODO: Abstract this to a function or component to reduce duplication in EventTeaser.jsx and Event.jsx
    const authorString = authors.map((author, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        // Had to leave those extra spans to make spaces validate with the react element
        seperator = (<span><span> </span><FormattedMessage
          id="show.authorsFinalSeperator"
          description='When there are multiple authors for a show, the final seperator between names'
          defaultMessage='and'
        /><span> </span></span>);
      }

      return (
        <span key={author.id}>
          {!noLinks ?
            <Link to={`/profiles/${ author.id }`} className="show-author">
              <ProfileNameContainer profileId={author.id} />
            </Link>
            : <ProfileNameContainer profileId={author.id} />
          }
          {seperator}
        </span>
      );
    });

    return (
      <span>
        {authorString}
      </span>
    );
  }
}

Authors.propTypes = {
  authors: React.PropTypes.array,
  noLinks: React.PropTypes.bool,
};
