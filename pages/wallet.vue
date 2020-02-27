<template>
  <div class="container">
    <div class="subpage UI-f-primary">
      <div class="content">
        <h2>Authentication</h2>
        <table class="table table-full table-balance">
          <tbody>
            <tr>
              <th class=" UI-f-light">Type</th>
              <th class=" UI-f-light">IDENTIFIER</th>
              <th class=" UI-f-light">ENABLED</th>
            </tr>
            <tr>
              <td>E-Mail</td>
              <td>{{ (userInfo && userInfo.email) || '-' }}</td>
              <td>
                <div
                  :class="[isBindEmail ? 'UI-f-success' : 'UI-f-danger']"
                  class="enable-display"
                >
                  {{ isBindEmail ? 'YES' : 'NO' }}
                </div>
              </td>
            </tr>
            <tr v-for="wallet in walletBindList" :key="wallet.name">
              <td>{{ wallet.name }}</td>
              <td>{{ wallet.address || '-' }}</td>
              <td>
                <div
                  :class="[wallet.isBind ? 'UI-f-success' : 'UI-f-danger']"
                  class="enable-display"
                >
                  {{ wallet.isBind ? 'YES' : 'NO' }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
        <template v-if="userInfo.loginType === 'email'">
          <h2>Wallet Link</h2>
          <p>Increase your account security</p>
          <p>&nbsp;</p>
          <div
            v-for="wallet in walletBindList"
            :key="wallet.name"
            class="wallet-item"
          >
            <div class="wallet-item-explanation">
              <h3>Link {{ wallet.title }} Address</h3>
              <p>Link a {{ wallet.title }} address to this account</p>
            </div>
            <!-- link -->
            <div class="link-selector-container" tabindex="0" hidefocus="true">
              <div class="box_btn_container">
                <div href="javascript:void(0)" class=" col-3 btn-primary">
                  LINK
                  <i class="icon-arrow UI-icon-muted"></i>
                </div>
              </div>
              <div class="link-list">
                <div class="wallet-item-link UI-f-dark">
                  <div class="box_btn_container">
                    <div
                      :class="[wallet.class]"
                      href="javascript:void(0)"
                      class="col-4 m-col-6 ms-col-8"
                    >
                      <img :src="wallet.img" />
                      LINK {{ wallet.title }} Address
                    </div>
                  </div>
                  <div class="box_btn_container">
                    <p class=" col-9">
                      Please login to TronLink or your Wallet.
                    </p>
                    <div href="javascript:void(0)" class=" col-3 btn-primary">
                      Get it
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>&nbsp;</p>
        </template>
        <template v-else>
          <h2>E-mail Link</h2>
          <p>Increase your account security</p>
          <p>&nbsp;</p>
          <div class="email-item">
            <div class="email-item-explanation">
              <h3>Link {{ currentWallet.title }} Address</h3>
              <p>Link a {{ currentWallet.title }} address to this account</p>
            </div>
            <div class="box_btn_container">
              <a
                @click="isOpenEmailBlock = !isOpenEmailBlock"
                :class="{ 'btn-success': isBindEmail }"
                href="javascript:void(0)"
                class="col-3 btn-primary"
              >
                LINK
                <i class="icon-arrow UI-icon-muted"></i>
              </a>
              <a
                :class="[currentWallet.class]"
                href="javascript:void(0)"
                class="col-4 m-col-6 ms-col-8"
              >
                <img :src="currentWallet.img" />
                LINK {{ currentWallet.title }} Address
              </a>
            </div>
            <p>&nbsp;</p>
            <div
              v-show="isOpenEmailBlock"
              class="email-item-form UI-f-dark"
              style="padding: 20px;"
            >
              <div class="form-item">
                <h4>E-mail Address</h4>
                <input
                  v-model="wantBindEmail.email"
                  class="UI-form-muted col-8 m-col-12"
                  type="text"
                />
              </div>
              <div class="form-item">
                <h4>Password</h4>
                <input
                  v-model="wantBindEmail.password"
                  class="UI-form-muted col-4 m-col-12"
                  type="text"
                />
              </div>
              <div class="form-item">
                <h4>Confrm Password</h4>
                <input
                  v-model="wantBindEmail.comfirmPassword"
                  class="UI-form-muted col-4 m-col-12"
                  type="text"
                />
              </div>
              <div class="box_btn_container">
                <a href="javascript:void(0)" class=" col-3 btn-success">
                  Link E-mail Adderss
                </a>
              </div>
              <div v-if="isBindEmail" class="box_btn_container">
                <h3 class="UI-f-success">E-Mail Bind</h3>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
// import { createAddress } from '~/store'
const storeModule = 'igsBlockChain'
const { mapState } = createNamespacedHelpers(storeModule)
export default {
  name: 'Wallet',
  middleware: 'authUser',
  data() {
    return {
      isOpenEmailBlock: false,
      wantBindEmail: {
        email: '',
        password: '',
        comfirmPassword: ''
      },
      walletNames: {
        trx: {
          title: 'TRON',
          class: 'btn-tron',
          img: require('~/assets/images/page/icon_tronLink.svg')
        },
        eth: {
          title: 'MATAMASK',
          class: 'btn-metamask',
          img: require('~/assets/images/page/icon_metamask.svg')
        },
        btc: {
          title: 'SCATTER',
          class: 'btn-scatter',
          img: require('~/assets/images/page/icon_scatter.svg')
        }
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    isBindEmail() {
      if (this.userInfo && this.userInfo.email) return true
      return false
    },
    walletBindList() {
      if (this.userInfo && this.userInfo.bindAddress) {
        return Object.keys(this.userInfo.bindAddress).map((key) => {
          return {
            name: key,
            address: this.userInfo.bindAddress[key],
            isBind: !!this.userInfo.bindAddress[key],
            ...this.walletNames[key]
          }
        })
      }
      return []
    },
    currentWallet() {
      if (this.userInfo && this.userInfo.loginType) {
        return this.walletBindList.find(
          (wallet) => wallet.name === this.userInfo.loginType
        )
      }
      return false
    }
  }
}
</script>

<style lang="scss" src="~/scss/wallet.scss"></style>
