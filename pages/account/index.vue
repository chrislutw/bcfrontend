<template>
  <div class="subpage UI-f-primary">
    <div class="content">
      <h2>My Account</h2>
      <p>
        <span class="UI-f-dark">Account ID:</span>
        <span class="UI-f-light">TBBHm..H1tLt</span>
      </p>
      <span>
        <span class="UI-f-dark">Language:</span>
        <span class="UI-f-light">English</span>
      </span>
      <p>&nbsp;</p>
      <h2>Contact Details</h2>
      <p>
        <span class="UI-f-dark">E-Mail：</span>
        <span class=" UI-f-danger">Unregistered</span>
      </p>
      <p>
        <span class="UI-f-dark">Status：</span>
        <span class=" UI-f-success">EMail Verified</span>
      </p>
      <p>&nbsp;</p>

      <h2>Balance</h2>
      <table class="table table-full table-balance">
        <tbody>
          <tr>
            <th class=" UI-f-light">Coin</th>
            <th class=" UI-f-light">Amount</th>
            <th class=" UI-f-light col-7">Status</th>
          </tr>
          <tr v-for="currency in currencys" :key="currency.id">
            <td>
              <img :src="currency.img" />
            </td>
            <td>{{ currency.amount }}</td>
            <td>
              <div class="box_btn_container">
                <a
                  href="javascript:void(0)"
                  class="btn-gradient-muted UI-link-dark-deposit active"
                >
                  <i class="icon-wallet UI-icon-deposit"></i>
                  Deposit
                </a>
                <a
                  href="javascript:void(0)"
                  class="btn-gradient-muted UI-link-dark-withdraw active"
                >
                  <i class="icon-wallet UI-icon-withdraw"></i>
                  Withdraw
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>

      <h2>Transaction History</h2>
      <div class="transaction UI-f-light">
        <div class="transaction-select">
          <div class="form-item col-6">
            <el-date-picker
              v-model="transactionRange"
              size="large"
              class="UI-form-primary"
              type="daterange"
              format="yyyy / MM / dd"
              value-format="timestamp"
              range-separator=">"
              start-placeholder="Start"
              end-placeholder="End"
            />
          </div>
          <div class="form-item col-6">
            <select class="UI-form-primary" name="select">
              <option value="Deposits">Deposits</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
          </div>
        </div>
        <div class="transaction-th">
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        <div
          v-for="transaction in transactionList"
          :key="transaction.id"
          class="transaction-tr"
        >
          <div>
            {{ $moment(transaction.date).format('YYYY/MM/DD') }}
            <br />
            {{ $moment(transaction.date).format('hh:mm:ss A') }}
          </div>
          <div>
            <img src="~/assets/images/page/icon-currency-eos.svg" />
            {{ transaction.amount }}
          </div>
          <div>{{ transaction.status }}</div>
        </div>
      </div>
      <p>&nbsp;</p>

      <ul class="nav-page">
        <li class="nav-page__item">
          <a href="javascript:void(0)" class="nav-page__left UI-link-muted">
            <i class="icon-arrow UI-icon-muted"></i>
          </a>
        </li>
        <li class="nav-page__item">
          <a
            href="javascript:void(0)"
            class="nav-page__link UI-link-muted active"
          >
            2
          </a>
        </li>
        <li class="nav-page__item">
          <a href="javascript:void(0)" class="nav-page__right UI-link-muted">
            <i class="icon-arrow UI-icon-muted"></i>
          </a>
        </li>
      </ul>
      <p>&nbsp;</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Info',
  data() {
    return {
      currencys: [
        {
          id: 0,
          name: 'bitcoin',
          amount: 888,
          img: require('~/assets/images/page/icon-currency-bitcoin.svg')
        },
        {
          id: 1,
          name: 'ethereum',
          amount: 1688,
          img: require('~/assets/images/page/icon-currency-ethereum.svg')
        },
        {
          id: 2,
          name: 'eos',
          amount: 94168,
          img: require('~/assets/images/page/icon-currency-eos.svg')
        },
        {
          id: 3,
          name: 'tron',
          amount: 17168,
          img: require('~/assets/images/page/icon-currency-tron.svg')
        },
        {
          id: 4,
          name: 'tether',
          amount: 52168,
          img: require('~/assets/images/page/icon-currency-tether.svg')
        }
      ],
      transactionRange: [],
      transactionList: [
        {
          id: '0',
          date: 1581595052076,
          amount: 123456,
          status: 'Complete'
        },
        {
          id: '1',
          date: 1581595052076,
          amount: 123456,
          status: 'Complete'
        },
        {
          id: '2',
          date: 1581595052076,
          amount: 123456,
          status: 'Complete'
        },
        {
          id: '3',
          date: 1581595052076,
          amount: 123456,
          status: 'Complete'
        },
        {
          id: '4',
          date: 1581595052076,
          amount: 123456,
          status: 'Complete'
        },
        {
          id: '5',
          date: 1581595052076,
          amount: 123456,
          status: 'Complete'
        }
      ]
    }
  }
}
</script>
