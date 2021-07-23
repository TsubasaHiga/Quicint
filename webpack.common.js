const webpack = require('webpack')
const path = require('path')

module.exports = {
  watch: false,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  entry: {
    bundle: './src/assets/scripts/main.ts',
  },
  output: {
    path: path.join(__dirname, '/dist/assets/scripts/'),
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
