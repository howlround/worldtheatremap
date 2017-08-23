import { Meteor } from 'meteor/meteor';
import React from 'react';

// Utilities
import classnames from 'classnames';
import Helmet from 'react-helmet';
import topojson from 'topojson';
import { _ } from 'meteor/underscore';
import { get } from 'lodash';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import { Link } from 'react-router';
import { OutboundLink } from 'react-ga';
import { select, queue, json } from 'd3';

// Forms
import t from 'tcomb-form';

// Containers
import ProfileNameContainer from '../containers/ProfileNameContainer.jsx';

// Components
import Profile from '../components/Profile.jsx';
import ProfileContact from '../components/ProfileContact.jsx';
import Loading from '../components/Loading.jsx';

// Pages
import NotFoundPage from '../pages/NotFoundPage.jsx';

// API
import { upsert, remove } from '../../api/affiliations/methods.js';
import {
  upsert as upsertFestivalOrganizer,
  remove as removeFestivalOrganizer
} from '../../api/festivalOrganizers/methods.js';
import { affiliationFormSchema, defaultFormOptions } from '../../api/affiliations/affiliations.js';
import { festivalOrganizerFormSchema, defaultFormOptions as festivalOrganizerFormOptions } from '../../api/festivalOrganizers/festivalOrganizers.js';
import {
  requestRemoval as requestProfileRemoval,
  denyRemoval as denyProfileRemoval,
  remove as approveProfileRemoval,
} from '../../api/profiles/methods.js';

const Form = t.form.Form;

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      affiliation: {
        profile: {},
      },
      festivalOrganizer: {
        profile: {},
      },
    };

    this.throttledAffiliationAdd = _.throttle(newParent => {
      if (newParent) {
        // Create Affiliation record
        const parent = newParent.profile;
        const newAffiliation = {
          profile: {
            _id: this.props.profile._id,
            name: this.props.profile.name,
          },
        };

        const newID = upsert.call({
          newAffiliation,
          parent,
        }, displayError);

        return newID;
      }
    }, 300);

    this.throttledFestivalAdd = _.throttle(newParent => {
      if (newParent) {
        // Create Festival Organizer record
        const parent = newParent.profile;
        const newFestivalOrganizer = {
          profile: {
            _id: this.props.profile._id,
            name: this.props.profile.name,
            startDate: this.props.profile.startDate,
          },
        };

        const newID = upsertFestivalOrganizer.call({
          newFestivalOrganizer,
          parent,
        }, displayError);

        return newID;
      }
    }, 300);

    this.throttledRemoveProfile = _.throttle(profileId => {
      if (profileId) {
        requestProfileRemoval.call({
          profileId,
        }, displayError);

        return true;
      }
    }, 300);

    this.affiliationHandleSubmit = this.affiliationHandleSubmit.bind(this);
    this.festivalHandleSubmit = this.festivalHandleSubmit.bind(this);
    this.confirmRequestRemoval = this.confirmRequestRemoval.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.denyDelete = this.denyDelete.bind(this);
    this.affiliationOnChange = this.affiliationOnChange.bind(this);

    this.renderRelatedProfiles = this.renderRelatedProfiles.bind(this);

    this.renderAffiliations = this.renderAffiliations.bind(this);
    this.renderAddAffiliationForm = this.renderAddAffiliationForm.bind(this);
    this.removeAffiliation = this.removeAffiliation.bind(this);

    this.festivalOnChange = this.festivalOnChange.bind(this);
    this.renderFestivalOrganizers = this.renderFestivalOrganizers.bind(this);
    this.renderAddFestivalOrganizerForm = this.renderAddFestivalOrganizerForm.bind(this);
    this.removeFestivalOrganizer = this.removeFestivalOrganizer.bind(this);

    this.initializeD3Globe = this.initializeD3Globe.bind(this);
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  componentDidUpdate(prevProps) {
    if (get(this.props, 'profile.lat') && get(this.props, 'profile.lon')) {
      this.initializeD3Globe();
    }
  }

  affiliationOnChange(value) {
    this.setState({ affiliation: value });
  }

  festivalOnChange(value) {
    this.setState({ festivalOrganizer: value });
  }

  affiliationHandleSubmit(event) {
    event.preventDefault();
    const newParent = this.refs.affiliationForm.getValue();
    if (newParent) {
      const newID = this.throttledAffiliationAdd(newParent);

      if (newID) {
        this.setState({
          affiliation: {
            profile: {},
          },
        });
      }
    }
  }

  festivalHandleSubmit(event) {
    event.preventDefault();
    const newParent = this.refs.festivalOrganizerForm.getValue();
    if (newParent) {
      const newID = this.throttledFestivalAdd(newParent);

      if (newID) {
        this.setState({
          festivalOrganizer: {
            profile: {},
          },
        });
      }
    }
  }

  confirmRequestRemoval(_id) {
    const { locale, formatMessage } = this.props.intl;

    const deleteConfirmText = formatMessage({
      'id': 'ui.deleteConfirmText',
      'defaultMessage': 'Are you sure you want to delete this content? This action can not be undone.',
      'description': 'Text confirming deleting content',
    });

    const confirm = window.confirm(deleteConfirmText);
    if (confirm === true) {
      this.throttledRemoveProfile(_id);

      this.context.router.push(`/${locale}`);
    }
  }

  confirmDelete(_id) {
    const { locale, formatMessage } = this.props.intl;

    const approveDeleteConfirmText = formatMessage({
      'id': 'ui.approveDeleteConfirmText',
      'defaultMessage': 'Approve the delete request. The content will be permenantly deleted. This action can not be undone.',
      'description': 'Text confirming deleting content',
    });

    const confirm = window.confirm(approveDeleteConfirmText);
    if (confirm === true) {
      approveProfileRemoval.call({
        profileId: _id,
      }, displayError);

      this.context.router.push(`/${locale}`);
    }
  }

  denyDelete(_id) {
    const { locale, formatMessage } = this.props.intl;

    const denyDeleteConfirmText = formatMessage({
      'id': 'ui.denyDeleteConfirmText',
      'defaultMessage': 'Deny the delete request. The content will remain in the system.',
      'description': 'Text confirming deleting content',
    });

    const confirm = window.confirm(denyDeleteConfirmText);
    if (confirm === true) {
      denyProfileRemoval.call({
        profileId: _id,
      }, displayError);
    }
  }

  initializeD3Globe() {
    const { profileExists, profile, editing } = this.props;
    /* d3 setup */
    // Original example: https://bl.ocks.org/mbostock/4183330
    if (profileExists && !editing && profile.lat && profile.lon) {
      const containerWidth = 200;
      const conatinerHeight = 200;
      const diameter = 196;

      const projection = geoOrthographic()
        .translate([diameter / 2 + 2, diameter / 2 + 2])
        .scale(diameter / 2)
        .clipAngle(90)
        .precision(0.6);

      const graticule = geoGraticule();

      $('#canvas').remove();
      const canvas = select('#globe').append('canvas').attr('id', 'canvas')
        .attr('width', containerWidth)
        .attr('height', conatinerHeight);

      const c = canvas.node().getContext('2d');

      const path = geoPath()
        .projection(projection)
        .context(c);

      const profileLocation = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            profile.lon,
            profile.lat,
          ],
        },
      };

      queue()
        .defer(json, '/world-110m.json')
        .await(globeReady);

      function globeReady(error, world) {
        if (error) {
          return;
        }

        const globe = { type: 'Sphere' };
        const grid = graticule();
        const land = topojson.feature(world, world.objects.land);
        const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

        // Set rotation
        const p = geoCentroid(profileLocation);
        const r = geoInterpolate(projection.rotate(), [-p[0] - 15, -p[1] + 30]);

        projection.rotate(r(1)).clipAngle(90);
        c.clearRect(0, 0, containerWidth, conatinerHeight);

        // Globe background
        c.fillStyle = '#fff8f5';
        c.beginPath();
        path(globe);
        c.fill();

        // Background Continents
        projection.clipAngle(180);
        c.fillStyle = '#c8ece9';
        c.strokeStyle = '#c8ece9';
        c.lineWidth = 0.5;
        c.beginPath();
        path(land);
        c.stroke();
        c.fill();

        // Background Grid
        projection.clipAngle(180);
        // c.strokeStyle = '#deffff';
        c.strokeStyle = '#68d3c84';
        c.lineWidth = 0.25;
        c.beginPath();
        path(grid);
        c.stroke();

        // Foreground Grid
        projection.clipAngle(90);
        // c.strokeStyle = '#ffffff';
        c.strokeStyle = '#68d3c8';
        c.lineWidth = 0.75;
        c.beginPath();
        path(grid);
        c.stroke();

        // Continents
        projection.clipAngle(90);
        c.fillStyle = '#50b2aa';
        c.beginPath();
        path(land);
        c.fill();

        // Foreground borders
        c.strokeStyle = '#50b2aa';
        c.lineWidth = 0.5;
        c.beginPath();
        path(borders);
        c.stroke();

        // Dot
        c.fillStyle = '#ef4606';
        c.beginPath();
        path(profileLocation);
        c.fill();

        // Globe outline
        c.strokeStyle = '#20A09';
        c.lineWidth = 2;
        c.beginPath();
        path(globe);
        c.stroke();
      }
    }
  }

  renderRelatedProfiles() {
    const { connections } = this.props;
    const { locale } = this.props.intl;

    let relatedProfilesList = connections.map(profile => (
      <li key={profile._id}>
        <ProfileNameContainer
          profileId={profile._id}
          defaultName={profile.name}
        />
      </li>
    ));

    return <ul className="related-profiles">{relatedProfilesList}</ul>;
  }

  renderAffiliations() {
    const { affiliations, user } = this.props;
    const { locale } = this.props.intl;

    let affiliatedProfiles = affiliations.map(affiliation => (
      <li key={affiliation.parentId}>
        <ProfileNameContainer profileId={affiliation.parentId} />
        {user ?
          <a
            href="#"
            className="delete-affiliation"
            onClick={this.removeAffiliation.bind(this, affiliation._id)}
            title="Delete affiliationnn"
          >
            &times;
          </a>
        : ''}
      </li>
    ));

    return <ul className="affiliations">{affiliatedProfiles}</ul>;
  }

  renderAddAffiliationForm() {
    const formOptions = defaultFormOptions();
    const { affiliation } = this.state;

    return (
      <form className="affiliation-edit-form" onSubmit={this.affiliationHandleSubmit.bind(this)} >
        <div className="help-block form-intro">
          <FormattedMessage
            id="forms.affiliationHelpText"
            description="Help text for affiliation form"
            defaultMessage="Are you a member of a network / association / union? List them here"
          />
        </div>
        <Form
          ref="affiliationForm"
          type={affiliationFormSchema}
          value={affiliation}
          options={formOptions}
          onChange={this.affiliationOnChange}
        />

        <button
          type="submit"
          className="edit-affiliation-save"
        >
          <FormattedMessage
            id="buttons.save"
            description="Generic save button"
            defaultMessage="Save"
          />
        </button>
      </form>
    );
  }

  removeAffiliation(affiliationId, event) {
    event.preventDefault();
    remove.call({
      affiliationId,
    }, displayError);
  }

  renderFestivalOrganizers() {
    const { festivalOrganizers, user } = this.props;
    const { locale } = this.props.intl;

    let festivalProfiles = festivalOrganizers.map(festivalOrganizer => (
      <li key={festivalOrganizer.parentId}>
        <ProfileNameContainer profileId={festivalOrganizer.parentId} />
        {user ?
          <a
            href="#"
            className="delete-affiliation"
            onClick={this.removeFestivalOrganizer.bind(this, festivalOrganizer._id)}
            title="Delete festival organizer affiliation"
          >
            &times;
          </a>
        : ''}
      </li>
    ));

    return <ul className="festival-organizers">{festivalProfiles}</ul>;
  }

  renderAddFestivalOrganizerForm() {
    const formOptions = festivalOrganizerFormOptions();
    const { festivalOrganizer } = this.state;

    return (
      <form className="festival-organizer-edit-form" onSubmit={this.festivalHandleSubmit.bind(this)} >
        <div className="help-block form-intro">
          <FormattedMessage
            id="forms.festivalOrganizerHelpText"
            description="Help text for festivalOrganizer form"
            defaultMessage="Is this festival hosted or organized by other organizations? List them here."
          />
        </div>
        <Form
          ref="festivalOrganizerForm"
          type={festivalOrganizerFormSchema}
          value={festivalOrganizer}
          options={formOptions}
          onChange={this.festivalOnChange}
        />

        <button
          type="submit"
          className="edit-festival-organizer-save"
        >
          <FormattedMessage
            id="buttons.save"
            description="Generic save button"
            defaultMessage="Save"
          />
        </button>
      </form>
    );
  }

  removeFestivalOrganizer(festivalOrganizerId, event) {
    event.preventDefault();
    removeFestivalOrganizer.call({
      festivalOrganizerId,
    }, displayError);
  }

  render() {
    const {
      profile,
      user,
      showsForAuthor,
      eventsByShowByOrg,
      eventsByShowByRole,
      roles,
      connections,
      affiliations,
      affiliatedProfiles,
      festivalProfiles,
      festivalOrganizers,
      loading,
    } = this.props;
    const { formatMessage, locale } = this.props.intl;

    const baseUrl = Meteor.absoluteUrl(false, { secure: true });

    const profilePageClass = classnames({
      page: true,
    });

    const siteName = formatMessage({
      'id': 'navigation.siteName',
      'defaultMessage': 'World Theatre Map',
      'description': 'Site name',
    });

    const profileLinkText = formatMessage({
      'id': 'share.profileLinkText',
      'defaultMessage': 'on the',
      'description': 'Linking text between the profile name and the site name',
    });

    if (loading) {
      return (
        <Loading key="loading" />
      );
    } else if (!loading && !profile) {
      return (
        <NotFoundPage />
      );
    } else {
      return (
        <div className={profilePageClass}>
          <Helmet
            title={profile.name}
            meta={[
              { property: 'og:title', content: `${profile.name} | ${siteName}` },
              { property: 'twitter:title', content: `${profile.name} | ${siteName}` },
              { property: 'og:type', content: 'article' },
              { property: 'og:url', content: `${baseUrl}${locale}/profiles/${profile._id}` },
            ]}
          />
          {profile.about ?
            <Helmet
              meta={[
                { name: 'description', content: profile.about },
                { property: 'og:description', content: profile.about },
                { property: 'twitter:description', content: profile.about },
              ]}
            /> : ''
          }
          {profile.image ?
            <Helmet
              meta={[
                { property: 'twitter:card', content: 'summary'},
                { property: 'og:image', content: profile.image },
                { property: 'twitter:image', content: profile.image },
              ]}
            /> : ''
          }
          <div className="page-actions">
            <div className="page-actions-edit">
              <Link
                to={`/${locale}/profiles/${profile._id}/edit`}
                key={`${profile._id}-edit`}
                title={`Edit ${profile.name}`}
                className="page-edit-link"
              >
                <FormattedMessage
                  id="ui.pageEdit"
                  description="Page edit link"
                  defaultMessage="Edit details"
                />
              </Link>
              { user && !profile.requestRemoval ?
                <a
                  href="#"
                  title={`Delete ${profile.name}`}
                  className="page-delete-link"
                  onClick={this.confirmRequestRemoval.bind(this, profile._id)}
                >
                  <FormattedMessage
                    id="ui.pageDelete"
                    description="Page delete link"
                    defaultMessage="Delete"
                  />
                </a>
                : ''
              }
              { user && profile.requestRemoval ?
                <FormattedMessage
                  id="ui.pageDeleteRequested"
                  description="Page delete requested message"
                  defaultMessage="Delete request received"
                />
                : ''
              }
              { (profile.requestRemoval && Roles.userIsInRole(Meteor.userId(), ['admin'])) ?
                <div className="admin-actions">
                  <a
                    href="#"
                    title={`Permenantly delete ${profile.name}`}
                    className="page-confirm-removal-link"
                    onClick={this.confirmDelete.bind(this, profile._id)}
                  >
                    <FormattedMessage
                      id="ui.pageConfirmDelete"
                      description="Page confirm delete link"
                      defaultMessage="Confirm Removal"
                    />
                  </a>
                  <a
                    href="#"
                    title={`Deny removal of ${profile.name}`}
                    className="page-deny-removal-link"
                    onClick={this.denyDelete.bind(this, profile._id)}
                  >
                    <FormattedMessage
                      id="ui.pageDenyDelete"
                      description="Page deny removal link"
                      defaultMessage="Deny Removal"
                    />
                  </a>
                </div>
                : ''
              }
            </div>
            <div className="page-actions-share">
              <OutboundLink
                eventLabel="twitter-share"
                to={`https://twitter.com/intent/tweet?text=${profile.name} ${profileLinkText} ${siteName} ${baseUrl}${locale}/profiles/${profile._id} %23howlround @HowlRound @WorldTheatreMap`}
                className="twitter-share"
              >
                <FormattedMessage
                  id="pageActions.tweet"
                  description="Twitter Share Text"
                  defaultMessage="Tweet"
                />
              </OutboundLink>
              <OutboundLink
                eventLabel="facebook-share"
                to={`https://www.facebook.com/dialog/share?app_id=662843947226126&display=popup&href=${baseUrl}${locale}/profiles/${profile._id}&redirect_uri=${baseUrl}${locale}/profiles/${profile._id}`}
                className="facebook-share"
              >
                <FormattedMessage
                  id="pageActions.share"
                  description="Facebook Share Text"
                  defaultMessage="Share"
                />
              </OutboundLink>
            </div>
          </div>
          <Profile
            profile={profile}
            user={user}
            showsForAuthor={showsForAuthor}
            showsForOrg={eventsByShowByOrg}
            eventsByShowByOrg={eventsByShowByOrg}
            eventsByShowByRole={eventsByShowByRole}
            roles={roles}
            affiliatedProfiles={affiliatedProfiles}
            festivalProfiles={festivalProfiles}
          />
          <aside className="sidebar">
            {(profile.lat && profile.lon) ?
              <section className="profile-globe">
                <h2>
                  <FormattedMessage
                    id="profilePage.locationHeader"
                    description="Header for globe on the profile page sidebar"
                    defaultMessage="Location"
                  />
                </h2>
                <div id="globe"></div>
              </section> : ''
            }
            {_.contains(profile.profileType, 'Festival') && (user || festivalOrganizers.length > 0) ?
              <section>
                <h2>
                  <FormattedMessage
                    id="profilePage.festivalOrganizerHeader"
                    description="Header for affiliation list and form on the profile page sidebar"
                    defaultMessage="Festival Organizers"
                  />
                </h2>
                <div className="content">
                  {this.renderFestivalOrganizers()}
                  {user ? this.renderAddFestivalOrganizerForm() : ''}
                </div>
              </section> : ''}
            <ProfileContact profile={profile} />
            {connections.length > 0 ?
              <section>
                <h2>
                  <FormattedMessage
                    id="profilePage.relatedPeopleHeader"
                    description="Header for related people list on the profile page sidebar"
                    defaultMessage="Related People/Organizations"
                  />
                </h2>
                <div className="content">
                  {this.renderRelatedProfiles()}
                </div>
              </section> : ''}
            {user || affiliations.length > 0 ?
              <section>
                <h2>
                  <FormattedMessage
                    id="profilePage.affiliationsHeader"
                    description="Header for affiliation list and form on the profile page sidebar"
                    defaultMessage="Affiliations"
                  />
                </h2>
                <div className="content">
                  {this.renderAffiliations()}
                  {user ? this.renderAddAffiliationForm() : ''}
                </div>
              </section> : ''}
            </aside>
        </div>
      );
    }
  }
}

ProfilePage.propTypes = {
  profile: React.PropTypes.object,
  editing: React.PropTypes.string,
  user: React.PropTypes.object,
  showsForAuthor: React.PropTypes.array,
  eventsByShowByOrg: React.PropTypes.array,
  eventsByShowByRole: React.PropTypes.array,
  roles: React.PropTypes.array,
  connections: React.PropTypes.array,
  affiliations: React.PropTypes.array,
  affiliatedProfiles: React.PropTypes.array,
  feativalOrganizers: React.PropTypes.array,
  festivalProfiles: React.PropTypes.array,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ProfilePage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ProfilePage);
