const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src/');
const DIST_DIR = path.resolve(__dirname, 'dist/');

module.exports = {
    entry: './src/js/index.js',
    output: {
      path: DIST_DIR,
      filename: 'my-app.bundle.js',
      publicPath: 'dist/'
    },
    devServer: {
      contentBase: DIST_DIR,
      compress: true,
      port: 3000
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader"
          ]
        }
      ]
    }
}
