const path = require("path");

module.exports = {
  context: __dirname,
  devServer: {
    historyApiFallback: true,
    publicPath: "/public/"
  },
  devtool: "cheap-module-source-map" /** || 'source-map' || 'eval' */,
  entry: "./src/index.js",
  module: {
    rules: [
      {
        enforce: "pre",
        exclude: "node_modules",
        loader: "eslint-loader",
        test: /\.js$/
      },
      {
        loader: "json-loader",
        test: /\.json$/
      },
      {
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        test: /\.js$/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public"),
    publicPath: "/public/"
  },
  resolve: {
    extensions: [".js", "json"]
  },
  stats: {
    chunks: true,
    colors: true,
    reasons: true
  }
};
