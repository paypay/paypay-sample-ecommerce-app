const path = require('path')

module.exports = {
  publicPath: process.env.LOCAL ? '/' : '../',
  outputDir: './dist',
  assetsDir: 'assets',
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
        publicPath: '',
        name: 'assets/img/[name].[contenthash:8].[ext]',
      })
    config.module
      .rule('svg')
      .test(/.svg$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        publicPath: '',
        name: 'assets/img/[name].[contenthash:8].[ext]',
      })
  },
  configureWebpack: {
    entry: './src/main.ts',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
      },
    },
    devtool: process.env.NODE_ENV === 'production' ? '(none)' : 'source-map',
  },
  pluginOptions: {
    i18n: {
      locale: 'ja',
      fallbackLocale: 'ja',
      localeDir: 'i18n',
      enableInSFC: true,
    },
  },
}
