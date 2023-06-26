const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
          { test: /\.css$/, use: 'style-loader' },
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
      ]
}