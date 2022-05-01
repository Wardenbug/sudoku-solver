const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
};

module.exports = config;