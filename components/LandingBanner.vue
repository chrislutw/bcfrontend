<template>
  <!-- 橫幅AD拖曳套件_A -->
  <div
    class="main-slick main-slider slick-initialized slick-slider slick-dotted"
    role="toolbar"
  >
    <div aria-live="polite" class="slick-list draggable">
      <div class="slick-track" role="listbox" style="opacity: 1; width: 100%;">
        <div
          class="item picture item-idx-slick typo-center slick-slide slick-current slick-active"
          style="width: 100%;"
        >
          <div class="sbg"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LandingBanner',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.sbg {
  background-image: url(~assets/images/Banner_jili.jpg);
}
</style>
