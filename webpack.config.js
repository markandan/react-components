const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    "app": "./src/index.js"
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './dist'
  },
  module: {
     rules: [
       {
           test: /\.jsx?$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
       },
       {
           test: /(\.css|\.scss|\.sass)$/,
           use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary
              use: ['css-loader', 'sass-loader']
           })
       },{
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   },
   plugins: [
     new CleanWebpackPlugin(['dist']),
     new ExtractTextPlugin('style.css'),
     new HtmlWebpackPlugin ({
         template: 'index.ejs',
         title: 'React Components'
     })
   ]
};
