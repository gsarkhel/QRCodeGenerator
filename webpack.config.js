const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const assetSrc = path.resolve(__dirname, "src/");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/js/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    // disableHostCheck: true, // That solves browserstack issue
  },
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
