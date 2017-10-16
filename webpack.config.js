const path = require("path")
const fs = require("fs")
const webpack = require("webpack")
const {resolve} = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CheckerPlugin } = require('awesome-typescript-loader')

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  name: "server",
  target: "node",
  entry: [
    path.resolve("src/app.ts")
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
    libraryTarget: "commonjs",
    publicPath: "/"
  },
  node: {
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\/views\/.+\.jade?$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "src"
        },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve("src"),
      "node_modules",
      path.resolve(__dirname, "."),
    ],
    extensions: [ ".ts", ".tsx", ".js"],
  },
  plugins: [
    new CheckerPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
  new CopyWebpackPlugin([
      /**
       * By default the copy plugin won't overwrites files which
       * already copied, so make sure copy overwrites files first.
       */
       {
        from: resolve(__dirname, "./views"),
        to: resolve(__dirname, "./dist/views"),
      },
    ]),

  ],
  devtool: "source-map",
  externals: nodeModules
};
