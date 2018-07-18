// avoid destructuring for older Node version support
const resolve = require("path").resolve;
const join = require("path").join;
const webpack = require("webpack");

const CONFIG = {
  entry: { app: resolve("./src/index.js") },

  // output: {
  //   filename: "app.js",
  //   path: __dirname + "/dist"
  // },

  // resolve: {
  //   // Make src files outside of this dir resolve modules in our node_modules folder
  //   modules: [resolve(__dirname, "."), resolve(__dirname, "node_modules"), "node_modules"]
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: join(__dirname, "src"),
        exclude: [/node_modules/]
      },
      {
        // The example has some JSON data
        test: /\.json$/,
        loader: "json-loader",
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: [new webpack.EnvironmentPlugin(["MapboxAccessToken"])]
};

module.exports = CONFIG;
