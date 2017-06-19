const path = require("path");
const webpack = require("webpack");

const config = {
  context: __dirname,
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/public/"
  },
  devtool: process.env.NODE_ENV === "development"
    ? "cheap-module-source-map" /** || 'source-map' || 'cheap-eval-source-map' || 'eval' */
    : false,
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
        test: /\.jsx?$/
      },
      {
        loader: "json-loader",
        test: /\.json$/
      },
      {
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        test: /\.jsx?$/
      }
      // {
      //   test: /\.css$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         url: false
      //       }
      //     }
      //   ]
      // }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", "json"]
    /**
     * alias: {
     *  react: 'preact-compat',
     * 'react-dom': 'preact-compat'
     * }
     */
  },
  stats: {
    chunks: true,
    colors: true,
    reasons: true
  }
};

if (process.env.NODE_ENV === "development") {
  config.entry.unshift(
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
  );
}

module.exports = config;
