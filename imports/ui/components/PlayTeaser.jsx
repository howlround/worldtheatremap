import React from 'react';
import { Link } from 'react-router';

export default class PlayTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { play } = this.props;

    // @TODO: Abstract this to a function or component to reduce duplication in Play.jsx
    const authors = play.author.map((author, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        seperator = ' and ';
      }
      return <span key={author.id}><Link to={`/profiles/${ author.id }`} className="play-author">{author.name}</Link>{seperator}</span>
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

PlayTeaser.propTypes = {
  play: React.PropTypes.object,
};

PlayTeaser.contextTypes = {
  router: React.PropTypes.object,
};
