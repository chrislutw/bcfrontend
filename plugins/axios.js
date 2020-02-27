import { mutationNames } from '~/store'

export default function({ $axios, store, redirect, route, app }) {
  $axios.onRequest((config) => {
    if (typeof config.url === 'string' && config.url.startsWith('/')) {
      if (process.client && store.state.igsBlockChain.token) {
        config.headers.common.Authorization =
          'Bearer ' + store.state.igsBlockChain.token
      }
    }
  })

  $axios.onResponseError((err) => {
    console.log('axios ResponseError: ', err)
    // console.log('axios plugin $auth: ', app.$auth)
    if (err.response) {
      switch (err.response.status) {
        case 401:
          store.commit(mutationNames.resetStore)
          console.log('401:', route)
          redirect({
            path: '/',
            query: { redirect: route.fullPath }
          })
          break
      }
    }
  })
}
