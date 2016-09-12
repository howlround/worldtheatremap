import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
import { display } from '../helpers/errors.js';
import { FormattedMessage } from 'react-intl';
import { updateImage } from '../../api/profiles/methods.js';
import ShowTeaser from '../components/ShowTeaser.jsx';
import ShowsByRole from '../components/ShowsByRole.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      uploading: false,
      uploadError: false,
      newImageLoaded: false,
      uploadAttempts: 0,
    };

    this.renderShowsByRoles = this.renderShowsByRoles.bind(this);
    this.renderPhotoAndUploader = this.renderPhotoAndUploader.bind(this);
    this.checkResizedImage = this.checkResizedImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  checkResizedImage(src) {
    const { profile } = this.props;
    const { uploadAttempts } = this.state;

    const originalSrc = src;
    const resizedImageSrc = src.replace('https://wtm-dev-images', 'https://wtm-dev-images-resized');

    const cycleTime = 1000;

    let img = new Image();
    img.onload = function() {
      // code to set the src on success
      const newImage = {
        profileId: profile._id,
        image: originalSrc
      }
      updateImage.call(
        newImage
      , display);

      // Reset the upload counter in case the user tries again
      this.setState({ uploadAttempts: 0 });

      // Remove the Almost done... message
      this.setState({ newImageLoaded: true});
    };

    img.onload = img.onload.bind(this);
    img.onerror = function() {
      const nextAttempt = uploadAttempts + 1;
      this.setState({ uploadAttempts: nextAttempt });
      // doesn't exist or error loading
      if (uploadAttempts < 10) {
        setTimeout(() => {
          this.checkResizedImage(originalSrc);
        }, cycleTime, originalSrc);
      }
      else {
        this.setState({ uploadError: true });
      }
    };
    img.onerror = img.onerror.bind(this);

    img.src = resizedImageSrc; // fires off loading of image
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
        this.setState({ uploadError: true });
      } else {
        // Wait until the Lambda script has finished resizing
        this.checkResizedImage(url);
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
    const { progress, uploading, newImageLoaded, uploadError } = this.state;
    const { profile, user } = this.props;
    const DropzoneStyleOverride = {};
    const targetClasses = classNames('dropzone-target', {
      'existing-image': profile.imageWide,
      'empty-image': !profile.imageWide
    });

    if (Meteor.user()) {
      return (
        <div className="profile-image-wrapper">
          <Dropzone onDrop={this.onDrop} style={DropzoneStyleOverride} className={targetClasses} activeClassName="dropzone-target-active">
            { profile.imageWide ?
              <img className="profile-image" width="200px" height="200px" src={ profile.imageWide } />
              : '' }
            <div className="dropzone-help-text">
              <FormattedMessage
                id="profile.imageDropHelpText"
                description='Help text for adding an image to a profile'
                defaultMessage='To upload a new photo click or drag a photo here.'
              />
            </div>
          </Dropzone>
          { uploading ?
            <div className="profile-image-uploading">Uploading: { progress }%</div> : '' }
          { (uploading == false && progress == 100 && newImageLoaded == false && uploadError == false) ?
            <div className="profile-image-uploading">Almost done...</div> : '' }
          { (uploadError == true) ?
            <div className="profile-image-uploading error">
              <FormattedMessage
                id="profile.imageUploadingError"
                description='Help text when there is an error uploading an image to a profile'
                defaultMessage='There was an error, please try again'
              />
            </div> : '' }
        </div>
      );
    }
    else if (profile.imageWide) {
      return (
        <div className="profile-image-wrapper">
          <img className="profile-image" width="200px" height="200px" src={ profile.imageWide } />
        </div>
      );
    }
  }

  render() {
    const { profile, user, shows, roles } = this.props;

    const editLink = (user) ?
      <Link
        to={`/profiles/${ profile._id }/edit`}
        key={`${profile._id}-edit`}
        title={`Edit ${profile.name}`}
        className="edit-link"
      >
        <FormattedMessage
          id="ui.edit"
          description='Generic edit link'
          defaultMessage='Edit'
        />
      </Link>
    : '';

    const translateLink = (user && TAPi18n.getLanguage() === 'en') ?
      <Link
        to={`/profiles/${ profile._id }/translate/es`}
        key={`${profile._id}-translate`}
        title={`Translate ${profile.name}`}
        className="translate-link"
      >
        <FormattedMessage
          id="ui.translate"
          description='Generic translate link'
          defaultMessage='Translate'
        />
      </Link>
    : '';

    let Shows;
    if (shows && shows.length) {
      Shows = shows.map(show => (
        <li key={show._id}>
          <ShowTeaser
            show={show}
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
      return (<span key={interest}>{interest}{seperator}</span>);
    }) : false;

    let orgTypes = (profile.orgTypes) ? profile.orgTypes.map((orgType, index, array) => {
      let seperator = ', ';
      if (index === array.length - 1) {
        seperator = '';
      } else if (index === array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        } else {
          seperator = ' and ';
        }
      }
      return (<span key={orgType}>{orgType}{seperator}</span>);
    }) : false;

    let selfDefinedRoles = (profile.selfDefinedRoles) ?
      profile.selfDefinedRoles.map((selfDefinedRole, index, array) => {
        let seperator = ', ';
        if (index === array.length - 1) {
          seperator = '';
        } else if (index === array.length - 2) {
          if (array.length > 2) {
            seperator = ', and ';
          } else {
            seperator = ' and ';
          }
        }
        return (<span key={selfDefinedRole}>{selfDefinedRole}{seperator}</span>);
      }) : false;

    let genders = (profile.gender) ? profile.gender.map((gender, index, array) => {
      let seperator = ', ';
      if (index === array.length - 1) {
        seperator = '';
      } else if (index === array.length - 2) {
        if (array.length > 2) {
          seperator = ', and ';
        } else {
          seperator = ' and ';
        }
      }
      return (<span key={gender}>{gender}{seperator}</span>);
    }) : false;

    const cityState = [
      profile.locality,
      profile.administrativeArea,
    ].filter((val) => val).join(', ');
    const locationBlock = (<div className="profile-location">
      {cityState ? <div>{cityState}</div> : ''}
      {profile.country ? <div className="profile-country">{profile.country}</div> : ''}</div>);

    return (
      <article className="profile full">
        <section>

          {this.renderPhotoAndUploader()}
          <div className="profile-content-wrapper">
            <h1 className="profile-name page-title">
              {profile.name}
            </h1>
            {typeof locationBlock !== 'undefined' ?
                <div className="profile-location">{locationBlock}</div> : ''}
            <div className="profile-metadata metadata">
              {!_.isEmpty(profile.selfDefinedRoles) ?
                <div className="profile-roles" title="Roles">{selfDefinedRoles}</div> : ''}
              {!_.isEmpty(profile.gender) ?
                <div className="profile-gender" title="Gender">{genders}</div> : ''}
              {!_.isEmpty(profile.orgTypes) ?
                <div
                  className="profile-organization-types"
                  title="Organization Type"
                >
                  {orgTypes}
                </div> : ''}
              {!_.isEmpty(profile.foundingYear) ?
                <div className="profile-founding-year">
                  <FormattedMessage
                    id="profile.foundedDate"
                    description="Founded date metadata"
                    defaultMessage={`Founded {foundingYear}`}
                    values={{ foundingYear: profile.foundingYear }}
                  />
                </div> : ''}
              {!_.isEmpty(profile.interests) ?
                <div className="profile-interests" title="Interests">{interests}</div> : ''}
            </div>
          </div>
          {editLink || translateLink ?
            <div className="edit-links">
              {editLink}
              {translateLink}
            </div>
            : ''
          }
        </section>
        {profile.about ?
          <section className="profile-about">
            <h2>
              <FormattedMessage
                id="profile.aboutSectionHeader"
                description="Section header for the profile about section"
                defaultMessage="About"
              />
            </h2>
            {/* <div dangerouslySetInnerHTML={{__html: profile.about}} /> */}
            {profile.about}
            {editLink || translateLink ?
              <div className="edit-links">
                {editLink}
                {translateLink}
              </div>
              : ''
            }
          </section> : ''
        }
        {(shows && shows.length) ?
          <section className="profile-shows">
            <h2>
              <FormattedMessage
                id="profile.primaryAuthorship"
                description="Section header for show for which this user is the primary author"
                defaultMessage="Primary Authorship or Playwright"
              />
            </h2>
            <ul>
              {Shows}
            </ul>
          </section>
          : ''
        }
        {roles ? this.renderShowsByRoles() : ''}
      </article>
    );
  }
}

Profile.propTypes = {
  profile: React.PropTypes.object,
  user: React.PropTypes.object,
  shows: React.PropTypes.array,
  roles: React.PropTypes.array,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};
