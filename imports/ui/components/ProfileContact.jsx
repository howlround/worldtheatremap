import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';

import FieldWrapper from '../components/FieldWrapper.jsx';

marked.setOptions({
  tables: false,
});

class ProfileContact extends React.Component {
  constructor(props) {
    super(props);

    this.renderExternalLink = this.renderExternalLink.bind(this);
  }

  renderExternalLink() {
    const { profile } = this.props;
    if (profile.website && typeof profile.website === 'string') {
      const stripHttpExp = RegExp('^(https?:|)\/\/');
      const aboutRaw = profile.website;
      const aboutText = aboutRaw.replace(stripHttpExp, '');
      const aboutLink = <a href={`http://${aboutText}`} target="_blank">{aboutText}</a>;

      return aboutLink;
    }
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

    if (profile.facebook || profile.twitter || profile.instagram || profile.social) {
      profileSocialArray.push(profile.agent);
      profileSocialArray.push(profile.twitter);
      profileSocialArray.push(profile.instagram);
      profileSocialArray.push(profile.social);
    }

    const messages = defineMessages({
      agentLabel: {
        'id': 'profile.agentLabel',
        'defaultMessage': 'Agent',
        'description': 'Agent field label for the profile sidebar'
      },
      phoneLabel: {
        'id': 'profile.phoneLabel',
        'defaultMessage': 'Phone',
        'description': 'Phone field label for the profile sidebar'
      },
      emailLabel: {
        'id': 'profile.emailLabel',
        'defaultMessage': 'Email',
        'description': 'Email field label for the profile sidebar'
      },
    });

    if (profileContactArray.length > 0 || profileSocialArray.length > 0) {
      return (
        <section className="profile-contact">
          <h2>
            <FormattedMessage
              id="profilePage.contactInfoHeader"
              description="Header for contact info on the profile page sidebar"
              defaultMessage="Contact Info"
          />
          </h2>
          {profileContactArray.length > 0 ?
            <div className="content">
              {profile.agent ?
                <FieldWrapper
                  content={profile.agent}
                  className={`profile-agent`}
                  label={formatMessage(messages.agentLabel)}
                /> : ''}
              {profile.phone ?
                <FieldWrapper
                  content={profile.phone}
                  className={`profile-phone`}
                  label={
                  formatMessage(messages.phoneLabel)}
                /> : ''}
              {profile.email ?
                <FieldWrapper
                  content={profile.email}
                  className={`profile-email`}
                  label={formatMessage(messages.emailLabel)}
                /> : ''}
              {profile.website ?
                this.renderExternalLink()
              : ''}
            </div>
            : ''
          }

          {profileSocialArray.length > 0 ?
            <div className="content">
              {profile.facebook ?
                <a href={`https://${profile.facebook}`} target="_blank" className="profile-facebook social-link">
                  <FormattedMessage
                    id="forms.facebookLabel"
                    description="Label for the facebook form field"
                    defaultMessage="Facebook"
                  />
                </a>
                : ''}
              {profile.twitter ?
                <a href={`https://twitter.com/${profile.twitter}`} target="_blank" className="profile-twitter social-link">
                  @{profile.twitter}
                </a>
                : ''}
              {profile.instagram ?
                <a href={`https://instagram.com/${profile.instagram}`} target="_blank" className="profile-instagram social-link">
                  @{profile.instagram}
                </a>
                : ''}
              {profile.social ?
                <div className="profile-social">
                  <div dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(profile.social))}} />
                </div>
                : ''}
            </div>
            : ''
          }
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
