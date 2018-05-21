const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'sourcemap',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                camelCase: true
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: (function() {
        const plugins = [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: isProduction ? '"production"' : '"development"'
                }
            }),
            new ExtractTextPlugin({
                filename: 'bundle.css',
                disable: false
            })
        ];

        if (isProduction) {
            plugins.push(new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }));
        }

        return plugins;
    })(),
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
