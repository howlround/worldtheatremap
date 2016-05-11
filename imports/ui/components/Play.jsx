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

  triggerEdit(event) {
    event.preventDefault();

    this.props.onEditingChange(this.props.play._id, true);
  }

  render() {
    const { play, user } = this.props;
    const editLink = user ?
      <Link
        to={`/plays/${ play._id }`}
        key={play._id}
        title={play.name}
        className="edit-play"
        activeClassName="active"
        onClick={this.triggerEdit.bind(this)}
      >
        Edit
      </Link>
    : '';
    return (
      <article className="play">
        <div className="play-main-info">
          <h1 className="play-name page-title">
            {play.name}
          </h1>
          <div className="play-authorship">
            by <span className="play-author">{play.author}</span>
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
