<template>
  <div class="scrtabs-container">
    <h4 class="f-deposit">Deposit {{ displayCurrency }}</h4>
    <div class="platform-container">
      <div class="platform-input platform_input_sum">
        <p>輸入入金金額:</p>
        <p><input v-model.number.trim="amount" type="number" /></p>
      </div>
    </div>

    <div class="platform_balance">
      <div class="balance_title col-6">綁定錢包 {{ displayCurrency }} 餘額</div>
      <div class="balance_no col-6">{{ bindBallance.toFixed(2) }}</div>
      <div class="balance_title col-6">平台 {{ displayCurrency }} 餘額</div>
      <div class="balance_no col-6">{{ bankBallance.toFixed(2) }}</div>
      <div class="btn_history col-6">
        <a href="/history" class="btn_link">History</a>
      </div>
      <div class="btn_history txt-right col-6">
        <a @click="deposit" href="javascript:void(0)" class="btn_link deposit">
          deposit
        </a>
      </div>
    </div>
    <p class="txt-right">Minimum Deposit: 0.00 {{ displayCurrency }}</p>
  </div>
</template>

<script>
export default {
  name: 'DepositBindWallet',
  props: {
    bankAddress: {
      type: String,
      default: ''
    },
    bankBallance: {
      type: Number,
      default: 0
    },
    bindBallance: {
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
      amount: 0
    }
  },
  computed: {
    displayCurrency() {
      return this.currency.toUpperCase()
    }
  },
  methods: {
    async deposit() {
      if (this.amount === '' || isNaN(this.amount) || this.amount === 0) {
        this.$message({ type: 'error', message: '請輸入正確的數值' })
        return
      }
      if (this.amount > this.bindBallance) {
        this.$message({ type: 'error', message: '錢包金額不足' })
        return
      }
      if (this.bankAddress === '') {
        this.$message({ type: 'error', message: '未綁定平台錢包地址' })
        return
      }

      const { code, result, error, message } = await this.$tron.sendTransaction(
        this.bankAddress,
        this.amount
      )

      if (code === 0) {
        console.log('send success: ', result)
        this.$message({
          type: 'success',
          message: '已轉入成功'
        })
      } else {
        this.$message({
          type: 'error',
          message
        })
        console.log('sendTransaction error: ', code, error)
      }
    }
  }
}
</script>
