// import Merge from 'deepmerge'

export const mutationNames = {
  setToken: 'SET_TOKEN',
  setUser: 'SET_USER',
  openPopup: 'OPEN_POPUP',
  setSelfTronWallet: 'SET_SELF_TRON_WALLET',
  setBankTronWallet: 'SET_BANK_TRON_WALLET',
  setWalletJob: 'SET_WALLET_JOB'
}
export const actionNames = {
  login: 'LOGIN',
  logout: 'LOGOUT',
  signup: 'SIGNUP',
  createContinueJobToQueryWallet: 'CREATE_CONTINUE_JOB_TO_QUERY_WALLET',
  getSelfWallet: 'GET_SELF_WALLET'
}
export const createWallet = () => ({
  trx: 0,
  eth: 0,
  btc: 0
})

export const state = () => ({
  count: 0,
  token: null,
  user: null,
  bankWallet: createWallet(),
  selfWallet: createWallet(),
  walletJob: null,
  expire: 1
})

export const mutations = {
  increase: (state) => state.count++,
  [mutationNames.setToken]: (state, payload) => {
    state.token = payload
  },
  [mutationNames.setUser]: (state, payload) => {
    state.user = payload
  },
  [mutationNames.setSelfTronWallet]: (state, payload) => {
    state.selfWallet.trx = payload
  },
  [mutationNames.setBankTronWallet]: (state, payload) => {
    state.bankWallet.trx = payload
  },
  [mutationNames.setWalletJob]: (state, payload) => {
    state.walletJob = payload
  }
}

export const actions = {
  async [actionNames.logout]({ commit }) {
    try {
      const res = await this.$axios.$post('/logout')
      commit(mutationNames.setUser, res)
    } catch (error) {
      console.log(actionNames.login, error)
    }
  },
  [actionNames.createContinueJobToQueryWallet]({ commit, dispatch, state }) {
    if (state.walletJob) {
      clearInterval(state.walletJob)
      commit(mutationNames.setWalletJob, null)
    }
    if (state.user) {
      const repeatFunction = async () => {
        let resp = null
        try {
          if (state.user) {
            // 取得 bank 錢包金額
            resp = await this.$axios.$get('/wallets')
            console.log('get wallets:', resp)
            if (resp.wallets[2] != null) {
              commit(mutationNames.setBankTronWallet, resp.wallets[2] / 1000000)
            } else {
              commit(mutationNames.setBankTronWallet, 0)
            }
            // 取得 tron 錢包金額
            dispatch(actionNames.getSelfWallet)
          }
        } catch (error) {
          if (state.walletJob) {
            clearInterval(state.walletJob)
            commit(mutationNames.setWalletJob, null)
          }
          console.log('get wallets error: ', error)
        }
      }
      repeatFunction()
      const intervalInstance = setInterval(repeatFunction, 5000)
      commit(mutationNames.setWalletJob, intervalInstance)
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
    if (state.user) commit(mutationNames.setSelfTronWallet, result)
  }
}
