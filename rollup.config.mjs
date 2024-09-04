import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const sketchs = ["milo-1", "milo-2"];

const configs = sketchs.map((sketch) => ({
  input: `src/${sketch}/${sketch}.ts`,
  output: {
    file: `static/js/${sketch}/bundle.min.js`,
    format: "cjs",
    name: `${sketch}`,
    // plugins: [terser()],
    extend: true,
  },
  plugins: [commonjs(), typescript(), nodeResolve()],
}));

export default configs;
