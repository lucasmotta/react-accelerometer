# React-Accelerometer
[![Build Status](https://travis-ci.org/lucasmotta/react-accelerometer.svg?branch=master)](https://travis-ci.org/lucasmotta/react-accelerometer)

Allows you to take advantage of the device's accelerometer on a very easy and uncomplicated way.

## Installation
```js
npm install --save react-accelerometer
// or
yarn add react-accelerometer
```

## Usage
```js
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactAccelerometer from 'react-accelerometer'

const AwesomeComponent = () => (
  <ReactAccelerometer>
    {(position, rotation) => (
      <ul>
        <li>x: {position.x}</li>
        <li>y: {position.y}</li>
        <li>z: {position.z}</li>
        <li>rotation alpha: {rotation.alpha}</li>
        <li>rotation beta: {rotation.beta}</li>
        <li>rotation gamma: {rotation.gamma}</li>
      </ul>
    )}
  </ReactAccelerometer>
)

render(<AwesomeComponent />, document.querySelector('#app'))
```

## Props

```js
static propTypes = {
  /**
   * You have to pass a function as the children and return a valid
   * React component. If the device supports the "devicemotion" API,
   * this function will receive two arguments:
   *  - pos <Object> - with the "x", "y", "z" properties
   *  - rotation <Object> - with the "alpha", "beta", "gamma"
   */
  children: PropTypes.func.isRequired,
  /**
   * Multiplies the `x`, `y` and `z` positions by this amount
   * @default 1
   */
  multiplier: PropTypes.bool,
  /**
   * Takes in consideration the gravity or not
   * @default true
   */
  useGravity: PropTypes.bool,
}
```


## React-Accelerometer + React-Motion

I highly recommend you to combine this component with [React-Motion](https://github.com/chenglou/react-motion) to get a smoother transition between the accelerometer's values:

```js
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactAccelerometer from 'react-accelerometer'
import { Motion, spring } from 'react-motion'

/* Combining React-Accelerometer with React-Motion */
const ReactAccelerometerMotion = ({ children }) => (
  <ReactAccelerometer>
    {({ x, y }) => (
      <Motion style={{ x: spring(x), y: spring(y) }}>
        {pos => children(pos)}
      </Motion>
    )}
  </ReactAccelerometer>
)

const AwesomeComponent = () => (
  <ReactAccelerometerMotion>
    {({ x, y }) => (
      <img
        src='image.jpg'
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      />
    )}
  </ReactAccelerometerMotion>
)

render(<AwesomeComponent />, document.querySelector('#app'))
```

## Test
```js
npm test
// or
yarnpkg test
```

## License

MIT
