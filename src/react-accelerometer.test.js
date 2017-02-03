const React = require('react')
const sinon = require('sinon')
const assert = require('assert')
const mount = require('enzyme/mount')
const shallow = require('enzyme/shallow')

const ReactAccelerometer = require('./react-accelerometer')

describe('ReactAccelerometer', () => {
  before(() => {
    sinon.spy(window, 'addEventListener')
    sinon.spy(window, 'removeEventListener')
  })

  after(() => {
    window.addEventListener.restore()
    window.removeEventListener.restore()
  })

  it('should add event listener on mount', () => {
    const wrapper = mount(
      <ReactAccelerometer>
        {() => <div />}
      </ReactAccelerometer>
    )
    const node = wrapper.getNode()

    assert(window.addEventListener.calledWith('devicemotion', node.handleAcceleration))
    assert(window.addEventListener.calledWith('orientationchange', node.handleOrientation))
  })

  it('should remove the event listener on unmount', () => {
    const wrapper = mount(
      <ReactAccelerometer>
        {() => <div />}
      </ReactAccelerometer>
    )
    const node = wrapper.getNode()

    wrapper.unmount()
    assert(window.removeEventListener.calledWith('devicemotion', node.handleAcceleration))
    assert(window.removeEventListener.calledWith('orientationchange', node.handleOrientation))
  })

  describe('Window Events', () => {
    it('should call handleAcceleration when "devicemotion" event is dispatched', () => {
      sinon.spy(ReactAccelerometer.prototype, 'handleAcceleration')

      mount(
        <ReactAccelerometer>
          {() => <div />}
        </ReactAccelerometer>
      )

      window.dispatchEvent(new window.Event('devicemotion'))

      assert(ReactAccelerometer.prototype.handleAcceleration.called)

      ReactAccelerometer.prototype.handleAcceleration.restore()
    })

    it('should call handleOrientation when "orientationchange" event is dispatched', () => {
      sinon.spy(ReactAccelerometer.prototype, 'handleOrientation')

      mount(
        <ReactAccelerometer>
          {() => <div />}
        </ReactAccelerometer>
      )

      window.dispatchEvent(new window.Event('orientationchange'))

      assert(ReactAccelerometer.prototype.handleOrientation.called)

      ReactAccelerometer.prototype.handleOrientation.restore()
    })
  })

  describe('State', () => {
    const event = {
      acceleration: { x: 1, y: 2, z: 3 },
      accelerationIncludingGravity: { x: 2, y: 3, z: 4 },
      rotationRate: { alpha: 1, beta: 2, gamma: 3 }
    }

    it('should set the correct state using the gravity acceleration', () => {
      const wrapper = shallow(
        <ReactAccelerometer useGravity>
          {() => <div />}
        </ReactAccelerometer>
      )

      wrapper.instance().handleAcceleration(event)

      assert.deepEqual(wrapper.state(), {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z,
        rotation: event.rotationRate,
        landscape: false
      })
    })

    it('should set the correct state using the normal acceleration', () => {
      const wrapper = shallow(
        <ReactAccelerometer useGravity={false}>
          {() => <div />}
        </ReactAccelerometer>
      )

      wrapper.instance().handleAcceleration(event)

      assert.deepEqual(wrapper.state(), {
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z,
        rotation: event.rotationRate,
        landscape: false
      })
    })

    it('should set the correct state with the multiplier', () => {
      const multiplier = 5
      const wrapper = shallow(
        <ReactAccelerometer multiplier={multiplier}>
          {() => <div />}
        </ReactAccelerometer>
      )

      wrapper.instance().handleAcceleration(event)

      assert.deepEqual(wrapper.state(), {
        x: event.accelerationIncludingGravity.x * multiplier,
        y: event.accelerationIncludingGravity.y * multiplier,
        z: event.accelerationIncludingGravity.z * multiplier,
        rotation: event.rotationRate,
        landscape: false
      })
    })

    it('should set the correct state when in landscape', () => {
      const wrapper = shallow(
        <ReactAccelerometer>
          {() => <div />}
        </ReactAccelerometer>
      )

      window.orientation = -90
      wrapper.instance().handleOrientation()
      wrapper.instance().handleAcceleration(event)
      window.orientation = 0

      assert.deepEqual(wrapper.state(), {
        x: event.accelerationIncludingGravity.y,
        y: event.accelerationIncludingGravity.x,
        z: event.accelerationIncludingGravity.z,
        rotation: event.rotationRate,
        landscape: true
      })
    })
  })

  describe('Children', () => {
    const event = {
      acceleration: { x: 1, y: 2, z: 3 },
      accelerationIncludingGravity: { x: 2, y: 3, z: 4 },
      rotationRate: { alpha: 1, beta: 2, gamma: 3 }
    }

    it('calls the children function with arguments if the "devicemotion" is fired', () => {
      const stub = sinon.stub()
      stub.returns(<div />)

      const wrapper = shallow(
        <ReactAccelerometer>
          {stub}
        </ReactAccelerometer>
      )

      wrapper.instance().handleAcceleration(event)

      assert(stub.calledWith(event.accelerationIncludingGravity, event.rotationRate))
    })

    it('calls the children function without arguments if the "devicemotion" is not fired', () => {
      const stub = sinon.stub()
      stub.returns(<div />)

      shallow(
        <ReactAccelerometer>
          {stub}
        </ReactAccelerometer>
      )

      assert(stub.neverCalledWith(event.accelerationIncludingGravity, event.rotationRate))
    })
  })
})
