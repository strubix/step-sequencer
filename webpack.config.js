const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer'),
                                ];
                            },
                        },
                    }, {
                        loader: 'sass-loader',
                    }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ttf|otf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(wav)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: 'src'
                        },
                    },
                ],
            },
            {
                test: /node_modules[/\\]createjs/,
                loaders: [
                    'imports-loader?this=>window',
                    'exports-loader?window.createjs',
                ],
            },
        ],
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({template: './src/index.html'}),
    ],
    mode: 'development',
    resolve: {
        alias: {
            createjs: 'createjs/builds/1.0.0/createjs.js'
        }
    },
};