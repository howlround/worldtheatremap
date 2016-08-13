import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import { displayError } from '../helpers/errors.js';
import { updateImage } from '../../api/profiles/methods.js';
import PlayTeaser from '../components/PlayTeaser.jsx';
import ShowsByRole from '../components/ShowsByRole.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      uploading: false,
      newImageLoaded: false,
    };

    this.renderShowsByRoles = this.renderShowsByRoles.bind(this);
    this.renderPhotoAndUploader = this.renderPhotoAndUploader.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    const { profile } = this.props;

    this.setState({ newImageLoaded: false});

    //Upload file using Slingshot Directive
    let uploader = new Slingshot.Upload( "myFileUploads");

    uploader.send( files[0], ( error, url ) => {

      computation.stop(); //Stop progress tracking on upload finish
      if ( error ) {
        this.setState({ progress: 0}); //reset progress state
      } else {
        // Save the image url string to the profile
        const newImage = {
          profileId: profile._id,
          image: url
        }
        updateImage.call(
          newImage
        , displayError);

        this.setState({ newImageLoaded: true});
      }
    });

    //Track Progress
    let computation = Tracker.autorun(() => {
      if(!isNaN(uploader.progress())) {
        const progressNumber = Math.floor(uploader.progress() * 100);
        this.setState({ progress: progressNumber });

        if (progressNumber > 0 && progressNumber < 100) {
          this.setState({ uploading: true });
        }
        else {
          this.setState({ uploading: false });
        }
      }
    });
  }

  renderShowsByRoles() {
    const { profile, roles } = this.props;

    return (
      roles.map(role => <ShowsByRole key={role} role={role} profile={profile} />)
    );
  }

  renderPhotoAndUploader() {
    const { progress, uploading, newImageLoaded } = this.state;
    const { profile, user } = this.props;

    if (Meteor.user()) {
      return (
        <div className="profile-image-wrapper">
          <Dropzone onDrop={this.onDrop}>
            { profile.image ?
              <img className="profile-image" width="200px" height="200px" src={ profile.image } />
              : <div>Try dropping some files here, or click to select files to upload.</div> }
          </Dropzone>
          { uploading ?
            <div className="profile-image-uploading">Uploading: { progress }% Complete</div> : '' }
          { (uploading == false && progress == 100 && newImageLoaded == false) ?
            <div className="profile-image-uploading">Almost done...</div> : '' }
        </div>
      );
    }
    else if (profile.image) {
      return (
        <img className="profile-image" width="200px" height="200px" src={ profile.image } />
      );
    }
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

    const interests = (profile.interests) ? profile.interests.map((interest, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        }
        else {
          seperator = ' and ';
        }
      }
      return <span key={interest}>{interest}{seperator}</span>
    }) : false;

    let orgTypes = (profile.orgTypes) ? profile.orgTypes.map((orgType, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        }
        else {
          seperator = ' and ';
        }
      }
      return <span key={orgType}>{orgType}{seperator}</span>
    }) : false;

    return (
      <article className="profile full">
        <section>

          { this.renderPhotoAndUploader() }
          <h1 className="profile-name page-title">
            {profile.name}
          </h1>
          { typeof locationBlock != 'undefined' ?
              <div className="profile-location">{ locationBlock }</div> : '' }
          <div className="profile-metadata">
            { profile.orgTypes ?
              <div className="profile-organization-types">{ orgTypes }</div> : '' }
            { profile.foundingYear ?
              <div className="profile-founding-year">Founded { profile.foundingYear }</div> : '' }
            { profile.interests ?
              <div className="profile-interests">{ interests }</div> : '' }
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
