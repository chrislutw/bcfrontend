<template>
  <div class="game_nav">
    <ul class="game_nav_container row_flex-start">
      <li
        v-for="gameType in defaultGameTypeList"
        :key="gameType.id"
        class="col-2 m-col-2_4"
      >
        <a
          :class="{ [gameType.icon]: true, active: gameType.isActive }"
          class="language-list__item"
          href="javascript:void(0)"
          >{{ gameType.name }}</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultGameTypeList: [
        {
          id: '12312312',
          name: '最新',
          icon: 'btn_new',
          isActive: true
        },
        {
          id: '12312322212322',
          name: '熱門',
          icon: 'btn_hot'
        },
        {
          id: '1231123123322',
          name: '魚機',
          icon: 'btn_fish'
        },
        {
          id: '12312312322',
          name: '老虎機',
          icon: 'btn_slot'
        },
        {
          id: '112312322',
          name: '棋牌',
          icon: 'btn_poker'
        }
      ]
    }
  }
}
</script>
