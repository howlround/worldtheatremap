import React from 'react';
import classnames from 'classnames';
// import ListHeader from '../components/ListHeader.jsx';
// import PlayTeaser from '../components/PlayTeaser.jsx';
import Profile from '../components/Profile.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import { Link } from 'react-router';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.editing ? this.props.profile._id : null
    };
    this.onEditingChange = this.onEditingChange.bind(this);
    this.renderRelatedProfiles = this.renderRelatedProfiles.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  renderRelatedProfiles() {
    const { connections, profile } = this.props;

    let relatedProfiles = connections.map(profile => {
      return <li key={profile._id}><Link
            to={`/profiles/${ profile._id }`}
          >
            {profile.name}
          </Link></li>;
    });

    return <ul className="related-profiles">{relatedProfiles}</ul>;
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profile, user, plays, roles, connections } = this.props;
    const { editing } = this.state;

    const profilePageClass = classnames({
      'page': true,
      'profiles-show': true,
      editing,
    });

    if (!profile) {
      return (
        <NotFoundPage/>
      );
    }
    else if (editing && user) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className={profilePageClass}>
            <ProfileEdit
              profile={profile}
              onEditingChange={this.onEditingChange}
            />
          </div>
          <Link
            to={`/profiles/${ profile._id }`}
            title='Back'
            className="overlay-close"
          >
            &times;
          </Link>
        </div>
      );
    }
    else if (editing) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className="page auth">
            <Message title="Access denied" subtitle="Sign in or register to participate in the World Theatre Map"/>
            <div className="page-content">
              <AuthSignIn/>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className={profilePageClass}>
          <Profile
            profile={profile}
            user={user}
            plays={plays}
            roles={roles}
            onEditingChange={this.onEditingChange}
          />
          <h2>Related People</h2>
          { this.renderRelatedProfiles() }
        </div>

      );
    }
  }
}

ProfilePage.propTypes = {
  profile: React.PropTypes.object,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  plays: React.PropTypes.array,
  roles: React.PropTypes.array,
  connections: React.PropTypes.array,
  // loading: React.PropTypes.bool,
  // profileExists: React.PropTypes.bool,
};
