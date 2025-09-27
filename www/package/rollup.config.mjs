import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  // see https://github.com/rollup/plugins/tree/master/packages/node-resolve
  // see https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
  // external: [nodeResolve()],
  plugins: [
    nodeResolve(), // nodeResolve() required because of https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
    commonjs(), // commonjs() required because of https://rollupjs.org/troubleshooting/#error-name-is-not-exported-by-module
  ],
  input: 'src/gesis-web-frontend.js',
  output: {
    // file: 'dist/gesis-web-frontend.js',
    dir: 'dist/lib/', // use dir instead of file so that dynamic import() statements will get their own chunks
    
    format: 'esm',
    sourcemap: true,
  }, 
};
