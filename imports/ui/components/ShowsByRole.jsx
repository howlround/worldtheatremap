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

    // Get all of the events this profile has for this role, sorted by show
    // @TODO: Make sure this is reactive. Maybe make a container for this step
    const participantsByEvent = Meteor.subscribe('participants.byProfile', profile._id);
    const participantByProfileByRole = Participants.find({'profile._id': profile._id, 'role': role}, {
      fields: Participants.publicFields,
    }).fetch();

    let Shows;
    if (participantByProfileByRole && participantByProfileByRole.length) {
      // We just need one record for each show. The eventsByShow
      // prop will give us each event
      let reduceByShow = new Array;
      _.each(participantByProfileByRole, participantRecord => {
        if (!_.findWhere(reduceByShow, { name: participantRecord.event.show.name})) {
          reduceByShow.push(participantRecord.event.show);
        }
      });
      Shows = reduceByShow.map(participantShow => (
        <li key={participantShow._id}>
          <ShowTeaser
            show={participantShow}
            eventsByShow={eventsByShow[participantShow._id]}
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
  eventsByShow: React.PropTypes.array,
};
