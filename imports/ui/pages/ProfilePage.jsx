import React from 'react';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import Profile from '../components/Profile.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profile } = this.props;
    const { editing } = this.state;

    return (
      <div className="page profiles-show">
        {/*<ProfileHeader profile={profile}/>*/}
        {profile ?
          <Profile profile={profile}/> : <NotFoundPage/>}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: React.PropTypes.object,
  // loading: React.PropTypes.bool,
  // profileExists: React.PropTypes.bool,
};
