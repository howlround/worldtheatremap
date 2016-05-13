import React from 'react';
import { Link } from 'react-router';

export default class Play extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { play } = this.props;

    const authors = play.author.map(author => {
      return <Link to={`/profiles/${ author.id }`} key={author.id} className="play-author">{author.name}, </Link>
    });

    return (
      <article className="play-teaser">
        <div className="play-main-info">
          <h3 className="play-name">
            <Link to={`/plays/${ play._id }`} key={play._id}>{play.name}</Link>
          </h3>
          <div className="play-authorship">
            by {authors}
          </div>
        </div>
      </article>
    );
  }
}

Play.propTypes = {
  play: React.PropTypes.object,
};

Play.contextTypes = {
  router: React.PropTypes.object,
};
