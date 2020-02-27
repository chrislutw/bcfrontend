<template>
  <div class="content content_bank">
    <div class="container">
      <currency-selector v-model="currentCurrency" />
      <div class="scrtabs-container nav_blue">
        <transaction-direction v-model="currentDirection" />
        <transaction-type v-model="currentUseType" />
        <deposit-address
          :currency="currentCurrency"
          :bankAddress="currentBankAddress"
          :bankBallance="currentBankBallance"
          v-show="showDepositAddress"
        />
        <withdraw-address
          :currency="currentCurrency"
          :bankAddress="currentBankAddress"
          :bankBallance="currentBankBallance"
          v-show="showWithdrawAddress"
        />
        <deposit-bind-wallet
          :currency="currentCurrency"
          :bankAddress="currentBankAddress"
          :bankBallance="currentBankBallance"
          :bindBallance="currentBindBallance"
          v-show="showDepositBindWallet"
        />
        <withdraw-bind-wallet
          :currency="currentCurrency"
          :bankAddress="currentBankAddress"
          :bankBallance="currentBankBallance"
          :bindBallance="currentBindBallance"
          v-show="showWithdrawBindWallet"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import CurrencySelector from '~/components/CurrencySelector'
import TransactionDirection from '~/components/TransactionDirection'
import TransactionType from '~/components/TransactionType'
import WithdrawAddress from '~/components/Bank/WithdrawAddress'
import DepositAddress from '~/components/Bank/DepositAddress'
import DepositBindWallet from '~/components/Bank/DepositBindWallet'
import WithdrawBindWallet from '~/components/Bank/WithdrawBindWallet'

const storeModule = 'igsBlockChain'
const { mapState } = createNamespacedHelpers(storeModule)

export default {
  name: 'Bank',
  middleware: 'authUser',
  components: {
    CurrencySelector,
    TransactionType,
    TransactionDirection,
    DepositAddress,
    DepositBindWallet,
    WithdrawAddress,
    WithdrawBindWallet
  },
  data() {
    return {
      currentDirection: 'deposit',
      currentCurrency: 'trx',
      currentUseType: 'Address'
    }
  },
  computed: {
    showDepositAddress() {
      return (
        this.currentDirection === 'deposit' && this.currentUseType === 'Address'
      )
    },
    showWithdrawAddress() {
      return (
        this.currentDirection === 'withdraw' &&
        this.currentUseType === 'Address'
      )
    },
    showDepositBindWallet() {
      return (
        this.currentDirection === 'deposit' &&
        this.currentUseType === 'TronLink'
      )
    },
    showWithdrawBindWallet() {
      return (
        this.currentDirection === 'withdraw' &&
        this.currentUseType === 'TronLink'
      )
    },
    currentBankAddress() {
      if (
        this.userInfo &&
        this.userInfo.bankAddress &&
        this.userInfo.bankAddress[this.currentCurrency]
      ) {
        return this.userInfo.bankAddress[this.currentCurrency]
      } else {
        return '-'
      }
    },
    currentSelfAddress() {
      if (
        this.userInfo &&
        this.userInfo.selfAddress &&
        this.userInfo.selfAddress[this.currentCurrency]
      ) {
        return this.userInfo.selfAddress[this.currentCurrency]
      } else {
        return '-'
      }
    },
    currentBankBallance() {
      if (this.bankWallet[this.currentCurrency] == null) {
        return 0
      } else {
        return this.bankWallet[this.currentCurrency]
      }
    },
    currentBindBallance() {
      if (this.selfWallet[this.currentCurrency] == null) {
        return 0
      } else {
        return this.selfWallet[this.currentCurrency]
      }
    },
    ...mapState(['userInfo', 'bankWallet', 'selfWallet'])
  },
  methods: {
    setCurrentCurrency(currency) {
      this.currentCurrency = currency
    }
  }
}
</script>
<style src="~/scss/bank.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.abc {
  font-size: 1px;
}
</style>
