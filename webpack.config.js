const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'centroid-tracker-js.min.js',
    },
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
      },
  };