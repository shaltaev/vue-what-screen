import { resolve as res } from "path"
import babel from "rollup-plugin-babel"

const resolve = _path => res(__dirname, _path)

module.exports = {
  input: resolve("src/main.js"),
  plugins: [babel()],
  output: {
    // dir: resolve("dist/"),
    file: resolve("dist/bundle.js"),
    format: "es"
  }
}
