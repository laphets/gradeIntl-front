module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}