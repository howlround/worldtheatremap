import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/plays/methods.js';

export default class Play extends React.Component {
  constructor(props) {
    super(props);

    this.createNewPlay = this.createNewPlay.bind(this);
  }

  createNewPlay() {
    const { router } = this.context;
    const listId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create list.');
      }
    });
    router.push(`/plays/${ listId }`);
  }

  render() {
    const { play, user } = this.props;

    const editLink = user ?
      <Link
        to={`/plays/${ play._id }/edit`}
        key={play._id}
        title={play.name}
        className="edit-play"
        activeClassName="active"
      >
        Edit
      </Link>
    : '';

    // @TODO: Abstract this to a function or component to reduce duplication in PlayTeaser.jsx
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
      <article className="play">
        <div className="play-main-info">
          <h1 className="play-name page-title">
            {play.name}
          </h1>
          <div className="play-authorship">
            by {authors}
          </div>
          {editLink}
        </div>
        {play.about ?
          <div className="play-about">
            <h2>About</h2>
            {/*<div dangerouslySetInnerHTML={{__html: play.about}} />*/}
            {play.about}
            {editLink}
          </div> : ''
        }
      </article>
    );
  }
}

Play.propTypes = {
  play: React.PropTypes.object,
  user: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

Play.contextTypes = {
  router: React.PropTypes.object,
};
