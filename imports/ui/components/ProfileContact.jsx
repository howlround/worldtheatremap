import React from 'react';
import { Link } from 'react-router';
import FieldWrapper from '../components/Field.jsx';

export default class ProfileContact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile } = this.props;

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
            { profile.agent ? <FieldWrapper label={`Agent`} content={profile.agent} className={`profile-agent`} /> : '' }
            { profile.phone ? <FieldWrapper label={`Phone`} content={profile.phone} className={`profile-phone`} /> : '' }
            { profile.email ? <FieldWrapper label={`Email`} content={profile.email} className={`profile-email`} /> : '' }
            { profile.website ? <FieldWrapper label={`Website`} content={profile.website} className={`profile-website`} /> : '' }
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
};
