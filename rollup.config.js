import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const pkg = require('./package.json')

export default {
  entry: './src/index.js',
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'ReactAccelerometer',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    },
    {
      dest: 'demo/react-accelerometer.js',
      format: 'iife',
      moduleName: 'ReactAccelerometer',
      sourceMap: true
    }
  ],
  plugins: [
    buble(),
    resolve({
      jsnext: true,
      main: true,
      skip: ['react']
    }),
    commonjs({ extensions: ['.js', '.json'] })
  ],
  external: 'react',
  globals: {
    react: 'React'
  }
}
