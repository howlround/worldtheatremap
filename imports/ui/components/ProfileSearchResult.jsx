import React from 'react';
import classNames from 'classnames';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
import { FormattedMessage, FormattedDate, intlShape, injectIntl } from 'react-intl';

class ProfileSearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile } = this.props;
    const { formatMessage, locale } = this.props.intl;

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
      return (
        <span key={interest}>
          {
            formatMessage({
              'id': `interest.${interest}`,
              'defaultMessage': interest,
              'description': `Interests option: ${interest}`
            })
          }
          {seperator}
        </span>
      );
    }) : false;

    let orgTypes = (profile.orgTypes && _.contains(profile.profileType, 'Organization')) ? profile.orgTypes.map((orgType, index, array) => {
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

    let selfDefinedRoles = (profile.selfDefinedRoles && _.contains(profile.profileType, 'Individual')) ? profile.selfDefinedRoles.map((selfDefinedRole, index, array) => {
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
            to={`/${locale}/profiles/${ profile._id }`}
            title={profile.name}
            className="profile-name"
            activeClassName="active"
          >
            {profile.name}
          </Link>
          <div className="profile-metadata metadata">
            { !_.isEmpty(locationBlock) ?
              <div className="profile-location">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.locationLabel"
                    description="Location label profile search result metadata"
                    defaultMessage="Location"
                  />:
                </span> { locationBlock }
              </div> : '' }
            { (!_.isEmpty(profile.selfDefinedRoles) && _.contains(profile.profileType, 'Individual')) ?
              <div className="profile-roles" title="Roles">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.rolesLabel"
                    description="Roles label profile search result metadata"
                    defaultMessage="Roles"
                  />:
                </span> { selfDefinedRoles }
              </div> : '' }
            { (!_.isEmpty(profile.orgTypes) && _.contains(profile.profileType, 'Organization')) ?
              <div className="profile-organization-types" title="Organization Type">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.orgTypesLabel"
                    description="Organization Types label profile search result metadata"
                    defaultMessage="Organization Types"
                  />:
                </span> { orgTypes }
              </div> : '' }
            { !_.isEmpty(profile.interests) ?
              <div className="profile-interests" title="Interests">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.interestsLabel"
                    description="Interests label profile search result metadata"
                    defaultMessage="Interests"
                  />:
                </span> { interests }</div> : '' }
            {(profile.startDate && profile.endDate && _.contains(profile.profileType, 'Festival')) ?
              <div className="profile-date-range date">
                <FormattedDate
                  value={profile.startDate}
                  year='numeric'
                  month='short'
                  day='numeric'
                />
                <span> – </span>
                <FormattedDate
                  value={profile.endDate}
                  year='numeric'
                  month='short'
                  day='numeric'
                />
              </div> : ''}
          </div>
        </div>
      </article>
    );
  }
}

ProfileSearchResult.propTypes = {
  profile: React.PropTypes.object,
  intl: intlShape.isRequired,
};

ProfileSearchResult.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ProfileSearchResult);
