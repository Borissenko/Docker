module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: true,
    noInfo: true,
    quiet: true,

    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080
  }
};