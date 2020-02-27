<template>
  <div class="box_popup_container_main col-3 m-col-12 ms-col-12">
    <p>
      <a @click="close" href="javascript:void(0)" class="btn_x"></a>
    </p>
    <h3>
      註冊 /
      <a
        @click="openLogin"
        href="javascript:void(0)"
        class="btn_popup_register"
      >
        登入
      </a>
    </h3>
    <hr />
    <div class="row">
      <input
        v-model.trim="register.email"
        @keyup.enter="$event.target.nextElementSibling.focus()"
        type="text"
        class="col-12 m-col-9 ms-col-12"
        placeholder="E-MAIL"
      />
      <input
        v-model.trim="register.password"
        @keyup.enter="$event.target.nextElementSibling.focus()"
        type="password"
        class="col-12 m-col-9 ms-col-12"
        placeholder="密碼"
      />
      <input
        v-model.trim="register.confirmPassword"
        @keyup.enter="emailRegister"
        type="password"
        class="col-12 m-col-9 ms-col-12"
        placeholder="確認密碼"
      />
    </div>
    <p class="box_btn_container">
      <a @click="close" href="javascript:void(0)" class="btn_link btn_cancel"
        >取消</a
      >
      <a
        @click="emailRegister"
        href="javascript:void(0)"
        class="btn_link btn_login"
        >確認</a
      >
    </p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const storeModule = 'igsBlockChain'
const { mapMutations } = createNamespacedHelpers(storeModule)
const createRegister = () => {
  return { email: '', password: '', confirmPassword: '' }
}
export default {
  name: 'Register',
  data() {
    return {
      register: createRegister()
    }
  },
  methods: {
    ...mapMutations({
      openPopup: 'OPEN_POPUP'
    }),
    close() {
      this.$emit('close')
    },
    openLogin() {
      this.$emit('openLogin')
    },
    async emailRegister() {
      const emailVaildRule = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      // 信箱規則檢查
      if (
        !this.register.email ||
        this.register.email.match(emailVaildRule) == null
      ) {
        this.$message({
          center: 'true',
          message: `信箱格式錯誤，請重新輸入`,
          type: 'error'
        })
        return
      }
      // 確認密碼檢查
      if (this.register.password !== this.register.confirmPassword) {
        this.$message({
          message: '確認密碼錯誤',
          type: 'error'
        })
        return
      }

      try {
        const result = await this.$axios.$post('/emailRegister', this.register)
        console.log('email register: ', result)
        if (result.status === 0) {
          this.$message({
            message: '恭喜您申請成功！已寄送啟用信件，請開啟信件激活帳號',
            type: 'success'
          })
          this.close()
          this.register = createRegister()
        } else {
          const errorMessage = result.status === 3 ? '帳號已存在' : '註冊失敗'
          this.$message({
            message: errorMessage,
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          message: '註冊失敗, 網路發生異常',
          type: 'error'
        })
        console.log('email register error: ', error)
      }
    }
  }
}
</script>
