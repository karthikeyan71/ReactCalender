var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: "./index.js",
  output: {
    publicPath: '/',
    filename: "./src/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [ "babel-loader" ]
      },
      {
        test: /\.(css|scss)/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [ "file-loader" ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new DashboardPlugin()
  ],
  devServer : {
    historyApiFallback: true
  }
}
