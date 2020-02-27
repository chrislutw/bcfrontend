<template>
  <div class="style_frame_A style_color_dark">
    <navbar />
    <div class="wrapper UI-bg-primary UI-bg-muted">
      <nuxt />
      <portal-target name="scrollOutSidePage" />
    </div>
    <portal-target name="popupArea" />
    <Footer />
  </div>
</template>
<script>
import { createNamespacedHelpers, mapActions } from 'vuex'
import Navbar from '~/components/Navigator/Navbar'
import Footer from '~/components/Footer'
import { actionNames } from '~/store'
const storeModule = 'igsBlockChain'
const { mapState } = createNamespacedHelpers(storeModule)

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['walletJob'])
  },
  mounted() {
    // this.$auth.$storage.syncUniversal('token', false)
    // this.$auth.$storage.syncUniversal('userInfo', false)
    // this.$auth.$storage.syncUniversal('bankWallet', createWallet(), true)
    // this.$auth.$storage.syncUniversal('selfWallet', createWallet(), true)
    // this.$auth.$storage.syncUniversal('walletJob', null)

    this.$axios.$get('https://next.json-generator.com/api/json/get/EyPCzq2-d')
    // delay 1 second wait for tronweb init
    setTimeout(this.createContinueJobToQueryWallet, 1000)
  },
  beforeDestroy() {
    if (this.walletJob) {
      clearInterval(this.walletJob)
      this.$auth.$storage.setUniversal('walletJob', null)
    }
  },
  methods: {
    ...mapActions({
      createContinueJobToQueryWallet: actionNames.createContinueJobToQueryWallet
    })
  }
}
</script>

<style src="~/scss/master.scss" lang="scss"></style>
<style src="~/scss/style.scss" lang="scss"></style>
<style src="~/scss/popup.scss" lang="scss"></style>
