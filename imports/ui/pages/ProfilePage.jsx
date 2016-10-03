import React from 'react';
import classnames from 'classnames';

import { select, queue, json } from 'd3';
import topojson from 'topojson';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Profile from '../components/Profile.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';
import ProfileContact from '../components/ProfileContact.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';
import Loading from '../components/Loading.jsx';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.renderRelatedProfiles = this.renderRelatedProfiles.bind(this);
    this.initializeD3Globe = this.initializeD3Globe.bind(this);
  }

  renderRelatedProfiles() {
    const { connections, profile } = this.props;

    let relatedProfiles = connections.map(profile => {
      return <li key={profile._id}><Link
            to={`/profiles/${ profile._id }`}
          >
            {profile.name}
          </Link></li>;
    });

    return <ul className="related-profiles">{relatedProfiles}</ul>;
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  componentDidUpdate(prevProps, prevState) {
    this.initializeD3Globe();
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
      const canvas = select("#globe").append("canvas").attr('id', 'canvas')
        .attr("width", containerWidth)
        .attr("height", conatinerHeight);

      let c = canvas.node().getContext("2d");

      let path = geoPath()
        .projection(projection)
        .context(c);

      const profileLocation = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            profile.lon,
            profile.lat
          ]
        }
      };

      queue()
        .defer(json, "/world-110m.json")
        .await(globeReady);

      function globeReady(error, world) {
        if (error) {
          return;
        }

        const globe = {type: "Sphere"};
        const grid = graticule();
        const land = topojson.feature(world, world.objects.land);
        var borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });

        // Set rotation
        const p = geoCentroid(profileLocation);
        const r = geoInterpolate(projection.rotate(), [-p[0]-15, -p[1]+30]);

        projection.rotate(r(1)).clipAngle(90);
        c.clearRect(0, 0, containerWidth, conatinerHeight);

        // Globe background
        c.fillStyle = "#fff8f5";
        c.beginPath();
        path(globe);
        c.fill();

        // Background Continents
        projection.clipAngle(180);
        c.fillStyle = "#c8ece9";
        c.strokeStyle = "#c8ece9";
        c.lineWidth = .5;
        c.beginPath();
        path(land);
        c.stroke();
        c.fill();

        // Background Grid
        projection.clipAngle(180);
        // c.strokeStyle = "#deffff";
        c.strokeStyle = "#68d3c84";
        c.lineWidth = .25;
        c.beginPath();
        path(grid);
        c.stroke();

        // Foreground Grid
        projection.clipAngle(90);
        // c.strokeStyle = "#ffffff";
        c.strokeStyle = "#68d3c8";
        c.lineWidth = 0.75;
        c.beginPath();
        path(grid);
        c.stroke();

        // Continents
        projection.clipAngle(90);
        c.fillStyle = "#50b2aa";
        c.beginPath();
        path(land);
        c.fill();

        // Foreground borders
        c.strokeStyle = "#50b2aa";
        c.lineWidth = .5;
        c.beginPath();
        path(borders);
        c.stroke();

        // Dot
        c.fillStyle = "#ef4606";
        c.beginPath();
        path(profileLocation);
        c.fill();

        // Globe outline
        c.strokeStyle = "#20A09";
        c.lineWidth = 2;
        c.beginPath();
        path(globe);
        c.stroke();
      }
    }
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profile, user, showsForAuthor, showsForOrg, roles, connections, loading } = this.props;

    const profilePageClass = classnames({
      'page': true,
    });

    if (loading) {
      return (
        <Loading key="loading" />
      );
    }
    else if (!loading && !profile) {
      return (
        <NotFoundPage/>
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
          />
          <aside className="sidebar">
            { (profile.lat && profile.lon) ?
              <section className="profile-globe">
                <h2>
                  <FormattedMessage
                    id='profilePage.locationHeader'
                    description='Header for globe on the profile page sidebar'
                    defaultMessage="Location"
                  />
                </h2>
                <div id="globe"></div>
              </section> : ''
            }
            <ProfileContact profile={profile} />
            { connections.length > 0 ?
              <section>
                <h2>
                  <FormattedMessage
                    id='profilePage.relatedPeopleHeader'
                    description='Header for related people list on the profile page sidebar'
                    defaultMessage="Related People"
                  />
                </h2>
                <div className="content">
                  { this.renderRelatedProfiles() }
                </div>
              </section> : '' }
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
  loading: React.PropTypes.bool,
  profileExists: React.PropTypes.bool,
};
