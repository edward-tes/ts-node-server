const path = require("path")
const fs= require("fs")
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
module.exports = {
  target: "node",
  entry: path.resolve("app.ts"),
  output: {
    path: path.resolve(__dirname, "server"),
    filename: "app.js",
    library: "app",
    umdNamedDefine: true,
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js" ],
    modules: [
      path.resolve("src"),
      path.resolve("."),
      "node_modules"
    ],

  },
  module: {
    loaders: [
      { test: /\.ts?$/, loader: "awesome-typescript-loader" }
    ]
  },
  externals: nodeModules,
  devtool: 'sourcemap'


};
