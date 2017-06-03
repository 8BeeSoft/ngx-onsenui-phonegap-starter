const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // プラグイン設定
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './src/index.html'),
      filename: path.join(__dirname, './www/index.html'),
    }),
    new webpack.ProvidePlugin({
      ons: 'onsenui',
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), "src"), {}
    ),
  ];

  // PostCSS設定
  const postcssPlugins = () => {
    autoprefixer
  }

  // ビルド設定
  const config = {
    entry: {
      main: [
        "./src/main.ts"
      ],
      polyfills: [
        "./src/polyfills.ts"
      ],
      styles: [
        "./src/styles.scss"
      ]
    },
    output: {
      path: path.join(process.cwd(), "www"),
      filename: "[name].bundle.js",
      chunkFilename: "[id].chunk.js"
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          include: path.join(process.cwd(), "src/styles.scss"),
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugins
              }
            },
            'sass-loader'
          ]
        }, {
          exclude: path.join(process.cwd(), "src/styles.scss"),
          test: /\.scss$/,
          use: [
            'to-string-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugins
              }
            },
            'sass-loader'
          ]
        }, {
          test: /\.html$/,
          use: ['html-loader']
        }, {
          "test": /\.(eot|svg)$/,
          "loader": "file-loader?name=[name].[ext]"
        }, {
          "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
          "loader": "url-loader?name=[name].[ext]"
        }, {
          test: /\.ts$/,
          use: ['awesome-typescript-loader', 'angular2-template-loader']
        },
      ]
    },
    plugins: plugins
  }

  return config;
}
