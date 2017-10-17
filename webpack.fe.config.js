const path = require("path")
const webpack = require("webpack")
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
module.exports = {
  name: "client",
  entry: [
    path.resolve("src/public/index/index.js")
  ],
  output: {
    path: path.resolve(__dirname, "./dist/public/js"),
    filename: "app.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /images\/.+\.(png|jpg|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /(font|fonts)\/.+\.(eot|ttf|svg|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ]
  }
}
