const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    // Build option
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
            filename: '[name].bundle.js',
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
            )
        ],
        module: {
            rules: [{
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.component\.(css|scss)$/,
                exclude: /node_modules/,
                use: ['to-string-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                use: ['url-loader']
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
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        });
    }
    
    return config;
};