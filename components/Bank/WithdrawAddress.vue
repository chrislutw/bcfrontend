<template>
  <div class="scrtabs-container">
    <h4 class="f-withdraw">Withdraw {{ displayCurrency }}</h4>
    <div class="platform-container">
      <div class="platform-input platform_input_sum">
        <p>輸入出金金額:</p>
        <p><input v-model.number.trim="amount" type="number" /></p>
      </div>
      <div class="platform-input platform_input_position">
        <p>輸入錢包位置:</p>
        <p><input v-model.trim="toAddress" type="text" /></p>
      </div>
    </div>
    <div class="platform_balance">
      <div class="balance_title col-6">平台 {{ displayCurrency }} 餘額</div>
      <div class="balance_no col-6">{{ bankBallance.toFixed(2) }}</div>
      <div class="btn_history col-6">
        <a href="/history" class="btn_link">History</a>
      </div>
      <div class="btn_history txt-right col-6">
        <a
          @click="bankSendCoin"
          href="javascript:void(0)"
          class="btn_link withdraw"
        >
          Withdraw
        </a>
      </div>
    </div>
    <p class="txt-right">Minimum Withdraw: 0.00 {{ displayCurrency }}</p>
  </div>
</template>
<script>
export default {
  name: 'WithDrawAddress',
  props: {
    bankAddress: {
      type: String,
      default: ''
    },
    bankBallance: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'trx'
    }
  },
  data() {
    return {
      amount: 0,
      toAddress: ''
    }
  },
  computed: {
    displayCurrency() {
      return this.currency.toUpperCase()
    }
  },
  methods: {
    bankSendCoin() {
      if (this.amount === '' || isNaN(this.amount) || this.amount === 0) {
        this.$message({ type: 'error', message: '請輸入正確的數值' })
        return
      }
      if (this.amount > this.bankBallance) {
        this.$message({ type: 'error', message: '錢包金額不足' })
        return
      }
      if (this.toAddress === '') {
        this.$message({ type: 'error', message: '未輸入出金錢包地址' })
        return
      }
      if (this.amount)
        this.$message({
          type: 'success',
          message: '後端功能未實作'
        })
    }
  }
}
</script>
