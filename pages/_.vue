<template>
  <div class="container">
    <h1>HTTP 404<br />页面不存在</h1>
    <div class="link">
      <nuxt-link to="/" class="f-dark">回首頁</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  layout: 'noMenu'
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
h1 {
  display: block;
  font-size: 6rem;
  line-height: 6.5rem;
}
a {
  font-size: 3rem;
}
</style>
