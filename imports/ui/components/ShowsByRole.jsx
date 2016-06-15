import React from 'react';
import { Link } from 'react-router';
import { Participants } from '../../api/participants/participants.js';

export default class ShowsByRole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile, role } = this.props;

    // Get all of the events this profile has for this role, sorted by show
    // @TODO: Make sure this is reactive. Maybe make a container for this step
    const participantsByEvent = Meteor.subscribe('participants.byProfile', profile._id);
    const eventsByProfileByRole = Participants.find({'profile.id': profile._id, 'role': role}, {
      fields: Participants.publicFields,
    }).fetch();

    eventsByProfileByRole.map(event => {

    });

    return (
      <div />
    );
  }
}

ShowsByRole.propTypes = {
  profile: React.PropTypes.object,
  role: React.PropTypes.string,
};
