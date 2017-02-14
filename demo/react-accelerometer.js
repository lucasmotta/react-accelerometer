var ReactAccelerometer = (function (react) {
'use strict';

react = 'default' in react ? react['default'] : react;

var React = react;

/**
 * @usage
 *    <ReactAccelerometer useGravity multiplier={3}>
 *      {(position, rotation) => (
 *        <div style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`}}>
 *          Hello there
 *        </div>
 *      )}
 *    </ReactAccelerometer>
 */
var ReactAccelerometer = (function (superclass) {
  function ReactAccelerometer (props) {
    superclass.call(this, props);

    this.state = {
      x: null,
      y: null,
      z: null,
      rotation: null,
      landscape: false
    };

    this.handleAcceleration = this.handleAcceleration.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
  }

  if ( superclass ) ReactAccelerometer.__proto__ = superclass;
  ReactAccelerometer.prototype = Object.create( superclass && superclass.prototype );
  ReactAccelerometer.prototype.constructor = ReactAccelerometer;

  ReactAccelerometer.prototype.componentDidMount = function componentDidMount () {
    this.handleOrientation();
    window.addEventListener('devicemotion', this.handleAcceleration);
    window.addEventListener('orientationchange', this.handleOrientation);
  };

  ReactAccelerometer.prototype.componentWillUnmount = function componentWillUnmount () {
    window.removeEventListener('devicemotion', this.handleAcceleration);
    window.removeEventListener('orientationchange', this.handleOrientation);
  };

  ReactAccelerometer.prototype.handleOrientation = function handleOrientation (event) {
    var orientation = window.orientation;
    this.setState({ landscape: orientation === 90 || orientation === -90 });
  };

  ReactAccelerometer.prototype.handleAcceleration = function handleAcceleration (event) {
    var ref = this.state;
    var landscape = ref.landscape;
    var ref$1 = this.props;
    var useGravity = ref$1.useGravity;
    var multiplier = ref$1.multiplier;
    var acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration;
    var rotation = event.rotationRate || null;
    var x = acceleration.x;
    var y = acceleration.y;
    var z = acceleration.z;

    this.setState({
      rotation: rotation,
      x: (landscape ? y : x) * multiplier,
      y: (landscape ? x : y) * multiplier,
      z: z * multiplier
    });
  };

  ReactAccelerometer.prototype.render = function render () {
    var ref = this.props;
    var children = ref.children;
    var ref$1 = this.state;
    var x = ref$1.x;
    var y = ref$1.y;
    var z = ref$1.z;
    var rotation = ref$1.rotation;

    /**
     * We have to detect if one of the values was ever set by the 'devicemotion' event,
     * as some browsers implement the API, but the device itself doesn't support.
     */
    if (x || y || z) {
      return children({ x: x, y: y, z: z }, rotation)
    }

    return children()
  };

  return ReactAccelerometer;
}(React.Component));

ReactAccelerometer.propTypes = {
  children: React.PropTypes.func.isRequired,
  multiplier: React.PropTypes.number,
  useGravity: React.PropTypes.bool
};

ReactAccelerometer.defaultProps = {
  multiplier: 1,
  useGravity: true
};

var reactAccelerometer = ReactAccelerometer;

var index = reactAccelerometer;

return index;

}(React));
//# sourceMappingURL=react-accelerometer.js.map
