import React from 'react';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingTodo: null,
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editingTodo: editing ? id : null,
    });
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profile } = this.props;
    const { editingTodo } = this.state;

    return (
      <div className="page profiles-show">
        {/*<ProfileHeader profile={profile}/>*/}
        {profile ?
          <h1 className="profile-name page-title">{profile.name}</h1> : <NotFoundPage/>}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: React.PropTypes.object,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
};
