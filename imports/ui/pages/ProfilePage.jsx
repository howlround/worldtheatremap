import React from 'react';

// Utilities
import classnames from 'classnames';
import { select, queue, json } from 'd3';
import topojson from 'topojson';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { displayError } from '../helpers/errors.js';

// Forms
import t from 'tcomb-form';

// Components
import Profile from '../components/Profile.jsx';
import ProfileContact from '../components/ProfileContact.jsx';
import Loading from '../components/Loading.jsx';

// Pages
import NotFoundPage from '../pages/NotFoundPage.jsx';

// API
import { upsert } from '../../api/affiliations/methods.js';
import { affiliationFormSchema, defaultFormOptions } from '../../api/affiliations/affiliations.js';

const Form = t.form.Form;

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      affiliation: {
        profile: {},
      },
    };

    this.throttledAdd = _.throttle(newParent => {
      if (newParent) {
        // Create Affiliation record
        const parent = newParent.profile;
        const newAffiliation = {
          profile: {
            _id: this.props.profile._id,
            name: this.props.profile.name,
          }
        }

        const newID = upsert.call({
          newAffiliation,
          parent,
        }, displayError);

        return newID;
      }
    }, 300);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderRelatedProfiles = this.renderRelatedProfiles.bind(this);
    this.renderAffiliations = this.renderAffiliations.bind(this);
    this.renderAddAffiliationForm = this.renderAddAffiliationForm.bind(this);
    this.initializeD3Globe = this.initializeD3Globe.bind(this);
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile === undefined && this.props.profile && this.props.profile.lat && this.props.profile.lon) {
      this.initializeD3Globe();
    } else if (prevProps.profile && prevProps.profile.lat && prevProps.profile.lon && this.props.profile && this.props.profile.lat && this.props.profile.lon && (prevProps.profile.lat !== this.props.profile.lat || prevProps.profile.lon !== this.props.profile.lon)) {
      this.initializeD3Globe();
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

  handleSubmit(event) {
    event.preventDefault();
    const newParent = this.refs.form.getValue();
    if (newParent) {
      const newID = this.throttledAdd(newParent);

      if (newID) {
        this.setState({
          affiliation: {
            profile: {}
          }
        });
      }
    }
  }

  onChange(value, path) {
    this.setState({ affiliation: value });
  }

  renderRelatedProfiles() {
    const { connections } = this.props;

    let relatedProfilesList = connections.map(profile => (
      <li key={profile._id}>
        <Link to={`/profiles/${profile._id}`}>
          {profile.name}
        </Link>
      </li>
    ));

    return <ul className="related-profiles">{relatedProfilesList}</ul>;
  }

  renderAffiliations() {
    const { affiliations } = this.props;

    let affiliatedProfiles = affiliations.map(profile => (
      <li key={profile._id}>
        <Link to={`/profiles/${profile._id}`}>
          {profile.name}
        </Link>
      </li>
    ));

    return <ul className="affiliations">{affiliatedProfiles}</ul>;
  }

  renderAddAffiliationForm() {
    const formOptions = defaultFormOptions();
    const { affiliation } = this.state;

    return (
      <form className="affiliation-edit-form" onSubmit={this.handleSubmit.bind(this)} >
        <h3>
          <FormattedMessage
            id='event.affiliationFormTitle'
            description='Heading above affiliation form on events'
            defaultMessage='Add a New Affiliation'
          />
        </h3>
        <div className="help-block form-intro">
          <FormattedMessage
            id="forms.affiliationHelpText"
            description="Help text for affiliation form"
            defaultMessage="Are you a member of a service organization? Staff at a theatre? Add affiliations here."
          />
        </div>
        <Form
          ref="form"
          type={affiliationFormSchema}
          value={affiliation}
          options={formOptions}
          onChange={this.onChange}
        />

        <button
          type="submit"
          className="edit-affiliation-save"
        >
          <FormattedMessage
            id='buttons.save'
            description='Generic save button'
            defaultMessage='Save'
          />
        </button>
      </form>
    );
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profile, user, showsForAuthor, showsForOrg, roles, connections, affiliations, affiliatedProfiles, loading } = this.props;

    const profilePageClass = classnames({
      page: true,
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
          <Profile
            profile={profile}
            user={user}
            showsForAuthor={showsForAuthor}
            showsForOrg={showsForOrg}
            roles={roles}
            affiliatedProfiles={affiliatedProfiles}
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
            <ProfileContact profile={profile} />
            {connections.length > 0 ?
              <section>
                <h2>
                  <FormattedMessage
                    id="profilePage.relatedPeopleHeader"
                    description="Header for related people list on the profile page sidebar"
                    defaultMessage="Related People"
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
  showsForOrg: React.PropTypes.array,
  roles: React.PropTypes.array,
  connections: React.PropTypes.array,
  affiliations: React.PropTypes.array,
  affiliatedProfiles: React.PropTypes.array,
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
};
