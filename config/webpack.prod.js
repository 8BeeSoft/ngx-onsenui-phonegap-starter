const webpack = require('webpack');
const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // Options
  env = env || {};
  const isAot = env === 'aot' ? true : false;

  // Webpack config
  const config = {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': ['./src/style.scss', './src/main.ts'],
    },
    output: {
      path: helpers.root('www', 'assets'),
      filename: '[name].[hash].bundle.js',
    },
    devtool: false,
    resolve: {
      extensions: ['.ts', '.js', '.css', '.scss', '.html']
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
      // new webpack.LoaderOptionsPlugin({
      //   minimize: true,
      //   debug: false
      // }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        }
      }),
      new webpack.NormalModuleReplacementPlugin(/\.\/environments\/environment/, './environments/environment.prod'),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: helpers.root('src', 'index.ejs'),
        filename: helpers.root('www', 'index.html'),
        minify: {
          removeComments: true,
        }
      }),
      new ExtractTextPlugin({
        filename: "style.[hash].bundle.css",
        allChunks: true
      }),
    ],
    module: {
      rules: [{
        test: /\.html$/,
        use: ['html-loader']
      }, {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        use: ['file-loader']
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ['url-loader']
      }, {
        test: /\.css$/,
        exclude: helpers.root('src','app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }, {
        test: /\.scss$/,
        exclude: helpers.root('src','app'),
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.component.(s?css)$/,
        include: helpers.root('src', 'app'),
        use: ['to-string-loader', 'css-loader', 'postcss-loader']
      }]
    }
  };

  // AoT compile
  if (isAot) {
    const AotPlugin = require('@ngtools/webpack').AotPlugin;
    config.plugins.push(
      new AotPlugin({
        tsConfigPath: helpers.root('tsconfig.aot.json'),
        entryModule: helpers.root('src', 'app', 'app.module#AppModule'),
      })
    );
    config.module.rules.push({
      test: /\.ts$/,
      use: ['@ngtools/webpack']
    });
  }
  else {
    config.module.rules.push({
      test: /\.ts$/,
      use: ['awesome-typescript-loader', 'angular2-template-loader']
    });
  }

  return config;
};