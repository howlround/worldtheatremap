import React from 'react';
import { _ } from 'meteor/underscore';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

// Components
import Profile from '../components/Profile.jsx';
import ProfileContact from '../components/ProfileContact.jsx';

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

    const interests = (profile.interests) ? profile.interests.map((interest, index, array) => {
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
        <span key={interest}>
          {
            formatMessage({
              id: `interest.${interest}`,
              defaultMessage: interest,
              description: `Interests option: ${interest}`,
            })
          }
          {seperator}
        </span>
      );
    }) : false;

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

    let selfDefinedRoles = (profile.selfDefinedRoles) ?
      profile.selfDefinedRoles.map((selfDefinedRole, index, array) => {
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
          <span key={selfDefinedRole}>
            {
              formatMessage({
                id: `role.${selfDefinedRole}`,
                defaultMessage: selfDefinedRole,
                description: `Roles option: ${selfDefinedRole}`,
              })
            }
            {seperator}
          </span>
        );
      }) : false;

    let gendersArray = [];
    if (!_.isEmpty(profile.gender)) {
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

    let genders = (!_.isEmpty(gendersArray)) ? gendersArray.map((gender, index, array) => {
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
      return (<span key={gender}>{gender}{seperator}</span>);
    }) : false;

    let ethnicityRaceDisplay = (profile.ethnicityRace) ? profile.ethnicityRace.map((ethnicityRace, index, array) => {
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
      return (<span key={ethnicityRace}>{ethnicityRace}{seperator}</span>);
    }) : false;

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
          {!_.isEmpty(profile.selfDefinedRoles) ?
            <div className="profile-roles" title="Roles">
              <h3>
                <FormattedMessage
                  id="forms.rolesLabel"
                  description="Label for the Roles form field"
                  defaultMessage="What does this person do in the theatre?"
                />
              </h3>
              {selfDefinedRoles}
            </div> : ''}
          {!_.isEmpty(profile.gender) ?
            <div className="profile-gender" title="Gender">
              <h3>
                <FormattedMessage
                  id="forms.emailEthnicityRaceLabel"
                  description="Label for a Ethnicity/Race form field in email"
                  defaultMessage="Ethnicity/race/cultural identity"
                />
              </h3>
              {genders}
            </div> : ''}
          {!_.isEmpty(ethnicityRaceDisplay) ?
            <div className="profile-ethnicity-race-display" title="Ethnicity/Race">
              <h3>
                <FormattedMessage
                  id="forms.ethnicityRaceLabel"
                  description="Label for the Ethnicity/Race form field"
                  defaultMessage="How does this person identify their ethnicity/race/cultural identity?"
                />
              </h3>
              {ethnicityRaceDisplay}
            </div> : ''}
          {!_.isEmpty(profile.orgTypes) ?
            <div
              className="profile-organization-types"
              title="Organization Type"
            >
              <h3>
                <FormattedMessage
                  id="forms.orgTypesLabel"
                  description="Label for an Organization Type form field"
                  defaultMessage="What kind of organization is this?"
                />
              </h3>
              {orgTypes}
            </div> : ''}
          {!_.isEmpty(profile.foundingYear) ?
            <div className="profile-founding-year">
              <FormattedMessage
                id="profile.foundedDate"
                description="Founded date metadata"
                defaultMessage={`Founded {foundingYear}`}
                values={{ foundingYear: profile.foundingYear }}
              />
            </div> : ''}
          {!_.isEmpty(profile.interests) ?
            <div className="profile-interests" title="Interests">
              <h3>
                <FormattedMessage
                  id="forms.interestsLabel"
                  description="Label for Interests form field"
                  defaultMessage="Interests"
                />
              </h3>
              {interests}
            </div> : ''}
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
