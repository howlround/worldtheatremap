import React from 'react';
import { _ } from 'meteor/underscore';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

// Components
import Ethnicities from '../components/Ethnicities.jsx';
import Genders from '../components/Genders.jsx';
import Interests from '../components/Interests.jsx';
import Profile from '../components/Profile.jsx';
import ProfileContact from '../components/ProfileContact.jsx';
import SelfDefinedRoles from '../components/SelfDefinedRoles.jsx';

class ProfileMainFields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      profile,
      user,
      showsForAuthor,
      showsForOrg,
      eventsByShowByOrg,
      roles,
      affiliatedProfiles,
      festivalProfiles,
    } = this.props;
    const { formatMessage, locale } = this.props.intl;

    const interests = (profile.interests) ?
      <Interests interests={profile.interests} />
      : false;

    let orgTypes = (profile.orgTypes) ? profile.orgTypes.map((orgType, index, array) => {
      let seperator = ', ';
      if (index === array.length - 1) {
        seperator = '';
      } else if (index === array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        } else {
          seperator = ' and ';
        }
      }
      return (
        <span key={orgType}>
          {
            formatMessage({
              id: `orgType.${orgType}`,
              defaultMessage: orgType,
              description: `Interests option: ${orgType}`,
            })
          }
          {seperator}
        </span>
      );
    }) : false;

    let selfDefinedRoles = (profile.selfDefinedRoles && _.contains(profile.profileType, 'Individual')) ?
      <SelfDefinedRoles roles={profile.selfDefinedRoles} />
      : false;

    let gendersArray = [];
    if (!_.isEmpty(profile.gender) && _.contains(profile.profileType, 'Individual')) {
      gendersArray = _.filter(profile.gender, gender => {
        return gender !== 'Another Identity';
      });

      if (!_.isEmpty(profile.genderOther)) {
        _.each(profile.genderOther, gender => {
          gendersArray.push(gender);
        })
      }
    }

    // Make sure new genders list is alphabetized
    gendersArray.sort();

    let genders = (!_.isEmpty(gendersArray)) ?
      <Genders genders={gendersArray} />
      : false;

    let ethnicityRaceDisplay = (profile.ethnicityRace && _.contains(profile.profileType, 'Individual')) ?
      <Ethnicities ethnicities={profile.ethnicityRace} />
      : false;

    const cityState = [
      profile.locality,
      profile.administrativeArea,
    ].filter((val) => val).join(', ');
    const locationBlock = (<div className="profile-location">
      {cityState ? <div>{cityState}</div> : ''}
      {profile.country ?
        <div className="profile-country">
          {
            formatMessage({
              id: `country.${profile.country}`,
              description: `Country options: ${profile.country}`,
              defaultMessage: profile.country,
            })
          }
        </div> : ''}
      </div>);

    return (
      <div className="profile-content-wrapper">
        <h1 className="profile-name page-title">
          {profile.name}
        </h1>
        {typeof locationBlock !== 'undefined' ?
            <div className="profile-location">{locationBlock}</div> : ''}
        <div className="profile-metadata metadata">
          {(!_.isEmpty(profile.selfDefinedRoles) && _.contains(profile.profileType, 'Individual')) ?
            <div className="profile-roles" title="Roles">{selfDefinedRoles}</div> : ''}
          {(!_.isEmpty(profile.gender) && _.contains(profile.profileType, 'Individual')) ?
            <div className="profile-gender" title="Gender">{genders}</div> : ''}
          {!_.isEmpty(ethnicityRaceDisplay) ?
            <div className="profile-ethnicity-race-display" title="Ethnicity/Race">
              {ethnicityRaceDisplay}
            </div> : ''}
          {(!_.isEmpty(profile.orgTypes) && _.contains(profile.profileType, 'Organization')) ?
            <div
              className="profile-organization-types"
              title="Organization Type"
            >
              {orgTypes}
            </div> : ''}
          {(!_.isEmpty(profile.foundingYear) && _.contains(profile.profileType, 'Organization')) ?
            <div className="profile-founding-year">
              <FormattedMessage
                id="profile.foundedDate"
                description="Founded date metadata"
                defaultMessage={`Founded {foundingYear}`}
                values={{ foundingYear: profile.foundingYear }}
              />
            </div> : ''}
          {!_.isEmpty(profile.interests) ?
            <div className="profile-interests" title="Interests">{interests}</div> : ''}
        </div>
      </div>
    );
  }
}

ProfileMainFields.propTypes = {
  profile: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileMainFields);
