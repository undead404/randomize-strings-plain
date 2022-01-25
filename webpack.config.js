const path = require("path");

const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

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
  ],
};
