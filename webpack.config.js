const path = require("path");

const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");
var WebpackPwaManifest = require("webpack-pwa-manifest");
const WorkboxPlugin = require("workbox-webpack-plugin");

const environment = process.env.NODE_ENV ?? "development";

dotenv.config();

module.exports = {
  devServer:
    environment === "development"
      ? {
          hot: true,
          static: "./dist",
        }
      : undefined,
  devtool: environment === "development" ? "inline-source-map" : "source-map",
  entry: "./src/index.js",
  mode: environment,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "url-loader",
      },
    ],
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  output: {
    clean: true,
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new EnvironmentPlugin(["RANDOM_API_KEY"]),
    new HtmlWebpackPlugin({
      //   title: "Shuffle strings",
      // Load a custom template (lodash by default)
      template: "src/index.html",
    }),
    new WebpackPwaManifest({
      background_color: "#ffffff",
      description: "Shuffle strings with true randomness",
      icons: [
        {
          src: path.resolve("assets/images/icon512.png"),
          sizes: [32, 96, 128, 192, 256, 384, 512], // multiple sizes
        },
      ],
      ios: true,
      name: "Shuffle Strings",
      short_name: "Shu Stri",
      theme_color: "#FF0000",
    }),
    new WorkboxPlugin.InjectManifest({
      swDest: "service-worker.js",
      swSrc: "./src/service-worker.js",
    }),
  ],
};
