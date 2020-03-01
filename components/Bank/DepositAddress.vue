<template>
  <div class="scrtabs-container">
    <h4 class="f-deposit">Deposit {{ displayCurrency }}</h4>
    <p>&nbsp;</p>
    <p>Your {{ displayCurrency }} Address:</p>
    <p>&nbsp;</p>
    <p>
      <span class="f-wraning">{{ bankAddress }}</span>
    </p>
    <div class="box_btn_container box_btn_container_address">
      <!-- 複製連結 -->
      <a
        @click="copyAddress"
        href="javascript:void(0)"
        class="btn_link copy-button"
      >
        <img src="~/assets/images/bank/copy.svg" /> copy Address
      </a>
      <!-- QR Code -->
      <div class="QRcode-container" tabindex="0" hidefocus="true">
        <div
          @click="bankAddressQrcode"
          href="javascript:void(0)"
          class="btn_link QRcode-button"
        >
          <img src="~/assets/images/bank/qr-code.svg" /> QR Code
        </div>
        <div class="QRcode-list">
          <div class="QRcode-list__item" href="javascript:void(0)">
            <!-- <img :src="qrcodeImg" /> -->
            <qrcode-vue :value="bankAddress" />
          </div>
        </div>
      </div>
    </div>
    <div class="platform_balance">
      <div class="balance_title col-6">平台 {{ displayCurrency }} 餘額</div>
      <div class="balance_no col-6">{{ bankBallance.toFixed(2) }}</div>
      <div class="btn_history col-6">
        <a href="/history" class="btn_link">History</a>
      </div>
    </div>
    <p class="txt-right">Minimum Deposit: 0.00 {{ displayCurrency }}</p>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'DepositAddress',
  components: { QrcodeVue },
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
      qrcodeImg: ''
    }
  },
  computed: {
    displayCurrency() {
      return this.currency.toUpperCase()
    }
  },
  methods: {
    copyAddress() {
      window.Clipboard.copy(this.bankAddress)
      this.$message({
        type: 'success',
        message: '已複制到剪貼簿'
      })
    }
  }
}
</script>
