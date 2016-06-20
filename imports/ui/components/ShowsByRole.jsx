import React from 'react';
import { Link } from 'react-router';
import { Participants } from '../../api/participants/participants.js';
import PlayTeaser from '../components/PlayTeaser.jsx';

export default class ShowsByRole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile, role } = this.props;

    // Get all of the events this profile has for this role, sorted by show
    // @TODO: Make sure this is reactive. Maybe make a container for this step
    const participantsByEvent = Meteor.subscribe('participants.byProfile', profile._id);
    const participantByProfileByRole = Participants.find({'profile.id': profile._id, 'role': role}, {
      fields: Participants.publicFields,
    }).fetch();

    let Shows;
    if (participantByProfileByRole && participantByProfileByRole.length) {
      Shows = participantByProfileByRole.map(participantRecord => (
        <li key={participantRecord.event.play[0].id}>
          <PlayTeaser
            play={participantRecord.event.play[0]}
          />
        </li>
      ));
    }

    return (
      <section className="shows-by-role profile-plays">
        <h2>{role}</h2>
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
