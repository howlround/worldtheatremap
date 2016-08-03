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

    if (profile.agent) {
      profileContactArray.push(profile.agent);
      profileContactArray.push(profile.agent);
    }

    if (profileContactArray.length > 0) {
      return (
        <section>
          <h2>Contact Info</h2>
          <div className="content">
            { profile.agent ? <FieldWrapper label={`Agent `} content={profile.agent} /> : '' }
            { profile.phone ? <FieldWrapper label={`Phone `} content={profile.phone} /> : '' }
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
