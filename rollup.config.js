import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import pkg from "./package.json"

const extensions = [".ts"]

const name = "vueWhatScreen"

export default {
  input: "./src/index.ts",

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ["src/**/*"] })
  ],

  output: [
    {
      // for rollup/webpack
      file: pkg.main,
      format: "esm"
    },
    {
      file: pkg.browser,
      format: "iife",
      name,

      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {}
    }
  ]
}
