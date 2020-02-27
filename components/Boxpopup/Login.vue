<template>
  <div class="box_popup_container_main col-3 m-col-12 ms-col-12">
    <p>
      <a @click="close" href="javascript:void(0)" class="btn_x"></a>
    </p>
    <p class="box_btn_container">
      <a href="javascript:void(0)" class="btn_link btn_metamask">
        <img src="~/assets/images/icon_metamask.svg" />
        <span>METAMASK</span>
      </a>
      <a
        @click="tronLogin"
        href="javascript:void(0)"
        class="btn_link btn_tronLink"
      >
        <img src="~/assets/images/icon_tronLink.svg" />
        <span>TronLink</span>
      </a>
    </p>
    <p class="txt-center">或在這裡登入</p>
    <hr />
    <h3>
      登入 /
      <a
        @click="openRegister"
        href="javascript:void(0)"
        class="btn_popup_register"
      >
        註冊
      </a>
    </h3>
    <div class="row">
      <input
        v-model.trim="login.email"
        @keyup.enter="$event.target.nextElementSibling.focus()"
        type="text"
        class="col-12 m-col-6 ms-col-12"
        placeholder="User Name"
        name="UserName"
        required
      />
      <input
        v-model.trim="login.password"
        @keyup.enter="emailLogin"
        type="password"
        class="col-12 m-col-6 ms-col-12"
        placeholder="Password"
        name="Password"
        required
      />
    </div>
    <p style="height: 32px;">
      <label class="container" style="float: right;">
        紀錄
        <input type="checkbox" checked="checked" />
        <span class="checkmark"></span>
      </label>
    </p>
    <p class="box_btn_container">
      <a
        @click="emailLogin"
        href="javascript:void(0)"
        class="btn_link btn_login"
      >
        登錄
      </a>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { actionNames, createWallet, createAddress } from '~/store'

export default {
  name: 'Login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      createContinueJobToQueryWallet: actionNames.createContinueJobToQueryWallet
    }),
    close() {
      this.$emit('close')
    },
    openRegister() {
      this.$emit('openRegister')
    },
    async tronLogin() {
      try {
        const { code, message, result, error } = await this.$tron.login()
        console.log('tron login result: ', result)
        if (code === 0) {
          if (result.status === 0) {
            this.loginSuccessHandle(result, 'trx')
          }
        } else {
          if (code === -1) {
            window.open(process.env.TRON_PLUGIN_SITE, '_blank')
          }

          this.$message({
            message: `${code} ${message} `,
            type: 'error'
          })
          console.log(`tron login error: ${code} ${message}: `, error)
        }
      } catch (error) {
        console.log('tron login error: ', error)
      }
    },
    async emailLogin() {
      const emailVaildRule = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      // 信箱規則檢查
      if (!this.login.email || this.login.email.match(emailVaildRule) == null) {
        this.$message({
          center: 'true',
          message: `信箱格式錯誤，請重新輸入`,
          type: 'error'
        })
        return
      }

      try {
        const result = await this.$axios.$post('/login', this.login)
        // const result = await this.$auth.loginWith('local', { data: this.login })
        console.log('email login: ', result)

        if (result.status === 0) {
          this.loginSuccessHandle(result, 'email')
        } else {
          this.$message({
            message: `${result.status} ${result.message}`,
            type: 'error'
          })
          console.log(`email login error: ${result.status} ${result.message}`)
        }
      } catch (error) {
        this.$message({
          message: '登入失敗, 網路發生異常',
          type: 'error'
        })
        console.log('email login error: ', error)
      }
    },
    loginSuccessHandle(result, type) {
      const address = JSON.parse(result.user.bankAddress)

      result.user.loginType = type

      const bankAddress = createAddress()
      bankAddress.btc = address[0]
      bankAddress.eth = address[1]
      bankAddress.trx = address[2]
      result.user.bankAddress = bankAddress

      result.user.bindAddress = createAddress()
      result.bind.forEach((item) => {
        if (item.type === 'TRON') result.user.bindAddress.trx = item.address
      })

      if (result.bind[0] && result.bind[0].type === 'TRON') {
        result.user.unit = 'trx'
      } else {
        result.user.unit = '-'
      }
      const bankWallet = createWallet()
      if (result.wallet[2] != null) {
        bankWallet.trx = result.wallet[2] / 1000000
      }
      this.$auth.$storage.setUniversal('token', result.token)
      this.$auth.$storage.setUniversal('bankWallet', bankWallet, true)
      this.$auth.$storage.setUniversal('userInfo', result.user, true)
      this.close()
      this.createContinueJobToQueryWallet()
    }
  }
}
</script>
