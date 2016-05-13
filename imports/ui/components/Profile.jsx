import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/profiles/methods.js';
import PlayTeaser from '../components/PlayTeaser.jsx';

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
    const { profile, user, plays } = this.props;

    const editLink = user ?
      <Link
        to={`/profiles/${ profile._id }/edit`}
        key={profile._id}
        title={profile.name}
        className="edit-profile"
        activeClassName="active"
      >
        Edit
      </Link>
    : '';

    let Plays;
    if (plays && plays.length) {
      Plays = plays.map(play => (
        <li key={play._id}>
          <PlayTeaser
            play={play}
          />
        </li>
      ));
    }

    return (
      <article className="profile">
        <section className="profile-main-info">
          <h1 className="profile-name page-title">
            {profile.name}
          </h1>
          {editLink}
        </section>
        {profile.about ?
          <section className="profile-about">
            <h2>About</h2>
            {/*<div dangerouslySetInnerHTML={{__html: profile.about}} />*/}
            {profile.about}
            {editLink}
          </section> : ''
        }
        {(plays && plays.length) ?
          <section className="profile-plays">
            <h2>Primary Authorship or Playwright</h2>
            <ul>
              {Plays}
            </ul>
          </section>
          : ''
        }
      </article>
    );
  }
}

Profile.propTypes = {
  profile: React.PropTypes.object,
  user: React.PropTypes.object,
  plays: React.PropTypes.array,
  onEditingChange: React.PropTypes.func,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};
