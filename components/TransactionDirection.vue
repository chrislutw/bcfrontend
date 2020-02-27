<template>
  <!-- 入金、出金切換按鈕 -->
  <div class="box_btn_container">
    <a
      v-for="(direction, index) in directionList"
      :key="index"
      :class="{
        active: currentDirection === direction,
        [`f-${direction}`]: true
      }"
      @click="changeDirection(direction)"
      class="btn_link col-3 m-col-4 ms-col-6"
      href="javascript: void(0)"
    >
      <img :src="require(`~/assets/images/bank/${direction}.svg`)" />
      {{ direction.toUpperCase() }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'TransactionDirection',
  model: {
    prop: 'currentDirection',
    event: 'click'
  },
  props: {
    currentDirection: {
      type: String,
      default: 'deposit'
    },
    directionList: {
      type: Array,
      default() {
        return ['deposit', 'withdraw']
      }
    }
  },
  methods: {
    changeDirection(direction) {
      this.$emit('click', direction)
    }
  }
}
</script>
