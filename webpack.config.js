const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    contact: "./contact",
    abandon_survey: "./abandon-survey.js",
    success_survey: "./success-survey.js",
    general_survey: "./general-survey.js",
    cloud_login: "./cloud-login.js",
    embedding_code: "./embedding-code",
  },
  output: {
    path: path.resolve(__dirname, "./js"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".json", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@apps": path.resolve(__dirname, "src/apps"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // devtool: "cheap-module-source-map",
  devtool: "inline-source-map",
  devServer: {
    // static: "./dist",
    hot: true,
  },
};
