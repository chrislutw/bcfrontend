<template>
  <!-- 使用手動地址、綁定的錢包切換按鈕 -->
  <div class="scrtabs-tab-container">
    <div class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-left">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </div>
    <div class="scrtabs-tabs-fixed-container">
      <ul class="nav nav-tabs" role="tablist">
        <li v-for="(type, index) in typeList" :key="index" role="presentation">
          <a
            @click="changeType(type)"
            :class="{ active: type === currentType }"
            href="javascript:void(0)"
          >
            {{ type }}
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
  name: 'TransactionType',
  model: {
    prop: 'currentType',
    event: 'click'
  },
  props: {
    currentType: {
      type: String,
      default: 'Address'
    },
    typeList: {
      type: Array,
      default() {
        return ['Address', 'TronLink']
      }
    }
  },
  methods: {
    changeType(type) {
      this.$emit('click', type)
    }
  }
}
</script>
