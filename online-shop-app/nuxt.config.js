module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'online-shop-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
        sassOptions: {
          includePaths: ['node_modules']
        }
      }
    }
  },
  vuex: {
    store: true,
  },
  css: [
    '@/assets/styles/main.scss',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],
  modules: [
    'bootstrap-vue/nuxt'
  ],
   bootstrapVue: {
    icons: true
  },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
