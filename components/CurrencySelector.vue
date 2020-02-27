<template>
  <div class="scrtabs-tab-container nav_blue">
    <div class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-left">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </div>
    <div class="scrtabs-tabs-fixed-container">
      <ul class="nav nav-tabs" style="width: 500px;">
        <li v-for="(currency, index) in currencyList" :key="index">
          <a
            :class="{ active: selected === currency.name.toLowerCase() }"
            @click="changeSelected(currency.name.toLowerCase())"
            href="javascript:void(0)"
          >
            <img :src="currency.image" />{{ currency.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-right">
      <span class="glyphicon glyphicon-chevron-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencySelector',
  model: {
    prop: 'selected',
    event: 'click'
  },
  props: {
    selected: {
      type: String,
      default: 'trx'
    }
  },
  data() {
    return {
      currencyList: [
        {
          name: 'TRX',
          image: require('~/assets/images/bank/TRX.svg')
        },
        {
          name: 'ETH',
          image: require('~/assets/images/bank/Ethereum.svg')
        },
        {
          name: 'XRP',
          image: require('~/assets/images/bank/XRP.svg')
        },
        {
          name: 'BTC',
          image: require('~/assets/images/bank/Bitcoin.svg')
        },
        {
          name: 'EOS',
          image: require('~/assets/images/bank/EOS.svg')
        }
      ]
    }
  },
  methods: {
    changeSelected(_selected) {
      this.$emit('click', _selected)
    }
  }
}
</script>

<style lang="scss" scoped>
//頁籤選單_基本
.scrtabs-tab-container {
  position: relative;
  height: 45px;
  margin-bottom: 0;
  border-bottom: 1px solid #a4a4a4;

  //左右箭頭
  .scrtabs-tab-scroll-arrow {
    color: #ffffff;
    cursor: pointer;
    float: left;
    font-size: 25px;
    width: 20px;
    padding: 0;
    .glyphicon {
      position: relative;
      top: 1px;
      display: inline-block;
      font-family: 'Glyphicons Halflings';
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    &.scrtabs-js-tab-scroll-arrow-left {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 26px;
      cursor: pointer;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0) 0%,
        rgb(0, 0, 0) 100%
      );
      .glyphicon-chevron-left:before {
        content: '\25C0';
        line-height: 45px;
        padding-left: 5px;
      }
    }
    &.scrtabs-js-tab-scroll-arrow-right {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 26px;
      cursor: pointer;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgb(0, 0, 0) 100%
      );
      .glyphicon-chevron-right:before {
        content: '\25B6';
        line-height: 45px;
        padding-left: 5px;
      }
    }
  }
  //頁籤內容
  .scrtabs-tabs-fixed-container {
    margin: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    font-size: 0px;
    position: absolute;
    top: 0px;
    left: 26px;
    right: 26px;
    // .nav-tabs {
    // }
    .nav-tabs > li {
      float: left;
      list-style: none;
      a {
        line-height: 44px;
        position: relative;
        height: 44px;
        font-size: 18px;
        display: block;
        padding: 0 20px 0 10px;
        border-radius: 5px 5px 0 0;
        margin-right: 3px;
        color: #a4a4a4;
        border-top: 1px solid #a4a4a4;
        border-left: 1px solid #a4a4a4;
        border-right: 1px solid #a4a4a4;
        img {
          width: 20px;
          margin-right: 3px;
          vertical-align: middle;
          color: #000;
        }
      }
      a.active,
      a:hover {
        color: #fff;
        height: 45px;
        background: linear-gradient(
          to bottom,
          rgba(51, 51, 51, 1) 0%,
          rgba(0, 0, 0, 1) 100%
        );
        border-top: 1px solid #a4a4a4;
        border-left: 1px solid #a4a4a4;
        border-right: 1px solid #a4a4a4;
        &:before {
          content: '';
          border-right: none;
        }
      }
    }
  }
}

//頁籤選單_深藍
.scrtabs-tab-container.nav_blue {
  border-radius: 6px;
  border-bottom: none;
  background: linear-gradient(
    to bottom,
    rgba(11, 15, 18, 1) 0%,
    rgba(41, 45, 54, 1) 10%,
    rgba(41, 45, 54, 1) 90%,
    rgba(11, 15, 18, 1) 100%
  );
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.9) inset;
  //頁籤內容
  .scrtabs-tabs-fixed-container {
    .nav-tabs > li {
      padding-top: 6px;
      a {
        color: #fff;
        border: none;
        line-height: 38px;
        &:before {
          content: '';
          position: absolute;
          top: 5px;
          right: 0;
          height: 28px;
          width: 1px;
          border-right: 1px solid #595c61;
        }
      }
      a.active,
      a:hover {
        color: #fff;
        background: linear-gradient(
          to bottom,
          rgba(42, 104, 155, 1) 0%,
          rgba(0, 61, 115, 1) 23%,
          rgba(0, 61, 115, 1) 23%,
          rgba(0, 71, 122, 1) 31%,
          rgba(1, 61, 117, 1) 100%
        );
        &:before {
          content: '';
          border-right: none;
        }
      }
    }
  }
}
</style>
