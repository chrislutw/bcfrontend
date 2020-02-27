<template>
  <div
    :class="{ 'container-subpage': $route.path === '/account/message' }"
    class="container"
  >
    <!-- 內容區 選單 -->
    <ul class="nav-content-account UI-bg-dark">
      <!-- 內容 -->
      <div class="content">
        <li v-for="page in pageList" :key="page.id" class="nav-content__item">
          <nuxt-link
            :to="page.link"
            :exact="page.isExact"
            active-class="active"
            class=" UI-nav-content-muted"
          >
            {{ page.name }}
          </nuxt-link>
        </li>
      </div>
    </ul>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'Account',
  middleware: 'authUser',
  data() {
    return {
      pageList: [
        { id: 0, link: '/account', name: 'Info', isExact: true },
        { id: 1, link: '/account/security', name: 'Security', isExact: false },
        { id: 2, link: '/account/message', name: 'Message', isExact: false }
      ]
    }
  }
}
</script>

<style lang="scss" src="~/scss/account.scss"></style>
