import { Meteor } from 'meteor/meteor';
import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

// Components
import ShowTeaser from '../components/ShowTeaser.jsx';
import ShowsByRole from '../components/ShowsByRole.jsx';
import HowlRoundPosts from '../components/HowlRoundPosts.jsx';
import ProfileMainFields from '../components/ProfileMainFields.jsx';

// Containers
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

// API
import { updateImage } from '../../api/profiles/methods.js';
import { remove } from '../../api/affiliations/methods.js';
import { remove as removeFestivalAffiliation } from '../../api/festivalOrganizers/methods.js';

marked.setOptions({
  tables: false,
});

class Profile extends React.Component {
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
    this.removeAffiliation = this.removeAffiliation.bind(this);
    this.renderAffiliatedProfiles = this.renderAffiliatedProfiles.bind(this);
    this.renderFestivalProfiles = this.renderFestivalProfiles.bind(this);
    this.renderPhotoAndUploader = this.renderPhotoAndUploader.bind(this);
    this.checkResizedImage = this.checkResizedImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.setState({ newImageLoaded: false });

    // Upload file using Slingshot Directive
    const uploader = new Slingshot.Upload('myFileUploads');

    // Track Progress
    const computation = Tracker.autorun(() => {
      if (!isNaN(uploader.progress())) {
        const progressNumber = Math.floor(uploader.progress() * 100);
        this.setState({ progress: progressNumber });

        if (progressNumber > 0 && progressNumber < 100) {
          this.setState({ uploading: true });
        } else {
          this.setState({ uploading: false });
        }
      }
    });

    uploader.send(files[0], (error, url) => {
      computation.stop(); // Stop progress tracking on upload finish
      if (error) {
        this.setState({ progress: 0 }); // reset progress state
        this.setState({ uploadError: true });
      } else {
        // Wait until the Lambda script has finished resizing
        this.checkResizedImage(url);
      }
    });
  }

  checkResizedImage(src) {
    const { profile } = this.props;
    const { uploadAttempts } = this.state;

    const originalSrc = src;
    const resizedImageSrc = src.replace(`https://${Meteor.settings.AWSSourceBucket}`, `https://${Meteor.settings.AWSTargetBucket}`);

    const cycleTime = 1000;

    const img = new Image();
    img.onload = function () {
      // code to set the src on success
      const newImage = {
        profileId: profile._id,
        image: originalSrc,
      };
      updateImage.call(
        newImage
      , displayError);

      // Reset the upload counter in case the user tries again
      this.setState({ uploadAttempts: 0 });

      // Remove the Almost done... message
      this.setState({ newImageLoaded: true });
    };

    img.onload = img.onload.bind(this);
    img.onerror = function () {
      const nextAttempt = uploadAttempts + 1;
      this.setState({ uploadAttempts: nextAttempt });
      // doesn't exist or error loading
      if (uploadAttempts < 10) {
        setTimeout(() => {
          this.checkResizedImage(originalSrc);
        }, cycleTime, originalSrc);
      } else {
        this.setState({ uploadError: true });
      }
    };
    img.onerror = img.onerror.bind(this);

    img.src = resizedImageSrc; // fires off loading of image
  }

  removeAffiliation(affiliationId, event) {
    event.preventDefault();

    remove.call({
      affiliationId,
    }, displayError);
  }

  removeFestivalAffiliation(festivalOrganizerId, event) {
    event.preventDefault();

    removeFestivalAffiliation.call({
      festivalOrganizerId,
    }, displayError);
  }

  renderPhotoAndUploader() {
    const { progress, uploading, newImageLoaded, uploadError } = this.state;
    const { profile, user } = this.props;
    const DropzoneStyleOverride = {};
    const targetClasses = classNames('dropzone-target', {
      'existing-image': profile.imageWide,
      'empty-image': !profile.imageWide,
    });

    if (user) {
      return (
        <div className="profile-image-wrapper">
          <Dropzone
            onDrop={this.onDrop}
            style={DropzoneStyleOverride}
            className={targetClasses}
            activeClassName="dropzone-target-active"
          >
            {profile.imageWide ?
              <img className="profile-image" src={profile.imageWide} />
              : ''}
            <div className="dropzone-help-text">
              <FormattedMessage
                id="profile.imageDropHelpText"
                description="Help text for adding an image to a profile"
                defaultMessage="To upload a new photo click or drag a photo here."
              />
            </div>
          </Dropzone>
          {uploading ?
            <div className="profile-image-uploading">Uploading: {progress}%</div> : ''}
          {(uploading === false &&
            progress === 100 &&
            newImageLoaded === false &&
            uploadError === false) ?
            <div className="profile-image-uploading">Almost done...</div> : ''}
          {(uploadError === true) ?
            <div className="profile-image-uploading error">
              <FormattedMessage
                id="profile.imageUploadingError"
                description="Help text when there is an error uploading an image to a profile"
                defaultMessage="There was an error, please try again"
              />
            </div> : ''}
        </div>
      );
    } else if (profile.imageWide) {
      return (
        <div className="profile-image-wrapper">
          <img className="profile-image" src={profile.imageWide} />
        </div>
      );
    } else {
      return '';
    }
  }

  renderShowsByRoles() {
    const { profile, roles, eventsByShowByRole } = this.props;

    return (
      roles.map(role => (
        <ShowsByRole
          key={role}
          role={role}
          profile={profile}
          eventsByShow={eventsByShowByRole[role]}
        />
      ))
    );
  }

  renderAffiliatedProfiles() {
    const { affiliatedProfiles, user } = this.props;
    const { locale } = this.props.intl;

    let affiliatedProfilesList = affiliatedProfiles.map(affiliation => (
      <li key={affiliation.profile._id}>
        <ProfileNameContainer profileId={affiliation.profile._id} />
        {user ?
          <a
            href="#"
            className="delete-affiliation"
            onClick={this.removeAffiliation.bind(this, affiliation._id)}
            title="Delete affiliation"
          >
            &times;
          </a>
        : ''}
      </li>
    ));

    return <ul className="affiliated-profiles">{affiliatedProfilesList}</ul>;
  }

  renderFestivalProfiles() {
    const { festivalProfiles, user } = this.props;
    const { locale } = this.props.intl;

    let festivalProfilesList = festivalProfiles.map(festival => (
      <li key={festival.profile._id}>
        <h3>
          <ProfileNameContainer profileId={festival.profile._id} />
        </h3>
        {user ?
          <a
            href="#"
            className="delete-affiliation"
            onClick={this.removeFestivalAffiliation.bind(this, festival._id)}
            title="Delete festival affiliation"
          >
            &times;
          </a>
        : ''}
      </li>
    ));

    return <ul className="affiliated-festivals">{festivalProfilesList}</ul>;
  }

  render() {
    const {
      profile,
      user,
      showsForAuthor,
      showsForOrg,
      eventsByShowByOrg,
      roles,
      affiliatedProfiles,
      festivalProfiles,
    } = this.props;
    const { formatMessage, locale } = this.props.intl;

    const editLink = (user) ?
      <Link
        to={{
          pathname: `/${locale}/profiles/${profile._id}/edit`,
          query: {
            '_escaped_fragment_': '',
          },
        }}
        key={`${profile._id}-edit`}
        title={`Edit ${profile.name}`}
        className="edit-link"
      >
        <FormattedMessage
          id="ui.edit"
          description="Generic edit link"
          defaultMessage="Edit"
        />
      </Link>
    : '';

    let Shows;
    if (showsForAuthor && showsForAuthor.length) {
      Shows = showsForAuthor.map((show, index) => {
        const showOrderClass = {
          'first-item': index === 0,
        }
        return (
          <li key={show._id} className={classNames('profile-show', showOrderClass)}>
            <ShowTeaser
              show={show}
              defaultOpen
            />
          </li>
        );
      });
    }

    let ShowsByOrg;
    if (showsForOrg && Object.keys(showsForOrg).length) {
      ShowsByOrg = Object.keys(showsForOrg).map((key, index) => {
        const show = showsForOrg[key].show;
        const showOrderClass = {
          'first-item': index === 0,
        }
        return (
          <li key={show._id} className={classNames('profile-show', showOrderClass)}>
            <ShowTeaser
              show={show}
              eventsByShow={showsForOrg[key].events}
              defaultOpen
            />
          </li>
        );
      });
    }

    return (
      <article className="profile full">
        <section>
          {this.renderPhotoAndUploader()}
          <ProfileMainFields profile={profile} />
          {editLink ?
            <div className="edit-links">
              {editLink}
            </div>
            : ''
          }
        </section>
        {!_.isEmpty(profile.about) ?
          <section className="profile-about">
            <h2>
              <FormattedMessage
                id="profile.aboutSectionHeader"
                description="Section header for the profile about section"
                defaultMessage="About"
              />
            </h2>
            <div
              className="markdown-formatted"
              dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(profile.about))}}
            />
            {editLink ?
              <div className="edit-links">
                {editLink}
              </div>
              : ''
            }
            {!_.isEmpty(profile.source) && profile.source !== locale ?
              <div className="machine-translation-warning">
                <FormattedMessage
                  id="translation.possibleMachineTranslationWarning"
                  description="Text informing user that the text was possibly machine translated"
                  defaultMessage="This text was written in another language and was originally machine translated. If you would like to make improvements to the translation please edit this page."
                />
              </div> : ''
            }
          </section> : ''
        }
        {(festivalProfiles && festivalProfiles.length > 0) ?
          <section className="profile-festival-profiles">
            <h2>
              <FormattedMessage
                id="profile.festivalProfilesHeader"
                description="Header for festival profiles"
                defaultMessage="Festivals"
              />
            </h2>
            <div className="content">
              {this.renderFestivalProfiles()}
            </div>
          </section> : ''}
        {(showsForAuthor && showsForAuthor.length) ?
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
        {(showsForOrg && Object.keys(showsForOrg).length) ?
          <section className="profile-shows">
            <h2>
              <FormattedMessage
                id="show.history"
                description="Section header for show for which this profile is the local organization"
                defaultMessage="Show History"
              />
            </h2>
            <ul>
              {ShowsByOrg}
            </ul>
          </section>
          : ''
        }
        {roles ? this.renderShowsByRoles() : ''}
        {(affiliatedProfiles && affiliatedProfiles.length > 0) ?
          <section className="profile-affiliated-profiles">
            <h2>
              <FormattedMessage
                id="profile.affiliatedProfilesHeader"
                description="Header for affiliated profiles"
                defaultMessage="Members"
              />
            </h2>
            <div className="content">
              {this.renderAffiliatedProfiles()}
            </div>
          </section> : ''}
        {!_.isEmpty(profile.howlroundPostSearchText) ?
          <HowlRoundPosts
            searchText={profile.howlroundPostSearchText}
            existingPosts={profile.savedHowlroundPosts}
            _id={profile._id}
            url={profile.howlroundPostsUrl}
          />
          : ''
        }
      </article>
    );
  }
}

Profile.propTypes = {
  profile: React.PropTypes.object,
  user: React.PropTypes.object,
  showsForAuthor: React.PropTypes.array,
  showsForOrg: React.PropTypes.array,
  eventsByShowByOrg: React.PropTypes.array,
  eventsByShowByRole: React.PropTypes.array,
  roles: React.PropTypes.array,
  affiliatedProfiles: React.PropTypes.array,
  festivalProfiles: React.PropTypes.array,
  intl: intlShape.isRequired,
};

Profile.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(Profile);
