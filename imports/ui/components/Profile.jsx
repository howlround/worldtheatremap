import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/profiles/methods.js';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.createNewProfile = this.createNewProfile.bind(this);
  }

  createNewProfile() {
    const { router } = this.context;
    const listId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create list.');
      }
    });
    router.push(`/profiles/${ listId }`);
  }

  render() {
    const { profiles } = this.props;
    return (
      <div className="list-todos">
        <a className="link-list-new" onClick={this.createNewProfile}>
          <span className="icon-plus"></span>
          New Profile
        </a>
        {profiles.map(list => (
          <Link
            to={`/profiles/${ list._id }`}
            key={list._id}
            title={list.name}
            className="list-todo"
            activeClassName="active"
          >
            {list.userId
              ? <span className="icon-lock"></span>
              : null}
            {list.incompleteCount
              ? <span className="count-list">{list.incompleteCount}</span>
              : null}
            {list.name}
          </Link>
        ))}
      </div>
    );
  }
}

Profile.propTypes = {
  profiles: React.PropTypes.array,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};
