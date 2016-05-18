import React from 'react';
import { Link } from 'react-router';

export default class EventTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { event } = this.props;

    return (
      <article className="event-teaser">
        <div className="event-main-info">
          <h3 className="event-name">
            <Link to={`/events/${ event._id }`} key={event._id}>{event.about}</Link>
          </h3>
        </div>
      </article>
    );
  }
}

EventTeaser.propTypes = {
  event: React.PropTypes.object,
};

EventTeaser.contextTypes = {
  router: React.PropTypes.object,
};
