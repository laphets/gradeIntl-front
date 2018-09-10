module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/api': {
        target: 'https://intl.zjuqsc.com/api',
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}