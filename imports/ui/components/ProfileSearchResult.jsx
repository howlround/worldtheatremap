import React from 'react';
import classnames from 'classnames';
import { includes, isEmpty, isNil } from 'lodash';
import { FormattedMessage, FormattedDate, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Components
import Interests from '../components/Interests.jsx';
import OrgTypes from '../components/OrgTypes.jsx';
import SelfDefinedRoles from '../components/SelfDefinedRoles.jsx';

class ProfileSearchResult extends React.Component {
  renderImage() {
    const { profile } = this.props;
    let output = '';

    if (profile.imageWide) {
      output = (
        <img
          className="profile-image"
          width="100px"
          height="100px"
          src={profile.imageWide}
        />
      );
    }

    return output;
  }

  render() {
    const { profile } = this.props;
    const { locale } = this.props.intl;

    const interests = (profile.interests) ?
      <Interests interests={profile.interests} />
      : false;

    let orgTypes = (
      profile.orgTypes &&
      includes(profile.profileType, 'Organization')
    ) ?
      <OrgTypes orgTypes={profile.orgTypes} />
      : false;

    let selfDefinedRoles = (
      profile.selfDefinedRoles &&
      includes(profile.profileType, 'Individual')
    ) ?
      <SelfDefinedRoles roles={profile.selfDefinedRoles} />
      : false;

    const locationBlock = [
      profile.locality,
      profile.administrativeArea,
      profile.country,
    ].filter(val => (val)).join(', ');

    const classNames = classnames('profile-content-wrapper', {
      'profile-with-image': !isNil(profile.imageWide),
    });

    return (
      <article className="profile search-result">
        {profile.imageWide ? this.renderImage() : ''}
        <div className={classNames}>
          <Link
            to={`/${locale}/profiles/${profile._id}`}
            title={profile.name}
            className="profile-name"
            activeClassName="active"
          >
            {profile.name}
          </Link>
          <div className="profile-metadata metadata">
            {!isEmpty(locationBlock) ?
              <div className="profile-location">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.locationLabel"
                    description="Location label profile search result metadata"
                    defaultMessage="Location"
                  />:
                </span> {locationBlock}
              </div> : ''}
            {(
              !isEmpty(profile.selfDefinedRoles) &&
              includes(profile.profileType, 'Individual')
            ) ?
              <div className="profile-roles" title="Roles">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.rolesLabel"
                    description="Roles label profile search result metadata"
                    defaultMessage="Roles"
                  />:
                </span> {selfDefinedRoles}
              </div> : ''}
            {(!isEmpty(profile.orgTypes) && includes(profile.profileType, 'Organization')) ?
              <div className="profile-organization-types" title="Organization Type">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.orgTypesLabel"
                    description="Organization Types label profile search result metadata"
                    defaultMessage="Organization Types"
                  />:
                </span> {orgTypes}
              </div> : ''}
            {!isEmpty(profile.interests) ?
              <div className="profile-interests" title="Interests">
                <span className="profile-metadata-label">
                  <FormattedMessage
                    id="profileSearchResult.interestsLabel"
                    description="Interests label profile search result metadata"
                    defaultMessage="Interests"
                  />:
                </span> {interests}</div> : ''}
            {(profile.startDate && profile.endDate && includes(profile.profileType, 'Festival')) ?
              <div className="profile-date-range date">
                <FormattedDate
                  value={profile.startDate}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
                <span> – </span>
                <FormattedDate
                  value={profile.endDate}
                  year="numeric"
                  month="short"
                  day="numeric"
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
