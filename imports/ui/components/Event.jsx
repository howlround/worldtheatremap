import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/events/methods.js';

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.createNewEvent = this.createNewEvent.bind(this);
  }

  createNewEvent() {
    const { router } = this.context;
    const listId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create list.');
      }
    });
    router.push(`/events/${ listId }`);
  }

  render() {
    const { event, user } = this.props;

    const editLink = user ?
      <Link
        to={`/events/${ event._id }/edit`}
        key={event._id}
        title={event.name}
        className="edit-event"
        activeClassName="active"
      >
        Edit
      </Link>
    : '';

    // @TODO: Abstract this to a function or component to reduce duplication in EventTeaser.jsx
    // const authors = event.author.map((author, index, array) => {
    //   let seperator = ', ';
    //   if (index == array.length - 1) {
    //     seperator = '';
    //   }
    //   else if (index == array.length - 2) {
    //     seperator = ' and ';
    //   }
    //   return <span key={author.id}><Link to={`/profiles/${ author.id }`} className="event-author">{author.name}</Link>{seperator}</span>
    // });
    const authors = '';

    return (
      <article className="event">
        <div className="event-main-info">
          <h1 className="event-name page-title">
            Event for {event.play[0].name}
          </h1>
          <div className="event-authorship">
            by {authors}
          </div>
          {editLink}
        </div>
        {event.about ?
          <div className="event-about">
            <h2>About</h2>
            {/*<div dangerouslySetInnerHTML={{__html: event.about}} />*/}
            {event.about}
            {editLink}
          </div> : ''
        }
      </article>
    );
  }
}

Event.propTypes = {
  event: React.PropTypes.object,
  user: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

Event.contextTypes = {
  router: React.PropTypes.object,
};
