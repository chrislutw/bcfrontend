<template>
  <div class="subpage UI-f-primary">
    <!-- 內容 -->
    <div class="content">
      <h2>Change Password</h2>
      <div class="form-item col-10">
        <input
          class="UI-form-primary"
          type="text"
          placeholder="Current Password"
          name="Change Password"
        />
      </div>
      <div class="form-item col-10">
        <input
          class="UI-form-primary"
          type="text"
          placeholder="New Password"
          name="New Password"
        />
      </div>
      <div class="form-item col-10">
        <input
          class="UI-form-primary"
          type="text"
          placeholder="Confirm Password"
          name="Confirm Password"
        />
      </div>
      <p></p>
      <div class="box_btn_container">
        <a href="javascript:void(0)" class="col-3 btn-primary">
          Save
        </a>
      </div>
      <p></p>
      <p>&nbsp;</p>
      <h2>E-MAIL Notifications</h2>
      <div class="email-notifications">
        <a
          v-for="notify in emailNotifications"
          :key="notify.id"
          :class="{ active: notify.enable }"
          href="javascript:void(0)"
          class="email-notifications-item UI-link-muted UI-email-btn-primary"
        >
          <div class="email-notifications-item__title">{{ notify.name }}</div>
          <div
            @click="notify.enable = !notify.enable"
            class="email-notifications-item__button"
          >
            <i></i>
          </div>
        </a>
      </div>
      <p>&nbsp;</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Secruity',
  data() {
    return {
      emailNotifications: [
        {
          id: '0',
          name: 'Withdraw',
          enable: false
        },
        {
          id: '1',
          name: 'Password Update',
          enable: false
        },
        { id: '2', name: 'Login', enable: false }
      ]
    }
  }
}
</script>
