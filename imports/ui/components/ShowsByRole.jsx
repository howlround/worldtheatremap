import React from 'react';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Participants } from '../../api/participants/participants.js';
import ShowTeaser from '../components/ShowTeaser.jsx';

export default class ShowsByRole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile, role, eventsByShow } = this.props;

    const Shows = Object.keys(eventsByShow).map((showKey, index) => {
      const showEvents = eventsByShow[showKey];
      const showId = Object.keys(eventsByShow)[index];
      return (
        <li key={showId}>
          <ShowTeaser
            show={showEvents[index].show}
            eventsByShow={showEvents}
          />
        </li>
      );
    });

    const roleTitle = role ? role :
      <FormattedMessage
        id='show.participantDefaultHeader'
        description="Default header for participants that don't list a role"
        defaultMessage="Participant"
      />;

    return (
      <section className="shows-by-role profile-shows">
        <h2>{roleTitle}</h2>
        <ul>
          {Shows}
        </ul>
      </section>
    );
  }
}

ShowsByRole.propTypes = {
  profile: React.PropTypes.object,
  role: React.PropTypes.string,
  eventsByShow: React.PropTypes.array,
};
