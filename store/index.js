import { Message } from 'element-ui'
export const createWallet = () => ({
  trx: 0,
  eth: 0,
  btc: 0
})

export const createAddress = () => ({
  trx: false,
  eth: false,
  btc: false
})

export const mutationNames = {
  resetStore: 'RESETSTORE'
}

export const actionNames = {
  login: 'LOGIN',
  logout: 'LOGOUT',
  signup: 'SIGNUP',
  createContinueJobToQueryWallet: 'CREATE_CONTINUE_JOB_TO_QUERY_WALLET',
  getSelfWallet: 'GET_SELF_WALLET'
}

export const mutations = {
  [mutationNames.resetStore](state) {
    this.$auth.$storage.setUniversal('token', false)
    this.$auth.$storage.setUniversal('userInfo', false)
    this.$auth.$storage.setUniversal('bankWallet', createWallet(), true)
    this.$auth.$storage.setUniversal('selfWallet', createWallet(), true)
    this.$auth.$storage.setUniversal('walletJob', null)
  }
}

export const actions = {
  nuxtServerInit({ commit }, { store, $auth }) {
    // 使用者進入網站後的第一個server hook
    $auth.$storage.syncUniversal('token', false)
    $auth.$storage.syncUniversal('userInfo', false)
    $auth.$storage.syncUniversal('bankWallet', createWallet(), true)
    $auth.$storage.syncUniversal('selfWallet', createWallet(), true)
    $auth.$storage.syncUniversal('walletJob', null)
  },

  async [actionNames.logout]({ state, commit }) {
    try {
      const walletJob = state.igsBlockChain.walletJob
      if (walletJob) {
        clearInterval(walletJob)
        this.$auth.$storage.setUniversal('walletJob', null)
      }
      const result = await this.$axios.$get('/logout')
      if (result.status === 0) {
        console.log('logout success')
        const wallet = createWallet()
        this.$auth.$storage.setUniversal('bankWallet', wallet, true)
        this.$auth.$storage.setUniversal('selfWallet', wallet, true)
        this.$auth.$storage.setUniversal('userInfo', false)
        this.$auth.$storage.setUniversal('token', false)
        Message({
          type: 'success',
          message: '您已登出'
        })
        this.$router.push('/')
      }
    } catch (error) {
      Message({
        message: '登出失敗, 網路發生異常',
        type: 'error'
      })
      console.log('logout error: ', error)
    }
  },
  [actionNames.createContinueJobToQueryWallet]({ commit, dispatch, state }) {
    const walletJob = state.igsBlockChain.walletJob
    if (walletJob) {
      clearInterval(walletJob)
      this.$auth.$storage.setUniversal('walletJob', null)
    }
    if (state.igsBlockChain.userInfo) {
      const repeatFunction = async () => {
        let resp = null
        try {
          if (state.igsBlockChain.userInfo) {
            // 取得 bank 錢包金額
            resp = await this.$axios.$get('/wallets')
            console.log('get wallets:', resp)
            const bankWallet = { ...state.igsBlockChain.bankWallet }
            if (resp.wallets[2] != null) {
              bankWallet.trx = resp.wallets[2] / 1000000
              this.$auth.$storage.setUniversal('bankWallet', bankWallet)
            } else {
              bankWallet.trx = 0
              this.$auth.$storage.setUniversal('bankWallet', bankWallet)
            }
            // 取得 tron 錢包金額
            dispatch(actionNames.getSelfWallet)
          }
        } catch (error) {
          const walletJob = this.$auth.$storage.getState('walletJob')
          if (walletJob) {
            clearInterval(walletJob)
            this.$auth.$storage.setUniversal('walletJob', null)
          }
          console.log('get wallets error: ', error)
        }
      }
      repeatFunction()
      const intervalInstance = setInterval(repeatFunction, 5000)
      this.$auth.$storage.setUniversal('walletJob', intervalInstance)
    }
  },
  async [actionNames.getSelfWallet]({ commit, state }) {
    const { result: balance, code } = await this.$tron.getBalance()
    console.log('code: ', code, ', balance: ', balance)
    let result = null
    if (code === 0) {
      result = balance
    } else {
      result = 0
    }
    if (state.igsBlockChain.userInfo) {
      const wallet = { ...state.igsBlockChain.selfWallet }
      wallet.trx = result
      this.$auth.$storage.setUniversal('selfWallet', wallet)
    }
  }
}
