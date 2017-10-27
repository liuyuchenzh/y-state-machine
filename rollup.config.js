const ts = require('rollup-plugin-typescript2')
module.exports = {
  input: 'src/index.ts',
  plugins: [
    ts()
  ],
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'StateMachine'
  }
}