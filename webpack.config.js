/**
 * Created by Simon on 2016/11/22.
 */
const path = require("path");
const webpack = require("webpack");
const copyPlugin = require("copy-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "all.min": ["babel-polyfill", "./devPkg/main.js"]
    },
    output: {
        path: path.join(__dirname, './static'),
        publicPath: 'static/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'lensyn-ui',
        umdNamedDefine: true
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
            },
            {
              test: /\.sass$/,
              loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|woff2|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new copyPlugin([
        //     { from: "./devPkg/images", to: "./images" }
        // ])
        new ExtractTextPlugin('./style/main.css')
    ],
    devServer: { 
        proxy: {
            "/api": {
                target: "http://192.168.31.9:18080",
                ws:true, // 为true表示可以给webscoket使用
                pathRewrite: {"^/api": ""},
                secure: false,
                
            },
            "/pics": {
                target: "http://192.168.31.9:30000/public",
                pathRewrite: {"^/pics": ""},
                secure: false,
            },
            '/ms': {//维护系统的api代理
                target: 'http://192.168.31.9:8081',
                pathRewrite: {'^/ms' : ''}, //重定向
                secure: false
            },
        }
    }
};