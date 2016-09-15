import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Participants } from '../../api/participants/participants.js';
import ShowTeaser from '../components/ShowTeaser.jsx';

export default class ShowsByRole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile, role } = this.props;

    // Get all of the events this profile has for this role, sorted by show
    // @TODO: Make sure this is reactive. Maybe make a container for this step
    const participantsByEvent = Meteor.subscribe('participants.byProfile', profile._id);
    const participantByProfileByRole = Participants.find({'profile._id': profile._id, 'role': role}, {
      fields: Participants.publicFields,
    }).fetch();

    let Shows;
    if (participantByProfileByRole && participantByProfileByRole.length) {
      Shows = participantByProfileByRole.map(participantRecord => (
        <li key={participantRecord.event.show._id}>
          <ShowTeaser
            show={participantRecord.event.show}
          />
        </li>
      ));
    }

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
};
