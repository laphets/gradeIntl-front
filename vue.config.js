module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:8290',
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}