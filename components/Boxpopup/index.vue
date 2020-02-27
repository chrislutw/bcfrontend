<template>
  <div :class="{ box_in: visiable }" class="box_popup">
    <div :class="{ box_flipInY: visiable }" class="box_popup_container">
      <slot name="main">
        <div class="box_popup_container_main">
          <p>
            <a @click="close" href="javascript:void(0)" class="btn_x"></a>
          </p>
          <slot />
        </div>
      </slot>
    </div>
    <div @click="close" class="layer_click"></div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  model: {
    prop: 'visiable',
    event: 'close'
  },
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
