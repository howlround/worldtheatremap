import React from 'react';
import classnames from 'classnames';
import { select, queue, json, transition } from 'd3';
import topojson from 'topojson';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import Profile from '../components/Profile.jsx';
import Message from '../components/Message.jsx';
import Loading from '../components/Loading.jsx';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

export default class EventsGlobe extends React.Component {
  constructor(props) {
    super(props);

    this.initializeD3Globe = this.initializeD3Globe.bind(this);
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  initializeD3Globe() {
    const { events } = this.props;
    /* d3 setup */
    // Original example: https://bl.ocks.org/mbostock/4183330
    const containerWidth = 745;
    const conatinerHeight = 745;
    const diameter = 741;

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
      .await(globeReady);

    function globeReady(error, world, eventLocations) {
      if (error) {
        console.log(error);
        return;
      }

      const globe = {type: "Sphere"};
      const grid = graticule();
      const land = topojson.feature(world, world.objects.land);
      var borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });

      let i = 0;
      const n = eventLocations.length;

      /* old */
      const triggerTransition = () => {
        transition()
          .duration(1250)
          .on("start", function() {
            i = (i + 1) % n;
          })
          // .each("start", function() {
          //   console.log('start');
          //   i = (i + 1) % n;

          //   // var event_type = events.features[i].properties.event_type;
          //   // var play_title_display = events.features[i].properties.play_title_display;
          //   // var event_to_date = events.features[i].properties.event_to_date;
          //   // var event_date = events.features[i].properties.event_date;
          //   // var related_theater = events.features[i].properties.related_theater;
          //   // var related_theater_path = events.features[i].properties.related_theater_path;
          //   // var related_play_path = events.features[i].properties.related_play_path;
          //   // var generative_artist = events.features[i].properties.generative_artist;
          //   // var generative_artist_path = events.features[i].properties.generative_artist_path;
          //   // var city_state = events.features[i].properties.city_state;

          //   // var eventInfo = '<div class="results-item-content"><div class="event-type">' + event_type + '</div><a class="results-item-title" href="http://newplaymap.org/participate' + related_play_path + '">' + play_title_display + '</a><div class="artist-name">by <a href="http://newplaymap.org/participate' + generative_artist_path + '">' + generative_artist + '</a></div><a href="http://newplaymap.org/participate' + related_theater_path + '"">' + related_theater + '</a><div class="results-location">' + city_state + '</div><div class="date">' + event_date + ' - ' + event_to_date + '</div></div>';

          //   // // title.text(events.features[i].properties.play_title_display);
          //   // title.html(eventInfo);
          // })
          .tween("rotate", function() {
            // Set rotation
            const p = geoCentroid(eventLocations[i]);
            const r = geoInterpolate(projection.rotate(), [-p[0]-15, -p[1]+30]);

              // console.log(projection(events.features[i].geometry.coordinates));
            return function(t) {
              // var center = projection(r(t));

              // Make text box track the point as it moves
              // var nextPoint = projection(p);
              // var nextPointLeft = (nextPoint[0] - (215 / 2)) + "px";
              // var nextPointTop = (nextPoint[1] + 15 + 60) + "px";
              // eventInfoWrapper.style("left", nextPointLeft);
              // eventInfoWrapper.style("top", nextPointTop);

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
            // Trigger the next transition
            triggerTransition();
          });
      }

      triggerTransition();
    }
  }

  render() {
    return (
      <div className="events-globe">
        <div id="globe"></div>
      </div>
    );
  }
}

EventsGlobe.propTypes = {
  events: React.PropTypes.array,
};
