<template>
  <!-- 頁尾內容區 -->
  <div class="footer">
    <div class="container">
      <div class="nav-footer">
        <div class="button btn_home">
          <a href="#tab1" class="active">
            <img src="~/assets/images/bottom_menu/icon_main.png" />
            <span>Home</span>
          </a>
        </div>
        <div class="scrtabs-tab-container">
          <div
            class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-left"
          >
            <span class="glyphicon glyphicon-chevron-left"></span>
          </div>
          <div class="scrtabs-tabs-fixed-container">
            <ul class="nav nav-tabs" style="width:100%;">
              <li
                v-for="footer in footerList"
                :key="footer.id"
                :style="{ width: footerItemWidth }"
              >
                <a href="#tab1">
                  <img :src="footer.image" />
                  <span>{{ footer.name }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div
            class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-right"
          >
            <span class="glyphicon glyphicon-chevron-right"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      footerList: [
        {
          id: '01',
          name: 'Fairness',
          link: '#tab1',
          image: require('~/assets/images/bottom_menu/icon_fairness.png')
        },
        {
          id: '02',
          name: 'Whitepaper',
          link: '#tab2',
          image: require('~/assets/images/bottom_menu/icon_whitepaper.png')
        },
        {
          id: '03',
          name: 'Referral',
          link: '#tab3',
          image: require('~/assets/images/bottom_menu/icon_referral.png')
        },
        {
          id: '04',
          name: 'Feedback',
          link: '#tab4',
          image: require('~/assets/images/bottom_menu/icon_feedback.png')
        }
      ]
    }
  },
  computed: {
    footerItemWidth() {
      return `${100 / this.footerList.length}%`
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  .container {
    display: none;
    width: 100%;
    height: 65px;
    background: rgb(31, 35, 41);
    .nav-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      //返回主頁.固定位置
      .btn_home {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        width: 20%;
        height: 100%;
        a {
          display: flex;
          justify-content: center;
          align-content: center;
          flex-wrap: wrap;
          width: 100%;
          text-align: center;
          border-top: 3px solid #eaa40d;
          color: #eaa40d;
          height: 100%;
          padding-top: 5px;
          &:hover {
            border-top: 3px solid #ea830d;
            color: #ea830d;
            img {
              filter: brightness(0.6);
            }
          }
        }
        img {
          display: block;
          width: 28%;
          max-width: 32px;
          margin: 0 auto;
        }
        span {
          width: 100%;
          display: block;
          font-size: 13px;
        }
      }
      .scrtabs-tab-container {
        width: 80%;
      }
    }
  }

  //滑動選單_基本
  .scrtabs-tab-container {
    position: relative;
    margin-bottom: 0;
    height: 100%;
    //左右箭頭
    .scrtabs-tab-scroll-arrow {
      color: #ffffff;
      cursor: pointer;
      float: left;
      font-size: 25px;
      width: 20px;
      padding: 0;
      height: 100%;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      border-top: 3px solid #1f2329;
      .glyphicon {
        position: relative;
        display: inline-block;
        height: 100%;
      }
      &.scrtabs-js-tab-scroll-arrow-left {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 4%;
        background-image: url(~assets/images/arrow_left.svg);
        cursor: pointer;
        filter: grayscale(1);
        &:hover {
          border-top: 3px solid #eaa40d;
          filter: grayscale(0);
        }
      }
      &.scrtabs-js-tab-scroll-arrow-right {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 4%;
        background-image: url(~assets/images/arrow_right.svg);
        cursor: pointer;
        filter: grayscale(1);
        &:hover {
          border-top: 3px solid #eaa40d;
          filter: grayscale(0);
        }
      }
    }
    //滑動選單內容
    .scrtabs-tabs-fixed-container {
      margin: 0px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip;
      font-size: 0px;
      position: absolute;
      top: 0px;
      left: 4%;
      right: 4%;
      width: 92%;
      height: 100%;
      .nav-tabs {
        height: 100%;
        overflow: auto;
      }
      .nav-tabs > li {
        float: left;
        list-style: none;
        height: 100%;
        a {
          display: flex;
          justify-content: center;
          align-content: center;
          flex-wrap: wrap;
          width: 100%;
          text-align: center;
          border-top: 3px solid #1f2329;
          color: #a4a4a4;
          height: 100%;
          padding-top: 5px;
          img {
            display: block;
            width: 28%;
            max-width: 32px;
            margin: 0 auto;
            filter: grayscale(1);
          }
          span {
            width: 100%;
            display: block;
            font-size: 12px;
          }
        }
        a.active,
        a:hover {
          color: #fff;
          height: 100%;
          border-top: 3px solid #eaa40d;
          color: #eaa40d;
          img {
            filter: grayscale(0);
          }
        }
      }
    }
  }
}
@include ms-phone-width {
  .footer {
    .container {
      display: block;
      // .nav-footer {
      //   .btn_home {
      //     a {
      //     }
      //   }
      // }
    }
  }
}
</style>
