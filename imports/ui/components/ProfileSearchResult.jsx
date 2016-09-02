import React from 'react';
import classNames from 'classnames';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
// import ShowTeaser from '../components/ShowTeaser.jsx';

export default class ProfileSearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile } = this.props;

    // Leave this for now in case we want to display show info on search results later
    // let Shows;
    // if (shows && shows.length) {
    //   Shows = shows.map(show => (
    //     <li key={show._id}>
    //       <ShowTeaser
    //         show={show}
    //       />
    //     </li>
    //   ));
    // }

    const interests = (profile.interests) ? profile.interests.map((interest, index, array) => {
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

    let orgTypes = (profile.orgTypes) ? profile.orgTypes.map((orgType, index, array) => {
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
      return <span key={orgType}>{orgType}{seperator}</span>
    }) : false;

    let selfDefinedRoles = (profile.selfDefinedRoles) ? profile.selfDefinedRoles.map((selfDefinedRole, index, array) => {
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
      return <span key={selfDefinedRole}>{selfDefinedRole}{seperator}</span>
    }) : false;

    const locationBlock = [profile.locality, profile.administrativeArea, profile.country].filter(function (val) {return val;}).join(', ');

    return (
      <article className="profile search-result">
        {/* A photo could go here */}
        <div className="profile-content-wrapper">
          <Link
            to={`/profiles/${ profile._id }`}
            title={profile.name}
            className="profile-name"
            activeClassName="active"
          >
            {profile.name}
          </Link>
          <div className="profile-metadata">
            { !_.isEmpty(locationBlock) ?
                <div className="profile-location"><span className="profile-metadata-label">Location: </span>{ locationBlock }</div> : '' }
            { !_.isEmpty(profile.selfDefinedRoles) ?
              <div className="profile-roles" title="Roles"><span className="profile-metadata-label">Roles: </span>{ selfDefinedRoles }</div> : '' }
            { !_.isEmpty(profile.orgTypes) ?
              <div className="profile-organization-types" title="Organization Type"><span className="profile-metadata-label">Organization types: </span>{ orgTypes }</div> : '' }
            { !_.isEmpty(profile.interests) ?
              <div className="profile-interests" title="Interests"><span className="profile-metadata-label">Interests: </span>{ interests }</div> : '' }
          </div>
        </div>
      </article>
    );
  }
}

ProfileSearchResult.propTypes = {
  profile: React.PropTypes.object,
};

ProfileSearchResult.contextTypes = {
  router: React.PropTypes.object,
};
