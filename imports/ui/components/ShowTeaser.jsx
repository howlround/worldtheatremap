import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Authors from '../components/Authors.jsx';

export default class ShowTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show } = this.props;

    return (
      <article className="show-teaser">
        <div className="show-main-info">
          <h3 className="show-name">
            <Link to={`/shows/${ show._id }`} key={show._id}>{show.name}</Link>
          </h3>
          <div className="show-authorship">
            <FormattedMessage
              id="show.authors"
              description='By line for authors of a show'
              defaultMessage={`by {authors}`}
              values={{ authors: <Authors authors={show.author} /> }}
            />
          </div>
        </div>
      </article>
    );
  }
}

ShowTeaser.propTypes = {
  show: React.PropTypes.object,
};

ShowTeaser.contextTypes = {
  router: React.PropTypes.object,
};
