<template>
  <div class="nav-header UI-bg-primary">
    <nuxt-link class="nav-header-logo" to="/">
      <img src="@/assets/images/logo_jili_us-en.png" alt="JILI" />
    </nuxt-link>
    <!-- 虛擬幣 -->
    <div class="topmenu_balance">
      <div class="game_balance">
        <img src="~/assets/images/navbar/Tron.png" />
        <div class="balance_summ">
          <p class="UI-f-white">
            {{ selfWallet.trx.toFixed(2) }} /
            {{ bankWallet.trx.toFixed(2) }}
          </p>
        </div>
        <div class="balance-selector-container" tabindex="0" hidefocus="true">
          <i class="icon-arrow UI-icon-muted"></i>
          <div class="balance-list">
            <a
              class="balance-list__item UI-link-muted"
              href="javascript:void(0)"
            >
              <img src="@/assets/images/navbar/Tron.png" />
              <div class="balance_summ">
                <p>
                  {{ selfWallet.trx.toFixed(2) }} /
                  {{ bankWallet.trx.toFixed(2) }}
                </p>
              </div>
            </a>
            <a
              class="balance-list__item UI-link-muted"
              href="javascript:void(0)"
            >
              <img src="@/assets/images/navbar/Bitcoin.png" />
              <div class="balance_summ">
                <p>0.00</p>
              </div>
            </a>
            <a
              class="balance-list__item UI-link-muted"
              href="javascript:void(0)"
            >
              <img src="@/assets/images/navbar/EOS.png" />
              <div class="balance_summ">
                <p>0.00</p>
              </div>
            </a>
            <a
              class="balance-list__item UI-link-muted"
              href="javascript:void(0)"
            >
              <img src="@/assets/images/navbar/Ethereum.png" />
              <div class="balance_summ">
                <p>0.00</p>
              </div>
            </a>
            <a
              class="balance-list__item UI-link-muted"
              href="javascript:void(0)"
            >
              <img src="@/assets/images/navbar/Ripple.png" />
              <div class="balance_summ">
                <p>0.00</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="topmenu_buttons">
        <client-only>
          <button
            v-if="userInfo != null"
            @click="$router.push('/bank')"
            class="deposit UI-link-info"
          >
            Deposit
          </button>
        </client-only>
      </div>
    </div>
    <div
      :class="{ 'container-active': showMainNav }"
      class="container UI-bg-primary"
    >
      <nav class="main-nav">
        <ul class="main-nav_container">
          <li class="main-nav__item main-nav__item__welcome UI-f-white">
            <img src="~/assets/images/icon_tronLink.svg" />
            <div>
              Welcome
              <span>TBBHm..H1tLt</span>
            </div>
          </li>
          <li class="main-nav__item main-nav__item__login">
            <a href="javascript:void(0)" class="main-nav__link btn_login">
              Login
            </a>
          </li>
          <li class="main-nav__item main-nav__item_wallet">
            <a href="javascript:void(0)" class="main-nav__link btn_tronlink">
              <img src="~/assets/images/icon_tronLink.svg" />TronLink
            </a>
            <a href="javascript:void(0)" class="main-nav__link btn_metamask">
              <img src="~/assets/images/icon_metamask.svg" />METAMASK
            </a>
            <a href="javascript:void(0)" class="main-nav__link btn_scatter">
              <img src="~/assets/images/icon_scatter.svg" />Scatter
            </a>
            <a href="javascript:void(0)" class="main-nav__link btn_backup">
              備用錢包
            </a>
          </li>
          <li class="main-nav__item main-nav__item_rwd">
            <n-link to="/" class="main-nav__link UI-link-muted">
              <i class="icon-main UI-icon-muted"></i>
              MAIN
            </n-link>
          </li>
          <li class="main-nav__item">
            <n-link to="/account" class="main-nav__link UI-link-muted">
              <i class="icon-account UI-icon-muted"></i>
              Account
            </n-link>
          </li>
          <li class="main-nav__item">
            <n-link to="/wallet" class="main-nav__link UI-link-muted">
              <i class="icon-wallet UI-icon-muted"></i>
              Wallet Link
            </n-link>
          </li>
          <li class="main-nav__item main-nav__item__language UI-f-muted">
            <i class="icon-language UI-icon-muted"></i>
            <template v-for="(lang, index) in langs">
              <a
                :key="lang.id"
                href="javascript:void(0)"
                class="main-nav__link UI-link-muted"
                >{{ lang.name }}</a
              >
              <span v-if="index < langs.length - 1" :key="lang.id + 'a'"
                >/</span
              >
            </template>
          </li>
          <li class="main-nav__item">
            <a
              @click="openPopup('faq')"
              href="javascript:void(0)"
              class="main-nav__link UI-link-muted btn_popup_faq"
            >
              <i class="icon-faq UI-icon-muted"></i>
              FAQ
            </a>
          </li>
          <li class="main-nav__item">
            <a
              @click="openPopup('about')"
              href="javascript:void(0)"
              class="main-nav__link UI-link-muted btn_popup_about"
            >
              <i class="icon-about UI-icon-muted"></i>
              About JILI
            </a>
          </li>
          <li class="main-nav__item">
            <a
              @click="openPopup('contact')"
              href="javascript:void(0)"
              class="main-nav__link UI-link-muted btn_popup_about"
            >
              <i class="icon-contact UI-icon-muted"></i>
              Contact us
            </a>
          </li>
          <li class="main-nav__item">
            <a
              @click="openPopup('privacy')"
              href="javascript:void(0)"
              class="main-nav__link UI-link-muted btn_popup_privacy_policy"
            >
              <i class="icon-privacy UI-icon-muted"></i>
              Privacy Policy
            </a>
          </li>
          <li class="main-nav__item main-nav__item__logout">
            <a
              @click="logout"
              href="javascript:void(0)"
              class="main-nav__link UI-link-muted"
            >
              <i class="icon-logout UI-icon-muted"></i>
              Log Out
            </a>
          </li>
        </ul>
      </nav>

      <!-- 登入&註冊 -->
      <div class="user-selector">
        <div v-show="userInfo != null" class="user-selector-member-in">
          <!-- 帳戶 -->
          <div class="user-container" tabindex="0" hidefocus="true">
            <div class="user-button UI-link-muted">
              <i class="icon-account UI-icon-muted"></i>
              <i class="icon-arrow UI-icon-muted"></i>
            </div>
            <div class="user-list">
              <nuxt-link
                class="user-list__item UI-link-muted"
                to="/account/security"
              >
                <i class="icon-locked UI-icon-muted"></i>
                帳號安全設定
              </nuxt-link>
              <nuxt-link
                class="user-list__item UI-link-muted"
                to="/account/message"
              >
                <i class="icon-bell UI-icon-muted"></i>
                信件
              </nuxt-link>
              <a
                @click="logout"
                class="user-list__item UI-link-muted"
                href="javascript:void(0)"
              >
                <i class="icon-logout UI-icon-muted"></i>
                登出
              </a>
            </div>
          </div>
          <!-- 語言 -->
          <div
            class="language-selector-container"
            tabindex="0"
            hidefocus="true"
          >
            <div class="language-button UI-link-muted">
              <i class="icon-language UI-icon-muted"></i>
              <i class="icon-arrow UI-icon-muted"></i>
            </div>
            <div class="language-list">
              <a
                v-for="lang in langs"
                :key="lang.id"
                class="language-list__item UI-link-muted"
                href="javascript:void(0)"
              >
                {{ lang.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="user-selector-member UI-f-muted">
      <a
        @click="openPopup('login')"
        href="javascript:void(0)"
        class="main-nav__link UI-link-muted btn_popup_member"
      >
        登入
      </a>
      /
      <a
        @click="openPopup('register')"
        href="javascript:void(0)"
        class="main-nav__link UI-link-muted btn_popup_register"
      >
        註冊
      </a>
      <!-- 漢堡選單 -->
      <div class="hamburger animated flipInY">
        <a
          @click="onHamburgerClick"
          v-show="showMainNav === false"
          class="btn_menu UI-link-muted"
          href="javascript:void(0)"
        >
          <i class="icon-hamburger UI-icon-muted"></i>
        </a>
        <div
          id="btn_menu_X"
          @click="showMainNav = false"
          @blur.capture="onHamburgerBlur"
          v-show="showMainNav === true"
          v-focus="showMainNav === true"
          tabindex="-99"
          class="btn_menu_X UI-link-muted"
        >
          <i class="icon-hamburger-close UI-icon-muted"></i>
        </div>
      </div>
    </div>
    <portal to="popupArea">
      <div class="popups">
        <boxpopup
          :visiable="boxPopup.isOpenLogin"
          @close="openPopup('close')"
          class="member"
        >
          <template :slot="'main'">
            <login
              @close="openPopup('close')"
              @openRegister="openPopup('register')"
            />
          </template>
        </boxpopup>
        <boxpopup
          :visiable="boxPopup.isOpenRegister"
          @close="openPopup('close')"
          class="register"
        >
          <template :slot="'main'">
            <register
              @close="openPopup('close')"
              @openLogin="openPopup('login')"
            />
          </template>
        </boxpopup>
        <boxpopup
          :visiable="boxPopup.isOpenFaq"
          @close="openPopup('close')"
          class="faq"
        >
          <faq />
        </boxpopup>
        <boxpopup
          :visiable="boxPopup.isOpenAbout"
          @close="openPopup('close')"
          class="about"
        >
          <about />
        </boxpopup>
        <boxpopup
          :visiable="boxPopup.isOpenPrivacy"
          @close="openPopup('close')"
          class="privacy"
        >
          <privacy />
        </boxpopup>
        <boxpopup
          :visiable="boxPopup.isOpenContact"
          @close="openPopup('close')"
          class="contact"
        >
          <contact />
        </boxpopup>
      </div>
    </portal>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapActions } from 'vuex'

import Boxpopup from '~/components/Boxpopup'
import Login from '~/components/Boxpopup/Login'
import Register from '~/components/Boxpopup/Register'
import About from '~/components/Boxpopup/About'
import Faq from '~/components/Boxpopup/Faq'
import Privacy from '~/components/Boxpopup/Privacy'
import Contact from '~/components/Boxpopup/Contact'
import { actionNames } from '~/store'
const storeModule = 'igsBlockChain'
const { mapState } = createNamespacedHelpers(storeModule)

export const createBoxPopup = () => ({
  isOpenLogin: false,
  isOpenRegister: false,
  isOpenAbout: false,
  isOpenFaq: false,
  isOpenPrivacy: false,
  isOpenContact: false
})

export default {
  name: 'Navbar',
  directives: {
    focus: {
      update(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  components: {
    Boxpopup,
    Register,
    About,
    Faq,
    Privacy,
    Contact,
    Login
  },
  data() {
    return {
      showMainNav: false,
      boxPopup: createBoxPopup(),
      langs: [
        { id: 'zh-TW', name: '繁中' },
        { id: 'zh-CN', name: '简中' },
        { id: 'en', name: 'English' }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo', 'selfWallet', 'bankWallet', 'walletJob']),
    userCurrencyUnit() {
      if (this.userInfo && this.userInfo.unit) {
        return this.userInfo.unit.toUpperCase()
      }
      return '-'
    }
  },
  methods: {
    ...mapActions({ logout: actionNames.logout }),
    onHamburgerBlur() {
      setTimeout(() => {
        this.showMainNav = false
      }, 200)
    },
    onHamburgerClick() {
      this.showMainNav = true
    },
    openPopup(payload) {
      const setting = createBoxPopup()

      if (typeof payload === 'string') {
        payload = payload.toLowerCase()
      }
      switch (payload) {
        case 'login':
          setting.isOpenLogin = true
          break

        case 'register':
          setting.isOpenRegister = true
          break

        case 'about':
          setting.isOpenAbout = true
          break

        case 'faq':
          setting.isOpenFaq = true
          break

        case 'privacy':
          setting.isOpenPrivacy = true
          break

        case 'contact':
          setting.isOpenContact = true
          break

        default:
          break
      }
      this.boxPopup = setting
    }
  }
}
</script>
