import React from 'react';
import classnames from 'classnames';
import { select, queue, json, transition } from 'd3';
import topojson from 'topojson';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import Profile from '../components/Profile.jsx';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';
import Message from '../components/Message.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

export default class EventsGlobe extends React.Component {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.initializeD3Globe();
    }
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  // componentWillUnmount () {
  //   // Find a way to stop the globe transition
  //   // https://swizec.com/blog/using-d3js-transitions-in-react/swizec/6797
  // }

  globeReady(error, world, eventLocations) {
    if (error) {
      console.log(error);
      return;
    }

    const containerWidth = 745;
    const conatinerHeight = 745;
    const diameter = 741;

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
            path(eventLocations[i]);
            c.fill();

            // Globe outline
            c.strokeStyle = "#20A09";
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
    const { events } = this.props;
    const { currentEvent } = this.state;

    return (
      <div className="events-globe">
        {events && events.length ?
          <div id="globe"></div> : ''
        }
        {events && events.length && currentEvent ? <div className="event-info-wrapper"><div className="event-info" onMouseOver={ this.pause } onMouseLeave={ this.continue }><EventTeaserWithShow event={ currentEvent } /></div></div> : '' }
      </div>
    );
  }
}

EventsGlobe.propTypes = {
  events: React.PropTypes.array,
};
