const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    entry: "./src/index.js",
    mode: process.env.NODE_ENV || "production",
    devServer: {
        static: path.join(__dirname, "dist"),
        port: process.env.PORT,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    output: {
        publicPath: process.env.PUBLIC_URL || "auto",
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app1',
            remotes: {
                app2: `app2@${process.env.MFS2_URL}/remoteEntry.js`,
            },
            shared: {
                'react': { singleton: true, },
                'react-dom': { singleton: true }
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
