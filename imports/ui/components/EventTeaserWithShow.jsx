import React from 'react';
import { Link } from 'react-router';

export default class EventTeaserWithShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { event } = this.props;

    const locationLine = [ event.locality, event.administrativeArea, event.country ].filter(function (val) {return val;}).join(', ');

    // @TODO: Abstract this to a function or component to reduce duplication in EventTeaser.jsx and Event.jsx
    const authors = event.show.author.map((author, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        seperator = ' and ';
      }
      return <span key={author.id}><Link to={`/profiles/${ author.id }`} className="show-author">{author.name}</Link>{seperator}</span>
    });

    return (
      <article className="event-teaser-with-show">
        <div className="event-main-info">
          <div className="event-type">
            { event.eventType }
          </div>
          <h3 className="event-show-name">
            <Link to={`/shows/${ event.show._id }`} key={ event.show._id }>{ event.show.name }</Link>
          </h3>
          <div className="event-authorship">
            by {authors}
          </div>
          { typeof locationLine != 'undefined' ?
            <div className="event-location">{ locationLine }</div> : '' }
          { event.dateRange ?
            <div className="event-date-range date">
              { event.dateRange }
            </div> : '' }
        </div>
      </article>
    );
  }
}

EventTeaserWithShow.propTypes = {
  event: React.PropTypes.object,
};

EventTeaserWithShow.contextTypes = {
  router: React.PropTypes.object,
};
