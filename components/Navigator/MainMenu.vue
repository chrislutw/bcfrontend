<template>
  <!-- 主項目選單  -->
  <div class="main_menu">
    <div class="container scrtabs-tab-container">
      <div class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-left">
        <span class="glyphicon glyphicon-chevron-left"></span>
      </div>
      <div class="scrtabs-tabs-fixed-container">
        <ul class="nav nav-tabs" style="width:125%;">
          <li style="width: 20%;">
            <a href="#tab1"
              ><img src="~/assets/images/main_menu/icon_dapps.png" /><span
                >Dapps</span
              ></a
            >
          </li>
          <li style="width: 20%;">
            <a href="#tab2"
              ><img src="~/assets/images/main_menu/icon_video_slots.png" /><span
                >Video Slots</span
              ></a
            >
          </li>
          <li style="width: 20%;">
            <a href="#tab3"
              ><img src="~/assets/images/main_menu/icon_table_games.png" /><span
                >Table Games</span
              ></a
            >
          </li>
          <li style="width: 20%;">
            <a href="#tab4"
              ><img
                src="~/assets/images/main_menu/icon_arcade_fishing.png"
              /><span>Arcade Fishing</span></a
            >
          </li>
          <li style="width: 20%;">
            <a href="#tab4"
              ><img src="~/assets/images/main_menu/icon_live_casino.png" /><span
                >Live Casino</span
              ></a
            >
          </li>
        </ul>
      </div>
      <div class="scrtabs-tab-scroll-arrow scrtabs-js-tab-scroll-arrow-right">
        <span class="glyphicon glyphicon-chevron-right"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainMenu'
}
</script>
