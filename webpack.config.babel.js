const { resolve } = require("path");
// const resolve = require("path").resolve;
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineManifestPlugin = require("inline-manifest-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require("offline-plugin");

const { getIfUtils, removeEmpty } = require("webpack-config-utils");

export default env => {
  const { ifProduction, ifNotProduction } = getIfUtils(env);

  const config = {
    context: resolve("src"),
    devtool: ifProduction("source-map", "eval"),
    entry: {
      app: "./index.js",
      vendor: ["./index.css", "./App.css", "../public/data.json"]
    },
    module: {
      rules: [
        // {
        //   enforce: "pre",
        //   exclude: /node_modules/,
        //   loader: "eslint-loader",
        //   test: /\.jsx?$/
        // },
        {
          loader: "json-loader",
          test: /\.json$/
        },
        {
          exclude: /node_modules/,
          include: resolve("src"),
          loader: "babel-loader",
          test: /\.jsx?$/
        },
        {
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader"
          }),
          test: /\.css$/
          // use: [
          //   "style-loader",
          //   {
          //     loader: "css-loader",
          //     options: {
          //       url: false
          //     }
          //   }
          // ]
        },
        {
          exclude: /node_modules/,
          test: /\.svg$/,
          loader: "svg-loader"
        }
      ]
    },
    output: {
      filename: ifProduction(
        "bundle.[name].[chunkhash].js",
        "bundle.[name].js"
      ),
      path: resolve("dist"),
      pathinfo: ifNotProduction(),
      publicPath: "/dist/"
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new ExtractTextPlugin(
        ifProduction("styles.[name].[chunkhash].css", "styles.[name].css")
      ),
      ifProduction(new InlineManifestPlugin()),
      ifProduction(
        new webpack.optimize.CommonsChunkPlugin({
          name: ["vendor", "manifest"]
        })
      ),
      new HtmlWebpackPlugin({
        template: "../public/index.html"
      }),
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: ifProduction("production", "development")
        }
      })
    ])
  };

  if (env.debug) {
    console.log(config);
    debugger; //eslint-disable-line
  }

  return config;
};
