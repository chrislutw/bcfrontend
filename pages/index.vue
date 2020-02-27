<template>
  <div>
    <!-- 橫幅AD拖曳套件_A -->
    <langing-banner />
    <main-menu />
    <div class="container UI-bg-primary">
      <game-search />
      <game-list />
    </div>
  </div>
</template>

<script>
import GameList from '~/components/GameList'
// import GameNav from '~/components/GameNav'
import LangingBanner from '~/components/LandingBanner'
// import Contact from '~/components/Contact'
import MainMenu from '~/components/Navigator/MainMenu'
import GameSearch from '~/components/GameSearch'
export default {
  components: {
    MainMenu,
    GameSearch,
    GameList,
    // GameNav,
    // Contact,
    LangingBanner
  },
  async asyncData({ env, $axios }) {
    let apiContent

    try {
      apiContent = await $axios.$get(
        'https://next.json-generator.com/api/json/get/EyPCzq2-d'
      )
    } catch (error) {
      apiContent = error
    }

    return {
      abc123: env.ABC123,
      apiContent
    }
  },
  methods: {
    localPlusOne() {
      this.$store.commit('igsBlockChain/increase')
    }
  }
}
</script>
<style lang="scss"></style>
