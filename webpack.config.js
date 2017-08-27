const path = require("path")
const fs= require("fs")
console.log(path.resolve("src"))

module.exports = {
  name: "server",
  target: "node",
  entry: path.resolve("src/app.ts"),
  output: {
    path: path.resolve("server"),
    filename: "app.js",
    libraryTarget: "commonjs"
  },
  module: {
    // Disable handling of unknown requires
    unknownContextRegExp: /$^/,
    unknownContextCritical: false,

    // Disable handling of requires with a single expression
    exprContextRegExp: /$^/,
    exprContextCritical: false,

    // Warn for every expression in require
    wrappedContextCritical: true,
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: 'awesome-typescript-loader',
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve("src"),
      "node_modules"
    ],
    extensions: [ ".ts", ".tsx", ".js" ],
  },

};
