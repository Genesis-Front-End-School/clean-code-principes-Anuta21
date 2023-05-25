import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.js",
      format: "umd",
      name: "request-builder-ibrary",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      exclude: "node_modules/**",
    }),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    json(),
  ],
};
