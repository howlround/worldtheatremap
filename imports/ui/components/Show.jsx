import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/shows/methods.js';
import classNames from 'classnames';
import EventTeaser from '../components/EventTeaser.jsx';
import EventsMiniGlobe from '../components/EventsMiniGlobe.jsx';

export default class Show extends React.Component {
  constructor(props) {
    super(props);

    this.createNewShow = this.createNewShow.bind(this);
  }

  createNewShow() {
    const { router } = this.context;
    const listId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create list.');
      }
    });
    router.push(`/shows/${ listId }`);
  }

  render() {
    const { show, user, eventsByShow } = this.props;

    const editLink = user ?
      <Link
        to={`/shows/${ show._id }/edit`}
        key={show._id}
        title={show.name}
        className="edit-link"
        activeClassName="active"
      >
        Edit
      </Link>
    : '';

    // @TODO: Abstract this to a function or component to reduce duplication in ShowTeaser.jsx
    const authors = show.author.map((author, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        }
        else {
          seperator = ' and ';
        }
      }
      return <span key={author.id}><Link to={`/profiles/${ author.id }`} className="show-author">{author.name}</Link>{seperator}</span>
    });

    let events;
    if (eventsByShow && eventsByShow.length) {
      events = eventsByShow.map(event => (
        <li key={event._id}>
          <EventTeaser
            event={event}
          />
        </li>
      ));
    }

    const interests = (show.interests) ? show.interests.map((interest, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        }
        else {
          seperator = ' and ';
        }
      }
      return <span key={interest}>{interest}{seperator}</span>
    }) : false;

    const articleClasses = classNames('show', 'full', {
      'with-location': eventsByShow && eventsByShow.length,
    });

    return (
      <article className={articleClasses}>
        <section>
          {(eventsByShow && eventsByShow.length) ?
            <EventsMiniGlobe events={eventsByShow} /> : ''
          }
          <div className="show-main-info">
            <h1 className="show-name page-title">
              {show.name}
            </h1>
            <div className="show-authorship">
              by {authors}
            </div>
            <div className="show-metadata metadata">
              { !_.isEmpty(show.interests) ?
                <div className="show-interests" title="Interests">{ interests }</div> : '' }
            </div>
            {editLink}
          </div>
        </section>
        {show.about ?
          <section className="show-about">
            <h2>About</h2>
            {/*<div dangerouslySetInnerHTML={{__html: show.about}} />*/}
            {show.about}
            {editLink}
          </section> : ''
        }
        {(eventsByShow && eventsByShow.length) ?
          <section className="show-events">
            <h2>Show History</h2>
            <ul>
              {events}
            </ul>
          </section>
          : ''
        }
      </article>
    );
  }
}

Show.propTypes = {
  show: React.PropTypes.object,
  eventsByShow: React.PropTypes.array,
  user: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

Show.contextTypes = {
  router: React.PropTypes.object,
};
