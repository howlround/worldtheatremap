import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/profiles/methods.js';
import PlayTeaser from '../components/PlayTeaser.jsx';
import ShowsByRole from '../components/ShowsByRole.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.createNewProfile = this.createNewProfile.bind(this);
    this.renderShowsByRoles = this.renderShowsByRoles.bind(this);
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

  renderShowsByRoles() {
    const { profile, roles } = this.props;

    return (
      roles.map(role => <ShowsByRole key={role} role={role} profile={profile} />)
    );
  }

  render() {
    const { profile, user, plays, roles } = this.props;

    const editLink = user ?
      <Link
        to={`/profiles/${ profile._id }/edit`}
        key={profile._id}
        title={profile.name}
        className="edit-link"
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
      <article className="profile full">
        <section>
          <h1 className="profile-name page-title">
            {profile.name}
          </h1>
          <div className="profile-main-info">
            { profile.foundingYear ?
              <div className="profile-founding-year">Founded { profile.foundingYear }</div> : '' }
          </div>
          {editLink}
        </section>
        { profile.about ?
          <section className="profile-about">
            <h2>About</h2>
            {/*<div dangerouslySetInnerHTML={{__html: profile.about}} />*/}
            {profile.about}
            {editLink}
          </section> : ''
        }
        { (plays && plays.length) ?
          <section className="profile-plays">
            <h2>Primary Authorship or Playwright</h2>
            <ul>
              {Plays}
            </ul>
          </section>
          : ''
        }
        { roles ? this.renderShowsByRoles() : '' }
      </article>
    );
  }
}

Profile.propTypes = {
  profile: React.PropTypes.object,
  user: React.PropTypes.object,
  plays: React.PropTypes.array,
  roles: React.PropTypes.array,
  onEditingChange: React.PropTypes.func,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};
