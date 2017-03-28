const webpack = require('webpack');
const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // Webpack config
  const config = {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts',
    },
    output: {
      path: helpers.root('www', 'assets'),
      filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js', '.css', '.scss', '.html'],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills'],
        minChunks: Infinity
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('src'), {}
      ),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: helpers.root('src', 'index.ejs'),
        filename: helpers.root('www', 'index.html'),
      }),
      new ExtractTextPlugin({
        filename: "style.bundle.css",
        allChunks: true
      })
    ],
    module: {
      rules: [{
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader']
      }, {
        test: /\.html$/,
        use: ['html-loader']
      }, {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: ['file-loader']
      }, {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }, {
        test: /\.(s?css)$/,
        include: helpers.root('src', 'app'),
        use: ['to-string-loader', 'css-loader', 'postcss-loader']
      }]
    }
  };

  return config;
};