import React from 'react';
import classnames from 'classnames';
import Message from '../components/Message.jsx';
import Profile from '../components/Profile.jsx';
import topojson from 'topojson';
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import { Link } from 'react-router';
import { select, queue, json, transition } from 'd3';

export default class EventsMiniGlobe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
    }

    this.initializeD3Globe = this.initializeD3Globe.bind(this);
    this.globeReady = this.globeReady.bind(this);
    this.pause = this.pause.bind(this);
    this.continue = this.continue.bind(this);
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  // componentWillUnmount () {
  //   // Find a way to stop the globe transition
  //   // https://swizec.com/blog/using-d3js-transitions-in-react/swizec/6797
  //   // https://swizec.com/blog/livecoding-18-an-abstract-react-transition-component/swizec/6906
  // }

  globeReady(error, world, eventLocations) {
    if (error) {
      console.log(error);
      return;
    }

    const containerWidth = 200;
    const conatinerHeight = 200;
    const diameter = 196;

    const projection = geoOrthographic()
      .translate([diameter / 2 + 2, diameter / 2 + 2])
      .scale(diameter / 2)
      .clipAngle(90)
      .precision(0.6);

    $('#canvas').remove();
    const canvas = select("#globe").append("canvas").attr('id', 'canvas')
      .attr("width", containerWidth)
      .attr("height", conatinerHeight);

    let c = canvas.node().getContext("2d");

    let path = geoPath()
      .projection(projection)
      .context(c);
    const graticule = geoGraticule();

    const globe = {type: "Sphere"};
    const grid = graticule();
    const land = topojson.feature(world, world.objects.land);
    var borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });

    let i = 0;
    const n = eventLocations.length;

    if (n == 0 || typeof eventLocations[i] == 'undefined') {
      return;
    }

    this.setState({ currentEvent: eventLocations[i].properties });

    const triggerTransition = () => {
      transition()
        .duration(1250)
        .on("start", () => {
          if (this.state.paused != true) {
            i = (i + 1) % n;
            this.setState({ currentEvent: eventLocations[i].properties });
          }
        })
        .tween("rotate", function() {
          // Set rotation
          const p = geoCentroid(eventLocations[i]);
          const r = geoInterpolate(projection.rotate(), [-p[0]-15, -p[1]+30]);

            // console.log(projection(events.features[i].geometry.coordinates));
          return function(t) {
            // var center = projection(r(t));

            projection.rotate(r(t)).clipAngle(90);;
            c.clearRect(0, 0, containerWidth, conatinerHeight);

            // Globe background
            c.fillStyle = "#000000";
            c.beginPath();
            path(globe);
            c.fill();

            // Background Continents
            projection.clipAngle(180);
            c.fillStyle = "#2f2e06";
            c.strokeStyle = "#2f2e06";
            c.lineWidth = .5;
            c.beginPath();
            path(land);
            c.stroke();
            c.fill();

            // Background Grid
            projection.clipAngle(180);
            // c.strokeStyle = "#deffff";
            c.strokeStyle = "#000000";
            c.lineWidth = .25;
            c.beginPath();
            path(grid);
            c.stroke();

            // Foreground Grid
            projection.clipAngle(90);
            // c.strokeStyle = "#ffffff";
            c.strokeStyle = "#f0ea36";
            c.lineWidth = 0.75;
            c.beginPath();
            path(grid);
            c.stroke();

            // Continents
            projection.clipAngle(90);
            c.fillStyle = "#f0ea36";
            c.beginPath();
            path(land);
            c.fill();

            // Foreground borders
            c.strokeStyle = "#f0ea36";
            c.lineWidth = .5;
            c.beginPath();
            path(borders);
            c.stroke();

            // Other dots
            projection.clipAngle(90);
            c.fillStyle = "#1c3f53";
            c.beginPath();
            path(eventLocations);
            c.fill();

            // Dot
            c.fillStyle = "#90f0d2";
            c.strokeStyle = "#000000";
            c.lineWidth = .5;
            c.beginPath();
            path(eventLocations[i]);
            c.fill();
            c.stroke();

            // Globe outline
            c.strokeStyle = "#f0ea36";
            c.lineWidth = 2;
            c.beginPath();
            path(globe);
            c.stroke();
          };
        })
        .transition()
        .on("end", function() {
          // const p = geoCentroid(eventLocations[i]);
          // const r = geoInterpolate(projection.rotate(), [-p[0]-15, -p[1]+30]);
          // // Make text box track the point as it moves
          // const nextPoint = projection(p);
          // const nextPointLeft = (nextPoint[0] - (215 / 2)) + "px";
          // const nextPointTop = (nextPoint[1] + 15 + 60) + "px";
          // const eventInfoWrapper = select(".event-info-wrapper");
          // eventInfoWrapper.style("left", nextPointLeft);
          // eventInfoWrapper.style("top", nextPointTop);

          // Trigger the next transition
          triggerTransition();
        });
    }

    triggerTransition();
  }

  initializeD3Globe() {
    const { events } = this.props;
    /* d3 setup */
    // Original example: https://bl.ocks.org/mbostock/4183330

    // Until the event collection is formatted as GeoJSON reformat it on the fly
    // D3 defer task
    function reformatEvents(events, callback) {
      let eventLocations = new Array;
      _.map(events, (event) => {
        const geoJSON = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              event.lon,
              event.lat
            ]
          },
          "properties": event
        };

        eventLocations.push(geoJSON);
      });

      callback(null, eventLocations);
    }

    queue()
      .defer(json, "/world-110m.json")
      .defer(reformatEvents, events)
      .await(this.globeReady);
  }

  pause() {
    this.setState({ paused: true });
  }

  continue() {
    this.setState({ paused: false });
  }

  render() {
    const { currentEvent, paused } = this.state;

    return (
      <div className="show-globe">
        <div id="globe"></div>
        {paused ?
          <span
            className="stop-button stopped"
            onClick={this.continue}
          >
            <FormattedMessage
              id='animation.continue'
              description="Globe pause button: Continue"
              defaultMessage="Continue"
            />
          </span>
          :
          <span
            className="stop-button"
            onClick={this.pause}
          >
            <FormattedMessage
              id='animation.pause'
              description="Globe pause button: Pause"
              defaultMessage="Pause"
            />
          </span>
        }
      </div>
    );
  }
}

EventsMiniGlobe.propTypes = {
  events: React.PropTypes.array,
};
