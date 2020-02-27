<template>
  <div class="subpage UI-f-primary">
    <div class="account-message UI-f-muted">
      <!-- 內容 -->
      <div class="content">
        <div
          v-for="message in displayMessages"
          :key="message.id"
          :class="[message.read ? 'UI-message-dark' : 'UI-message-muted']"
          class="account-message__item account-message__item-deposit "
        >
          <div class="account-message__item__point">
            <i class="icon-point"></i>
          </div>
          <div class="account-message__item__icon">
            <i :class="[message.iconClassName]"></i>
          </div>
          <div class="account-message__item__message">
            <h3>{{ message.typeName }}</h3>
            <p>
              {{ message.description }}
            </p>
            <p>in {{ message.displayTime }}</p>
          </div>
          <a href="javascript:void(0)" class="btn_close">
            <i class="icon-close"></i>
          </a>
        </div>
      </div>
    </div>
    <portal to="scrollOutSidePage">
      <div class="box_btn_container">
        <a href="javascript:void(0)" class=" ms-col-11 col-7 btn-primary">
          Clear all
        </a>
      </div>
      <ul class="nav-page">
        <li class="nav-page__item">
          <a href="javascript:void(0)" class="nav-page__left UI-link-muted">
            <i class="icon-arrow UI-icon-muted"></i>
          </a>
        </li>
        <li class="nav-page__item">
          <a
            href="javascript:void(0)"
            class="nav-page__link UI-link-muted active"
          >
            2
          </a>
        </li>
        <li class="nav-page__item">
          <a href="javascript:void(0)" class="nav-page__right UI-link-muted">
            <i class="icon-arrow UI-icon-muted"></i>
          </a>
        </li>
      </ul>
    </portal>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data() {
    return {
      types: [
        { id: 1, name: 'Deposit', iconClassName: 'icon-deposit' },
        { id: 2, name: 'Withdraw', iconClassName: 'icon-withdraw' },
        { id: 3, name: 'Change notification', iconClassName: 'icon-change' },
        { id: 4, name: 'Login notification', iconClassName: 'icon-logout' }
      ],
      messages: [
        {
          id: '0',
          type: 1,
          read: false,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '1',
          type: 2,
          read: false,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '2',
          type: 3,
          read: false,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '3',
          type: 4,
          read: false,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '4',
          type: 3,
          read: true,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '5',
          type: 2,
          read: true,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '6',
          type: 1,
          read: true,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '7',
          type: 1,
          read: true,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        },
        {
          id: '8',
          type: 4,
          read: true,
          description:
            'You have successfully deposited 16888 TRX to JILI Casino.You have successfully deposited 16888 TRX to JILI Casino.',
          time: 1581945561124
        }
      ]
    }
  },
  computed: {
    displayMessages() {
      return this.messages.map((message) => {
        const type = this.types.find((type) => type.id === message.type)
        return {
          ...message,
          typeName: type.name,
          iconClassName: type.iconClassName,
          displayTime: this.$moment(message.time).format('YYYY/MM/DD HH:mm:ss')
        }
      })
    }
  }
}
</script>
