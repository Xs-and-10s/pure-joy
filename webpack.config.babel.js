const { resolve } = require("path");
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
    // devServer: {
    //   hot: true,
    //   publicPath: '/public/',
    //   historyApiFallback: true
    // },
    entry: {
      app: ["./ClientApp.jsx"]
      // vendor: ["./index.css", "./App.css", "../public/data.json"]
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
          include: resolve("src"),
          use: "json-loader",
          test: /\.json$/
        },
        {
          exclude: /node_modules/,
          include: resolve("src"),
          use: "babel-loader",
          test: /\.jsx?$/
        },
        {
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
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
          use: "svg-loader"
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
      // new OfflinePlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: ifProduction("production", "development")
        }
      })
    ]),
    resolve: {
      extensions: [".js", ".json", ".jsx"]
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    }
  };

  if (env.debug) {
    console.log(config);
    debugger; //eslint-disable-line
  }

  if (process.env.NODE_ENV === "development") {
    config.entry.app.unshift(
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
    );
  }

  return config;
};
