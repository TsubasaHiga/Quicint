/**
 *
 * webpack.config
 *
 * @description production に設定すると最適化、 development に設定するとソースマップ有効.
 *
 */
const webpack = require('webpack');

const config = {
  watch : false,
  mode  : 'development',
  entry : {
    bundle : './src/assets/js/main.js'
  },
  output : {
    path     : __dirname,
    filename : '[name].js'
  },
  devtool : 'cheap-module-source-map',
  module  : {
    rules : [
      {
        test : /\.js$/,
        use  : [
          {
            loader  : 'babel-loader',
            options : {
              presets : [
                [
                  '@babel/preset-env',
                  {
                    modules : false
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test : /\.css/,
        use  : [
          'style-loader',
          {
            loader  : 'css-loader',
            options : { url : false }
          }
        ]
      }
    ]
  }
};

module.exports = config;
