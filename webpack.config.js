const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    // Options
    env = env || {};
    const isAot = env.aot ? true : false;
    const isProd = env.prod ? true : isAot ? true : false;

    // Webpack config
    const config = {
        entry: {
            'polyfills': './src/polyfills.ts',
            'vendor': './src/vendor.ts',
            'app': './src/main.ts',
        },
        output: {
            path: path.join(__dirname, '/www/assets'),
            filename: isProd ? '[name].[hash].bundle.js' : '[name].bundle.js',
        },
        devtool: isProd ? false : 'inline-source-map',
        resolve: {
            extensions: ['.ts', '.js', '.css', '.scss', '.html'],
        },
        plugins: [
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
            }),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.join(__dirname, './src'), {}
            ),
            new ExtractTextPlugin({
                filename: isProd ? "style.[hash].bundle.css" : "style.bundle.css",
                allChunks: true
            })
        ],
        module: {
            rules: [{
                test: /\.(css|scss)$/,
                exclude: path.join(__dirname, './src/app'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            }, {
                test: /\.component\.(css|scss)$/,
                use: ['to-string-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                use: ['file-loader']
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['url-loader']
            }, {
                test: /\.html$/,
                use: ['html-loader']
            }]
        }
    };

    // Production build
    if (isProd) {
        config.plugins.push(
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

    // AoT compile
    if (isAot) {
        const AotPlugin = require('@ngtools/webpack').AotPlugin;
        config.plugins.push(
            new AotPlugin({
                tsConfigPath: './tsconfig.aot.json',
                entryModule: path.join(__dirname, './src/app/app.module#AppModule')
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
            exclude: /node_modules/,
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        });
    }

    return config;
};