require('./env.config')

let dotenvFilename
let terserOptions
let vueConfig
// const nuxtVuexLocalstorageOptions = {
//   localStorage: ['igsBlockChain'],
//   sessionStorage: ['igsBlockChain']
// }

if (process.env.NODE_ENV === 'production') {
  if (process.env.DEPLOY_ENV === 'staging') {
    dotenvFilename = '.env.staging'
    terserOptions = {
      compress: { drop_debugger: false },
      output: { comments: true }
    }
    vueConfig = {
      productionTip: true,
      devtools: true
    }
  } else {
    dotenvFilename = '.env.prod'
    terserOptions = {
      compress: { drop_console: true }
    }
    vueConfig = {
      productionTip: false,
      devtools: false
    }
  }
} else {
  dotenvFilename = '.env'
  terserOptions = {
    compress: { drop_debugger: false },
    output: { comments: true }
  }
  vueConfig = {
    productionTip: true,
    devtools: true
  }
}

module.exports = {
  server: {
    // port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // css reset
    'normalize.css',
    // css 動畫庫
    'animate.css/animate.css',
    // element ui css
    '~/scss/element-variable.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/element-ui',
    { src: '~/plugins/clipboard', mode: 'client' },
    { src: '~/plugins/tronWeb', mode: 'client' },
    '~/plugins/moment'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    // Doc: https://github.com/rubystarashe/nuxt-vuex-localstorage
    // ['nuxt-vuex-localstorage', nuxtVuexLocalstorageOptions],
    // Doc: https://portal-vue.linusb.org/
    'portal-vue/nuxt'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: false,
        tokenRequired: false
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/'
    },
    vuex: { namespace: 'igsBlockChain' },
    localStorage: {
      prefix: 'igsBlockChain.'
    },
    cookie: {
      prefix: 'igsBlockChain.',
      options: {
        path: '/'
      }
    }
  },
  /**
   * 環境變數設定
   * .env.prod: 正式環境
   * .env: 測試環境
   */
  dotenv: {
    filename: dotenvFilename
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  styleResources: {
    scss: ['~scss/_setup.scss']
  },
  vue: { config: vueConfig },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    terser: {
      terserOptions
    }
  }
}
