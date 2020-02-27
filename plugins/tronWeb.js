export default ({ $axios, $auth }, inject) => {
  const Tron = {
    isInstalled() {
      return !!window.tronWeb
    },
    isLoggedIn() {
      return !!window.tronWeb && !!window.tronWeb.ready
    },
    accountAddress() {
      return window.tronWeb.trx.tronWeb.defaultAddress.base58
    },
    createReturnMessage() {
      return { code: 0, message: 'success', result: null, error: null }
    },
    async login() {
      const returnMessage = this.createReturnMessage()
      if (!this.isInstalled()) {
        returnMessage.code = -1
        returnMessage.message = 'Tron extension not Installed.'
        return returnMessage
      }
      if (!this.isLoggedIn()) {
        returnMessage.code = -2
        returnMessage.message = 'Tron extension not LoggedIn.'
        return returnMessage
      }

      const mes = 'bcunit.com'
      let signToken = null
      try {
        signToken = await window.tronWeb.trx.sign(window.tronWeb.toHex(mes))
      } catch (error) {
        returnMessage.code = -3
        returnMessage.message = 'Tron extension sign error.'
        returnMessage.error = error
        return returnMessage
      }

      const account = {
        userId: this.accountAddress(),
        password: signToken
      }

      try {
        returnMessage.result = await $axios.$post('/tronLogin', account)
      } catch (error) {
        returnMessage.code = -4
        returnMessage.message = 'API TronLogin error.'
        returnMessage.error = error
      }
      return returnMessage
    },
    async getBalance() {
      const returnMessage = this.createReturnMessage()
      if (!this.isInstalled()) {
        returnMessage.code = -1
        returnMessage.message = 'Tron extension not Installed.'
        return returnMessage
      }
      if (!this.isLoggedIn()) {
        returnMessage.code = -2
        returnMessage.message = 'Tron extension not LoggedIn.'
        return returnMessage
      }

      try {
        let balance = await window.tronWeb.trx.getBalance(this.accountAddress())
        // let balance = await window.tronWeb.trx.getUnconfirmedBalance(
        //   this.accountAddress()
        // )
        balance = balance / 1000000
        returnMessage.result = balance
      } catch (error) {
        returnMessage.code = -3
        returnMessage.message = 'Tron extension sign error.'
        returnMessage.error = error
        return returnMessage
      }
      return returnMessage
    },
    async sendTransaction(toAddress, amount) {
      const returnMessage = this.createReturnMessage()
      if (!this.isInstalled()) {
        returnMessage.code = -1
        returnMessage.message = 'Tron extension not Installed.'
        return returnMessage
      }
      if (!this.isLoggedIn()) {
        returnMessage.code = -2
        returnMessage.message = 'Tron extension not LoggedIn.'
        return returnMessage
      }

      try {
        const resp = await window.tronWeb.trx.sendTransaction(
          toAddress,
          amount * 1000000
        )
        console.log('tronWeb sendTransaction resp: ', resp)
        if (resp.result) {
          let balance = await window.tronWeb.trx.getBalance(
            this.accountAddress()
          )
          // let balance = await window.tronWeb.trx.getUnconfirmedBalance(
          //   this.accountAddress()
          // )
          balance = balance / 1000000
          resp.balance = balance
          returnMessage.result = resp
        } else {
          returnMessage.code = -5
          returnMessage.message = 'Tron extension sendTransaction fail.'
        }
      } catch (error) {
        returnMessage.code = -4
        returnMessage.message = 'Tron extension sendTransaction error.'
        returnMessage.error = error
        return returnMessage
      }
      return returnMessage
    }
  }
  inject('tron', Tron)
}
