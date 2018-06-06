import React from 'react';
import { $ } from 'meteor/jquery';
import EventTeaserWithShow from '../components/EventTeaserWithShow.jsx';
import topojson from 'topojson';
import { _ } from 'meteor/underscore';
import { each, isEmpty, isNull, get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { geoOrthographic, geoGraticule, geoPath, geoCentroid, geoInterpolate } from 'd3-geo';
import { select, queue, json, transition } from 'd3';

export default class EventsGlobe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      stopped: false,
    };

    this.initializeD3Globe = this.initializeD3Globe.bind(this);
    this.globeReady = this.globeReady.bind(this);
    this.pause = this.pause.bind(this);
    this.continue = this.continue.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    this.initializeD3Globe();
  }

  // componentWillUpdate(nextProps) {
  //   @TODO: Find a way to compare items efficiently and rerender if they change
  //   const { items } = this.props;
  //   console.log('componentWillUpdate');
  //   this.initializeD3Globe();
  // }

  // componentWillUnmount () {
  //   // @TODO: Find a way to stop the globe transition
  //   // https://swizec.com/blog/using-d3js-transitions-in-react/swizec/6797
  //   // https://swizec.com/blog/livecoding-18-an-abstract-react-transition-component/swizec/6906
  //   // http://stackoverflow.com/questions/29977799/how-should-i-handle-a-leave-animation-in-componentwillunmount-in-react
  // }

  globeReady(error, world, itemLocations) {
    if (error) {
      console.log(error); // eslint-disable-line no-console
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
    const canvas = select('#globe').append('canvas').attr('id', 'canvas')
      .attr('width', containerWidth)
      .attr('height', conatinerHeight);

    if (isNull(canvas.node())) {
      return;
    }

    const c = canvas.node().getContext('2d');

    const path = geoPath()
      .projection(projection)
      .context(c);
    const graticule = geoGraticule();

    const globe = { type: 'Sphere' };
    const grid = graticule();
    const land = topojson.feature(world, world.objects.land);
    const borders = topojson.mesh(world, world.objects.countries, (a, b) => (a !== b));

    let i = 0;
    const n = itemLocations.length;

    if (n === 0 || typeof itemLocations[i] === 'undefined') {
      return;
    }

    this.setState({ currentItem: itemLocations[i].properties });

    const triggerTransition = () => {
      transition()
        .duration(1250)
        .on('start', () => {
          if (this.state.paused !== true && this.state.stopped !== true) {
            i = (i + 1) % n;
            this.setState({ currentItem: itemLocations[i].properties });
          }
        })
        .tween('rotate', () => {
          // Set rotation
          const p = geoCentroid(itemLocations[i]);
          const r = geoInterpolate(projection.rotate(), [-p[0] - 15, -p[1] + 25]);

            // console.log(projection(items.features[i].geometry.coordinates));
          return t => {
            // var center = projection(r(t));

            projection.rotate(r(t)).clipAngle(90);
            c.clearRect(0, 0, containerWidth, conatinerHeight);

            // Globe background
            c.fillStyle = '#000000';
            c.beginPath();
            path(globe);
            c.fill();

            // Background Continents
            projection.clipAngle(180);
            c.fillStyle = '#2f2e06';
            c.strokeStyle = '#2f2e06';
            c.lineWidth = 0.5;
            c.beginPath();
            path(land);
            c.stroke();
            c.fill();

            // Background dots
            // projection.clipAngle(180);
            // each(itemLocations, dot => {
            //   c.fillStyle = '#b3e6e4';
            //   c.beginPath();
            //   path(dot);
            //   c.fill();
            // });

            // Background Grid
            projection.clipAngle(180);
            // c.strokeStyle = '#deffff';
            c.strokeStyle = '#000000';
            c.lineWidth = 0.25;
            c.beginPath();
            path(grid);
            c.stroke();

            // Foreground Grid
            projection.clipAngle(90);
            // c.strokeStyle = '#ffffff';
            c.strokeStyle = '#a7a216';
            c.lineWidth = 0.75;
            c.beginPath();
            path(grid);
            c.stroke();

            // Continents
            projection.clipAngle(90);
            c.fillStyle = '#f0ea36';
            c.beginPath();
            path(land);
            c.fill();

            // Foreground borders
            c.strokeStyle = '#f0ea36';
            c.lineWidth = 0.5;
            c.beginPath();
            path(borders);
            c.stroke();

            // Other dots
            projection.clipAngle(90);
            each(itemLocations, dot => {
              c.fillStyle = '#1c3f53';
              c.beginPath();
              path(dot);
              c.fill();
            });

            // Dot stroke
            c.strokeStyle = '#000000';
            c.lineWidth = 8;
            c.beginPath();
            path(itemLocations[i]);
            c.stroke();

            // Dot center
            c.fillStyle = '#90f0d2';
            c.strokeStyle = '#90f0d2';
            c.lineWidth = 6;
            c.beginPath();
            path(itemLocations[i]);
            c.fill();
            c.stroke();

            // Globe outline
            c.strokeStyle = '#f0ea36';
            c.lineWidth = 2;
            c.beginPath();
            path(globe);
            c.stroke();
          };
        })
        .transition()
        .on('end', () => {
          // const p = geoCentroid(itemLocations[i]);
          // const r = geoInterpolate(projection.rotate(), [-p[0]-15, -p[1]+30]);
          // // Make text box track the point as it moves
          // const nextPoint = projection(p);
          // const nextPointLeft = (nextPoint[0] - (215 / 2)) + "px";
          // const nextPointTop = (nextPoint[1] + 15 + 60) + "px";
          // const itemInfoWrapper = select(".item-info-wrapper");
          // itemInfoWrapper.style("left", nextPointLeft);
          // itemInfoWrapper.style("top", nextPointTop);

          // Trigger the next transition
          triggerTransition();
        });
    };

    triggerTransition();
  }

  initializeD3Globe() {
    const { items } = this.props;
    /* d3 setup */
    // Original example: https://bl.ocks.org/mbostock/4183330

    // Until the item collection is formatted as GeoJSON reformat it on the fly
    // D3 defer task
    function reformatItems(rawItems, callback) {
      const itemLocations = [];
      each(rawItems, (item) => {
        if (!isEmpty(item.lon) && !isEmpty(item.lat)) {
          const geoJSON = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                item.lon,
                item.lat,
              ],
            },
            properties: item,
          };

          itemLocations.push(geoJSON);
        }
      });

      callback(null, itemLocations);
    }

    queue()
      .defer(json, '/world-110m.json')
      .defer(reformatItems, items)
      .await(this.globeReady);
  }

  pause() {
    this.setState({ paused: true });
  }

  continue() {
    this.setState({ paused: false });
  }

  start() {
    this.setState({ stopped: false });
  }

  stop() {
    this.setState({ stopped: true });
  }

  render() {
    const { items } = this.props;
    const { currentItem, stopped } = this.state;

    return (
      <div className="items-globe">
        {items && items.length ?
          <div id="globe"></div> : ''
        }
        {items && items.length && currentItem ?
          <div className="item-info-wrapper">
            <div
              className="item-info"
              onMouseOver={this.pause}
              onMouseLeave={this.continue}
            >
              <EventTeaserWithShow event={currentItem} />
            </div>
          </div>
        : ''}
        {stopped ?
          <span
            className="stop-button stopped"
            onClick={this.start}
          >
            <FormattedMessage
              id="animation.continue"
              description="Globe pause button: Continue"
              defaultMessage="Continue"
            />
          </span>
          :
          <span
            className="stop-button"
            onClick={this.stop}
          >
            <FormattedMessage
              id="animation.pause"
              description="Globe pause button: Pause"
              defaultMessage="Pause"
            />
          </span>
        }
      </div>
    );
  }
}

EventsGlobe.propTypes = {
  items: React.PropTypes.array,
};
