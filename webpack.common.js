const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    bundle: './src/assets/scripts/main.ts'
  },
  output: {
    path: path.join(__dirname, '/dist/assets/scripts/'),
    filename: '[name].js'
  },
  cache: {
    type: 'filesystem',

    buildDependencies: {
      config: [__filename]
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.json'
          }
        }
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/assets/scripts/')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
