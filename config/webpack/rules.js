module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /node_modules/,
    loader: 'url-loader?prefix=font/&limit=5000'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  },
//   {
//     test: /\.(jpe?g|png|gif|svg|pdf)$/i,
//     // use: ['url-loader?limit=10000', 'img-loader']
//     // use: 'file-loader?name=/src/images/[name].[ext]'
//     loader: 'url-loader?name=app/images/[name].[ext]'
//   },
  {
    test: /\.(jpg|png|gif|svg|pdf)$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]', outputPath: './assets/images/' }
      }
    ]
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      }
    ]
  },
  {
    test: /\.s(a|c)ss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }
];
