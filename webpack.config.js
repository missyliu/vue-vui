var path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: {
    'vue-vui': './components/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'VUI',
    libraryTarget: 'umd'
  },
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.es6', '.vue']
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
  // ,
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     sourceMap: false,
  //     drop_console: true,
  //     compress: {
  //         warnings: false
  //     }
  //   })
  // ]
};
