var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
}), new webpack.optimize.UglifyJsPlugin();

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}

var config = {
    entry: {
        app: APP_DIR + '/index.jsx',
        vendor: [
            'history',
            'react',
            'react-dom',
            'react-router'
        ]
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        })

        /*
         new webpack.DefinePlugin({
         'process.env': {
         'NODE_ENV': JSON.stringify('production')
         }
         })
         ,
         new webpack.optimize.DedupePlugin(),
         new webpack.optimize.UglifyJsPlugin(),
         new webpack.optimize.AggressiveMergingPlugin()*/

    ],
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader",
                }),
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            },


            {
                test: /\.css$/,
                loader: 'css-loader',
                exclude: /node_modules/,
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },

            {
                test: /\.scss$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    target: 'web'
};

module.exports = config;