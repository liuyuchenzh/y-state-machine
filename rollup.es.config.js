const ts = require('rollup-plugin-typescript2')
module.exports = {
  input: 'src/index.ts',
  plugins: [
    ts({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6'
        }
      }
    })
  ],
  output: {
    file: 'index_es.js',
    format: 'es',
    name: 'StateMachine'
  }
}
