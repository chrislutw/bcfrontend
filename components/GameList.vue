<template>
  <div class="games-all">
    <!-- 遊戲類別 -->
    <template v-for="type in defaultGameType">
      <div :key="`title${type.id}`" class="games-title">
        <div class="content">
          <h2>{{ type.name }}</h2>
          <h3>
            <img src="~/assets/images/search_icon_allgame.svg" /> All Games
            <img src="~/assets/images/search_icon_arrow.svg" />
          </h3>
        </div>
      </div>
      <div :key="`list${type.id}`" class="games-list">
        <div class="content">
          <!-- 遊戲列表 -->
          <div class="games-list__game" style="">
            <!-- 遊戲項目 -->
            <div
              v-for="game in defaultGameList"
              :key="game.id"
              @click="openLink(game.link)"
              class="games-list__game__item"
              style="width: 13.5%;"
            >
              <div
                :style="{ 'background-image': `url(${game.imageUrl})` }"
                class="games-list__game__image"
              ></div>
              <div class="games-list__game__text">
                <h3>{{ game.name }}</h3>
                <div class="games-list__game__text__buttons">
                  <a href="javascript:void(0)"><b>遊戲介紹</b></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultGameType: [
        { id: '01', name: 'New' },
        { id: '02', name: 'My Favorite' },
        { id: '03', name: 'Dapps' },
        { id: '04', name: 'Video Slots' },
        { id: '05', name: 'Arcade Fishing' },
        { id: '06', name: 'Live Casino' }
      ],
      defaultGameList: [
        {
          id: '6546546565',
          name: '人魚甜心',
          description: '錢龍出巡，致富賺錢必玩的熱門遊戲。',
          link:
            'https://test-bc-api.dominowork.com/bc/LoginTrial?gameId=30&lang=zh-TW',
          imageUrl: require('~/assets/images/game_bb_en-US.png')
        },
        {
          id: '6546546562',
          name: '海島甜心',
          description: '錢龍出巡，致富賺錢必玩的熱門遊戲。',
          link:
            'https://test-bc-api.dominowork.com/bc/LoginTrial?gameId=26&lang=zh-TW',
          imageUrl: require('~/assets/images/game_sb.png')
        },
        {
          id: '6546546262',
          name: '球好運',
          description: '錢龍出巡，致富賺錢必玩的熱門遊戲。',
          link:
            'https://test-bc-api.dominowork.com/bc/LoginTrial?gameId=13&lang=zh-TW',
          imageUrl: require('~/assets/images/game_csh.png')
        },
        {
          id: '6546516565',
          name: '錢龍捕魚',
          description: '錢龍出巡，致富賺錢必玩的熱門遊戲。',
          imageUrl: require('~/assets/images/game_bbc_en-US.png')
        },
        {
          id: '6542465162',
          name: '錢龍捕魚',
          description: '錢龍出巡，致富賺錢必玩的熱門遊戲。',
          imageUrl: require('~/assets/images/game_bbc_en-US.png')
        },
        {
          id: '6546541162',
          name: '錢龍捕魚',
          description: '錢龍出巡，致富賺錢必玩的熱門遊戲。',
          imageUrl: require('~/assets/images/game_bbc_en-US.png')
        }
      ]
    }
  },
  methods: {
    openLink(link) {
      if (link) {
        window.open(link, '_blank')
      }
    }
  }
}
</script>
