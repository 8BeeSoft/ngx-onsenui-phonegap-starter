const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // プロダクションビルド判定
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  // プラグイン設定
  const plugins = [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(__dirname, './src'), {}
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.join(__dirname, '/src/index.ejs'),
      filename: path.join(__dirname, '/www/index.html'),
      minify: {
        removeComments: isProd,
      }
    })
  ];

  // プロダクションビルド用プラグイン追加
  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        }
      })
    );
  }

  return {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts',
    },
    output: {
      path: path.join(__dirname, '/www/assets'),
      filename: '[name].bundle.js',
    },
    devtool: isProd ? false : 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js', '.css', '.scss', '.html'],
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.component\.(css|scss)$/,
          exclude: /node_modules/,
          use: ['to-string-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
          test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
          use: ['url-loader']
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['url-loader']
        }, {
          test: /\.html$/,
          use: ['html-loader']
        }
      ]
    }
  };
};