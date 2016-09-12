import React from 'react';
import { Link } from 'react-router';
import FieldWrapper from '../components/Field.jsx';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class ProfileContact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile } = this.props;
    const { formatMessage } = this.props.intl;

    let profileContactArray = new Array;
    let profileSocialArray = new Array;

    if (profile.agent || profile.phone || profile.email || profile.website) {
      profileContactArray.push(profile.agent);
      profileContactArray.push(profile.phone);
      profileContactArray.push(profile.email);
      profileContactArray.push(profile.website);
    }

    if (profileContactArray.length > 0 || profile.social) {
      return (
        <section>
          <h2>Contact Info</h2>
          <div className="content">
            { profile.agent ? <FieldWrapper content={profile.agent} className={`profile-agent`} label={
                formatMessage({
                  'id': 'profile.agentLabel',
                  'defaultMessage': 'Agent',
                  'description': 'Agent field label for the profile sidebar'
                })
              } /> : '' }
            { profile.phone ? <FieldWrapper content={profile.phone} className={`profile-phone`} label={
                formatMessage({
                  'id': 'profile.phoneLabel',
                  'defaultMessage': 'Phone',
                  'description': 'Phone field label for the profile sidebar'
                })
              } /> : '' }
            { profile.email ? <FieldWrapper content={profile.email} className={`profile-email`} label={
                formatMessage({
                  'id': 'profile.emailLabel',
                  'defaultMessage': 'Email',
                  'description': 'Email field label for the profile sidebar'
                })
              } /> : '' }
            { profile.website ? <FieldWrapper content={profile.website} className={`profile-website`} label={
                formatMessage({
                  'id': 'profile.websiteLabel',
                  'defaultMessage': 'Website',
                  'description': 'Website field label for the profile sidebar'
                })
              } /> : '' }
          </div>

          <div className="content">
            { profile.social ? <FieldWrapper content={profile.social} className={`profile-social`} /> : '' }
          </div>
        </section>
      );
    }
    else {
      return (<div/>);
    }
  }
}

ProfileContact.propTypes = {
  profile: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileContact);
